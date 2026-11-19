# Reglas del repositorio

## Comandos

- Probar todo: `node --test "pruebas/*.test.js"` (obligatorio antes de cada commit)
- Entregar: `node "D:/NITRO 5/Skills/git/entregar.js" "tipo: descripcion" --probar "node --test pruebas/*.test.js"`

## Reglas

- Leer `docs/learnings.md` antes de empezar y anotar ahí cada error que se repita.
- Una funcionalidad por rama y por PR; commits `tipo: descripción` en español.
- Nada de force, reset --hard, amend ni rebase sobre lo publicado; se corrige con `git revert`.
- Sin atribución a herramientas de IA en commits, PRs ni archivos.
- Archivos de código de máximo 700 líneas.
- El `.env` real no se sube; cada variable nueva va documentada en `.env.example`.
- Los SVG van sin dependencias externas y respetan `prefers-reduced-motion`.
- Una tarea solo se cierra con las pruebas en verde y su salida pegada en el PR.

## Estructura

- `img/`: animaciones SVG propias del perfil (hero, terminal, tarjetas, íconos)
- `pruebas/`: pruebas con `node --test`
- `scripts/`: generador del banner; el workflow Graficos lo publica en la rama `salida`
