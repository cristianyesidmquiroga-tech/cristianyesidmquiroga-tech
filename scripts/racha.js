const fs = require('fs');
const path = require('path');

const textos = {
  es: { total: 'Contribuciones totales', actual: 'Racha actual', larga: 'Racha más larga', hoy: 'Presente', etiqueta: 'Racha de contribuciones' },
  en: { total: 'Total contributions', actual: 'Current streak', larga: 'Longest streak', hoy: 'Present', etiqueta: 'Contribution streak' },
};

async function consultar(token, query, variables) {
  const r = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `bearer ${token}`, 'Content-Type': 'application/json', 'User-Agent': 'tarjeta-racha' },
    body: JSON.stringify({ query, variables }),
  });
  const datos = await r.json();
  if (!r.ok || datos.errors) throw new Error(`GitHub respondio ${r.status}: ${JSON.stringify(datos.errors || datos)}`);
  return datos.data;
}

async function traerDias(usuario, token, ahora = new Date()) {
  const { user } = await consultar(token, 'query($u:String!){user(login:$u){createdAt}}', { u: usuario });
  const dias = new Map();
  const query = `query($u:String!,$d:DateTime!,$h:DateTime!){user(login:$u){contributionsCollection(from:$d,to:$h){
    contributionCalendar{weeks{contributionDays{date contributionCount}}}}}}`;
  for (let anio = new Date(user.createdAt).getUTCFullYear(); anio <= ahora.getUTCFullYear(); anio++) {
    const desde = new Date(Date.UTC(anio, 0, 1));
    const hasta = anio === ahora.getUTCFullYear() ? ahora : new Date(Date.UTC(anio, 11, 31, 23, 59, 59));
    const datos = await consultar(token, query, { u: usuario, d: desde.toISOString(), h: hasta.toISOString() });
    for (const semana of datos.user.contributionsCollection.contributionCalendar.weeks)
      for (const d of semana.contributionDays) dias.set(d.date, d.contributionCount);
  }
  return [...dias].map(([fecha, n]) => ({ fecha, n })).sort((a, b) => a.fecha.localeCompare(b.fecha));
}

function calcular(dias, hoy) {
  const hasta = dias.filter((d) => d.fecha <= hoy);
  const total = hasta.reduce((s, d) => s + d.n, 0);
  const primero = hasta.find((d) => d.n > 0)?.fecha ?? null;
  let larga = { dias: 0, inicio: null, fin: null };
  let corrida = { dias: 0, inicio: null, fin: null };
  for (const d of hasta) {
    corrida = d.n > 0 ? { dias: corrida.dias + 1, inicio: corrida.inicio ?? d.fecha, fin: d.fecha } : { dias: 0, inicio: null, fin: null };
    if (corrida.dias > larga.dias) larga = corrida;
  }
  // El dia de hoy sin contribuciones todavia no corta la racha.
  let i = hasta.length - 1;
  if (hasta[i]?.fecha === hoy && hasta[i].n === 0) i--;
  let actual = { dias: 0, inicio: null, fin: null };
  for (; i >= 0 && hasta[i].n > 0; i--) actual = { dias: actual.dias + 1, inicio: hasta[i].fecha, fin: actual.fin ?? hasta[i].fecha };
  return { total, primero, actual, larga };
}

const fecha = (iso, idioma) =>
  new Intl.DateTimeFormat(idioma, { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`)).replace('.', '');

function rango(r, idioma, hoy, t) {
  if (!r.inicio) return '';
  const fin = r.fin === hoy ? t.hoy : fecha(r.fin, idioma);
  return r.inicio === r.fin ? fecha(r.inicio, idioma) : `${fecha(r.inicio, idioma)} - ${fin}`;
}

function construirSvg(datos, idioma, hoy) {
  const t = textos[idioma];
  const numero = (n) => new Intl.NumberFormat(idioma === 'es' ? 'es-CO' : 'en-US').format(n);
  const desde = datos.primero ? `${fecha(datos.primero, idioma)} - ${t.hoy}` : '';
  const columna = (x, valor, titulo, detalle, clase) => `<g class="${clase}">
<text x="${x}" y="92" class="num">${valor}</text>
<text x="${x}" y="128" class="tit">${titulo}</text>
<text x="${x}" y="150" class="det">${detalle}</text>
</g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 495 195" width="495" height="195" role="img" aria-label="${t.etiqueta}: ${datos.actual.dias}">
<style>
text{font-family:"Segoe UI",Ubuntu,"Helvetica Neue",sans-serif;text-anchor:middle}
.num{font-size:28px;font-weight:700;fill:#8c959f}
.tit{font-size:14px;fill:#8c959f}
.det{font-size:12px;fill:#8c959f}
.centro .num{fill:#8c959f}
.centro .tit{fill:#1a5fb4;font-weight:700}
.col{opacity:0;animation:entrar .6s ease-out forwards}
.c2{animation-delay:.2s}.c3{animation-delay:.4s}
.aro{stroke-dasharray:252;stroke-dashoffset:252;animation:aro 1s ease-out .2s forwards}
@keyframes entrar{to{opacity:1}}
@keyframes aro{to{stroke-dashoffset:0}}
@media (prefers-reduced-motion:reduce){.col,.aro{animation:none;opacity:1;stroke-dashoffset:0}}
</style>
<line x1="165" y1="28" x2="165" y2="170" stroke="#8c959f" stroke-opacity=".4"/>
<line x1="330" y1="28" x2="330" y2="170" stroke="#8c959f" stroke-opacity=".4"/>
${columna(82.5, numero(datos.total), t.total, desde, 'col')}
<g class="col c2 centro">
<circle class="aro" cx="247.5" cy="71" r="40" fill="none" stroke="#1a5fb4" stroke-width="5" transform="rotate(-90 247.5 71)"/>
<path d="M247.5 19c4 5 7 8 7 12.5a7 7 0 0 1-14 0c0-2.5 1.2-4.5 3-6 .3 2.4 1.6 3.6 3 3.6 1.4-2.8.8-6.4 1-10.1z" fill="#d9480f"/>
<text x="247.5" y="82" class="num">${datos.actual.dias}</text>
<text x="247.5" y="140" class="tit">${t.actual}</text>
<text x="247.5" y="162" class="det">${rango(datos.actual, idioma, hoy, t)}</text>
</g>
${columna(412.5, datos.larga.dias, t.larga, rango(datos.larga, idioma, hoy, t), 'col c3')}
</svg>
`;
}

async function main() {
  const [usuario, carpeta = 'salida'] = process.argv.slice(2);
  const token = process.env.GITHUB_TOKEN;
  if (!usuario || !token) throw new Error('uso: GITHUB_TOKEN=... node scripts/racha.js <usuario> [carpeta]');
  const ahora = new Date();
  const hoy = ahora.toISOString().slice(0, 10);
  const datos = calcular(await traerDias(usuario, token, ahora), hoy);
  fs.mkdirSync(carpeta, { recursive: true });
  for (const idioma of Object.keys(textos)) fs.writeFileSync(path.join(carpeta, `racha-${idioma}.svg`), construirSvg(datos, idioma, hoy));
  console.log(`racha: ${datos.total} contribuciones, actual ${datos.actual.dias}, mas larga ${datos.larga.dias}`);
}

if (require.main === module) {
  main().catch((e) => {
    console.error(e.message);
    process.exit(1);
  });
}

module.exports = { calcular, construirSvg, traerDias };
