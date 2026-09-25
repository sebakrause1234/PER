# Práctica PER

Sitio estático para practicar preguntas del examen PER en español. Contiene 1.996 preguntas válidas (excluye por pedido la sección «Carta de navegación») del banco extraído de `PER-preguntas-con-respuestas.pdf`, con los enunciados originales (a menudo bilingües), opciones, respuestas y recortes de las figuras presentes en el PDF.

En «Tema y grupo» se puede elegir un bloque de hasta 50 preguntas: «Seguridad 1», «Seguridad 2», etc. También se puede practicar el banco completo. Los errores y el puntaje guardados en el navegador siguen disponibles después de actualizar la web.

## Ejecutar localmente

Desde la carpeta `per-practice`, ejecutar `python -m http.server 8000` y abrir `http://localhost:8000/`. Abrir directamente `index.html` como archivo puede impedir la carga de `questions.json` por las restricciones del navegador.

## Publicar en GitHub Pages

1. Subir el contenido de esta carpeta a la raíz de un repositorio público de GitHub (o conservar la carpeta y elegir `/docs` tras renombrarla a `docs`).
2. En **Settings → Pages**, elegir **Deploy from a branch**, rama `main` y carpeta `/ (root)`; guardar.
3. Abrir la URL publicada que GitHub mostrará en Pages. Las rutas relativas funcionan en repositorios de proyecto (`usuario.github.io/repositorio/`).

No requiere instalación, compilación, servidor de aplicaciones ni servicios externos.

## Estructura

- `index.html`: interfaz en español.
- `styles.css`: diseño adaptable.
- `app.js`: modos, corrección y progreso en `localStorage`.
- `questions.json`: banco validado.
- `figures/`: recortes de preguntas con figuras o esquemas.
- `extraction-report.json`: conteos y preguntas que requieren revisión.

El progreso se guarda solo en el navegador y se puede borrar desde la pantalla inicial.

**Importante al publicar:** se deben subir todos los archivos de `figures/`. Si falta uno, la web indica el nombre del archivo ausente junto a la pregunta. Para actualizar un repositorio existente, copiá los archivos nuevos sobre la carpeta del proyecto y subilos junto con `app.js` e `index.html`.

## Control de extracción

Se cotejaron los 2.365 rótulos del PDF. Se excluyeron 314 preguntas de Carta de navegación, incluidas dos anuladas; en los otros temas se excluyeron otras dos anuladas, 41 preguntas incompletas o ambiguas y 12 duplicados textuales sin diferencias de figura. Las 1.996 preguntas publicadas tienen cuatro opciones y una única respuesta presente entre ellas. `extraction-report.json` identifica por número las 41 preguntas que requieren revisar el PDF fuente. Las preguntas con el mismo texto pero dibujos distintos se conservaron.
