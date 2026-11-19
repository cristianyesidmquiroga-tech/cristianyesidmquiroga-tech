const test = require('node:test');
const assert = require('node:assert');
const { construirSvg, recorrido } = require('../scripts/banner.js');

const semana = (niveles) => niveles.map((nivel, dia) => ({ dia, nivel }));
const calendario = [semana([-1, 0, 1, -1, 2, 3, -1]), semana([-1, -1, -1, -1, -1, -1, -1]), semana([3, -1, -1, -1])];

test('solo los dias con contribuciones tienen cultivo', () => {
  const svg = construirSvg(calendario);
  assert.strictEqual((svg.match(/class="cultivo"/g) || []).length, 5);
  assert.strictEqual((svg.match(/<rect x="\d+" y="\d+" width="11"/g) || []).length, 7 + 7 + 4);
});

test('genera un svg valido sin numeros rotos en ambos temas', () => {
  for (const tema of ['claro', 'oscuro']) {
    const svg = construirSvg(calendario, tema);
    assert.match(svg, /^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg"/);
    assert.match(svg, /<\/svg>\n$/);
    assert.doesNotMatch(svg, /NaN|undefined|Infinity/);
    assert.match(svg, /prefers-reduced-motion/);
  }
});

test('el tractor pasa por cada celda dentro del ciclo y en orden de recorrido', () => {
  const { total, llegada } = recorrido(53);
  let anterior = -1;
  for (let fila = 0; fila < 7; fila++) {
    const orden = fila % 2 ? [...Array(53).keys()].reverse() : [...Array(53).keys()];
    for (const col of orden) {
      const t = llegada(col, fila);
      assert.ok(t > anterior && t < total, `fila ${fila} columna ${col}`);
      anterior = t;
    }
  }
});

test('el cultivo se corta cuando llega el tractor', () => {
  const { total, llegada } = recorrido(calendario.length);
  const svg = construirSvg(calendario);
  const retraso = Number(svg.match(/class="cultivo" style="animation-delay:(-?[\d.]+)s"/)[1]);
  assert.ok(Math.abs(retraso - (llegada(0, 1) - total)) < 0.01);
});
