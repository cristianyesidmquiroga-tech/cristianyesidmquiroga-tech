const test = require('node:test');
const assert = require('node:assert');
const { calcular, construirSvg, traerDias } = require('../scripts/racha.js');

const dias = (lista) => lista.map(([fecha, n]) => ({ fecha, n }));
const ejemplo = dias([
  ['2026-11-15', 3], ['2026-11-16', 5], ['2026-11-17', 1], ['2026-11-18', 0],
  ['2026-11-19', 2], ['2026-11-20', 4], ['2026-11-21', 0], ['2026-11-22', 7], ['2026-11-23', 0],
]);

test('suma todo y no cuenta dias futuros', () => {
  const r = calcular([...ejemplo, { fecha: '2026-11-24', n: 50 }], '2026-11-23');
  assert.strictEqual(r.total, 22);
  assert.strictEqual(r.primero, '2026-11-15');
});

test('hoy sin contribuciones no corta la racha', () => {
  const r = calcular(ejemplo, '2026-11-23');
  assert.deepStrictEqual(r.actual, { dias: 1, inicio: '2026-11-22', fin: '2026-11-22' });
});

test('un dia vacio antes de hoy si corta la racha', () => {
  const r = calcular(dias([['2026-11-21', 4], ['2026-11-22', 0], ['2026-11-23', 9]]), '2026-11-23');
  assert.deepStrictEqual(r.actual, { dias: 1, inicio: '2026-11-23', fin: '2026-11-23' });
});

test('la racha mas larga guarda sus fechas', () => {
  assert.deepStrictEqual(calcular(ejemplo, '2026-11-23').larga, { dias: 3, inicio: '2026-11-15', fin: '2026-11-17' });
});

test('sin contribuciones todo queda en cero', () => {
  const r = calcular(dias([['2026-11-23', 0]]), '2026-11-23');
  assert.strictEqual(r.total, 0);
  assert.strictEqual(r.actual.dias, 0);
  assert.strictEqual(r.primero, null);
});

test('la tarjeta muestra los numeros con el formato de cada idioma', () => {
  const datos = { total: 1953, primero: '2025-10-09', actual: { dias: 2, inicio: '2026-11-22', fin: '2026-11-23' }, larga: { dias: 15, inicio: '2026-11-07', fin: '2026-11-21' } };
  const es = construirSvg(datos, 'es', '2026-11-23');
  const en = construirSvg(datos, 'en', '2026-11-23');
  assert.match(es, />1\.953</);
  assert.match(es, /9 oct 2025 - Presente/);
  assert.match(es, /Racha más larga/);
  assert.match(en, />1,953</);
  assert.match(en, /Oct 9, 2025 - Present/);
  for (const svg of [es, en]) {
    assert.doesNotMatch(svg, /NaN|undefined|null/);
    assert.match(svg, /prefers-reduced-motion/);
  }
});

test('pide cada año desde que se creo la cuenta y une los dias', async () => {
  const pedidos = [];
  const original = global.fetch;
  global.fetch = async (url, op) => {
    const { variables } = JSON.parse(op.body);
    pedidos.push(variables);
    const data = variables.d
      ? { user: { contributionsCollection: { contributionCalendar: { weeks: [{ contributionDays: [{ date: variables.d.slice(0, 10), contributionCount: 2 }] }] } } } }
      : { user: { createdAt: '2025-10-09T12:00:00Z' } };
    return { ok: true, json: async () => ({ data }) };
  };
  try {
    const r = await traerDias('alguien', 't', new Date('2026-11-23T20:00:00Z'));
    assert.deepStrictEqual(pedidos.slice(1).map((p) => p.d.slice(0, 4)), ['2025', '2026']);
    assert.strictEqual(pedidos[2].h, '2026-11-23T20:00:00.000Z');
    assert.deepStrictEqual(r.map((d) => d.fecha), ['2025-01-01', '2026-01-01']);
  } finally {
    global.fetch = original;
  }
});
