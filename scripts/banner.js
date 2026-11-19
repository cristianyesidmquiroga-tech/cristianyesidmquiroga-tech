const fs = require('fs');
const path = require('path');

const paso = 14;
const lado = 11;
const margen = 20;
const porCelda = 0.06;
const giro = 0.4;

const temas = {
  claro: { vacio: '#ebedf0', tierra: '#d8c3a0', cultivo: ['#9be9a8', '#40c463', '#30a14e', '#216e39'], humo: '#8c959f' },
  oscuro: { vacio: '#161b22', tierra: '#4a3826', cultivo: ['#0e4429', '#006d32', '#26a641', '#39d353'], humo: '#6e7681' },
};

const niveles = { FIRST_QUARTILE: 0, SECOND_QUARTILE: 1, THIRD_QUARTILE: 2, FOURTH_QUARTILE: 3 };

async function traerCalendario(usuario, token) {
  const query = `query($u:String!){user(login:$u){contributionsCollection{contributionCalendar{weeks{contributionDays{contributionLevel weekday}}}}}}`;
  const r = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `bearer ${token}`, 'Content-Type': 'application/json', 'User-Agent': 'banner-cosecha' },
    body: JSON.stringify({ query, variables: { u: usuario } }),
  });
  const datos = await r.json();
  if (!r.ok || datos.errors) throw new Error(`GitHub respondio ${r.status}: ${JSON.stringify(datos.errors || datos)}`);
  return datos.data.user.contributionsCollection.contributionCalendar.weeks.map((w) =>
    w.contributionDays.map((d) => ({ dia: d.weekday, nivel: d.contributionLevel in niveles ? niveles[d.contributionLevel] : -1 }))
  );
}

const fmt = (n) => Number(n.toFixed(2));

function recorrido(columnas) {
  const fila = columnas * porCelda;
  const total = 7 * (fila + giro) + 1;
  const inicio = margen - paso;
  const fin = margen + columnas * paso;
  const puntos = [];
  for (let f = 0; f < 7; f++) {
    const t0 = f * (fila + giro);
    const y = margen + f * paso + lado / 2;
    const [a, b] = f % 2 ? [fin, inicio] : [inicio, fin];
    puntos.push({ t: t0, x: a, y, f }, { t: t0 + fila, x: b, y, f });
  }
  puntos.push({ t: total, x: puntos.at(-1).x, y: puntos.at(-1).y, f: 6 });
  const llegada = (col, f) => {
    const [a, b] = f % 2 ? [fin, inicio] : [inicio, fin];
    const centro = margen + col * paso + lado / 2;
    return f * (fila + giro) + ((centro - a) / (b - a)) * fila;
  };
  return { total, puntos, llegada };
}

function tractor(c) {
  return `<g class="tractor"><g class="voltear">
<circle class="humo" cx="5" cy="-12" r="2.2" fill="${c.humo}"/>
<circle class="humo h2" cx="5" cy="-12" r="2.2" fill="${c.humo}"/>
<rect x="4" y="-10" width="2" height="7" fill="#57606a"/>
<rect x="-11" y="-14" width="10" height="12" rx="2" fill="#0b2a4a"/>
<rect x="-9" y="-12" width="6" height="5" rx="1" fill="#a5d8ff"/>
<rect x="-5" y="-3" width="17" height="7" rx="2" fill="#d9480f"/>
<rect x="9" y="-2" width="3" height="3" fill="#ffd43b"/>
<g class="rueda"><circle cx="-6" cy="4" r="6.5" fill="#24292f"/><circle cx="-6" cy="4" r="2.5" fill="#adb5bd"/><rect x="-6.6" y="-2" width="1.2" height="12" fill="#57606a"/></g>
<g class="rueda"><circle cx="9" cy="6.5" r="4" fill="#24292f"/><circle cx="9" cy="6.5" r="1.5" fill="#adb5bd"/><rect x="8.5" y="2.8" width="1" height="7.4" fill="#57606a"/></g>
</g></g>`;
}

function construirSvg(semanas, tema = 'claro') {
  const c = temas[tema];
  const columnas = semanas.length;
  const { total, puntos, llegada } = recorrido(columnas);
  const pausa = total * 0.45;
  const ancho = margen * 2 + columnas * paso - (paso - lado);
  const alto = margen * 2 + 7 * paso - (paso - lado);
  const celdas = [];
  semanas.forEach((dias, col) =>
    dias.forEach(({ dia, nivel }) => {
      const x = margen + col * paso;
      const y = margen + dia * paso;
      if (nivel < 0) {
        celdas.push(`<rect x="${x}" y="${y}" width="${lado}" height="${lado}" rx="2" fill="${c.vacio}"/>`);
        return;
      }
      const retraso = fmt(llegada(col, dia) - total);
      celdas.push(
        `<rect x="${x}" y="${y}" width="${lado}" height="${lado}" rx="2" fill="${c.tierra}"/>`,
        `<rect class="cultivo" style="animation-delay:${retraso}s" x="${x}" y="${y}" width="${lado}" height="${lado}" rx="2" fill="${c.cultivo[nivel]}"/>`
      );
    })
  );
  const mover = puntos.map((p) => `${fmt((p.t / total) * 100)}%{transform:translate(${p.x}px,${p.y}px)}`).join('');
  const voltear = puntos.map((p) => `${fmt((p.t / total) * 100)}%{transform:scaleX(${p.f % 2 ? -1 : 1})}`).join('');
  const oculto = fmt((pausa / total) * 100);
  const css = `.cultivo{transform-box:fill-box;transform-origin:center;animation:cosecha ${fmt(total)}s linear infinite}
@keyframes cosecha{0%{opacity:0;transform:scale(.4)}${oculto}%{opacity:0;transform:scale(.4)}${fmt(oculto + 4)}%{opacity:1;transform:scale(1)}100%{opacity:1;transform:scale(1)}}
.tractor{animation:mover ${fmt(total)}s linear infinite}
@keyframes mover{${mover}}
.voltear{animation:voltear ${fmt(total)}s step-end infinite}
@keyframes voltear{${voltear}}
.rueda{transform-box:fill-box;transform-origin:center;animation:girar .8s linear infinite}
@keyframes girar{to{transform:rotate(360deg)}}
.humo{transform-box:fill-box;transform-origin:center;animation:humo 1.2s ease-out infinite}
.h2{animation-delay:-.6s}
@keyframes humo{0%{opacity:.8;transform:translate(0,0) scale(.6)}100%{opacity:0;transform:translate(-6px,-10px) scale(1.6)}}
@media (prefers-reduced-motion:reduce){*{animation:none!important}.tractor{transform:translate(${margen - paso}px,${margen + lado / 2}px)}}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ancho} ${alto}" width="${ancho}" height="${alto}" role="img" aria-label="Tractor que cosecha el calendario de contribuciones">
<style>${css}</style>
${celdas.join('\n')}
${tractor(c)}
</svg>
`;
}

async function main() {
  const [usuario, carpeta = 'salida'] = process.argv.slice(2);
  const token = process.env.GITHUB_TOKEN;
  if (!usuario || !token) throw new Error('uso: GITHUB_TOKEN=... node scripts/banner.js <usuario> [carpeta]');
  const semanas = await traerCalendario(usuario, token);
  fs.mkdirSync(carpeta, { recursive: true });
  fs.writeFileSync(path.join(carpeta, 'cosecha.svg'), construirSvg(semanas, 'claro'));
  fs.writeFileSync(path.join(carpeta, 'cosecha-oscuro.svg'), construirSvg(semanas, 'oscuro'));
  console.log(`banner generado en ${carpeta} con ${semanas.length} semanas`);
}

if (require.main === module) {
  main().catch((e) => {
    console.error(e.message);
    process.exit(1);
  });
}

module.exports = { construirSvg, recorrido, traerCalendario };
