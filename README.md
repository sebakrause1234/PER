# Práctica PER

Sitio estático para practicar preguntas del examen PER en español. Contiene 2.293 preguntas válidas extraídas de `PER-preguntas-con-respuestas.pdf`, incluidas 297 de Carta de navegación, con los enunciados originales (a menudo bilingües), opciones, respuestas y recortes de las figuras presentes en el PDF.

En «Tema y grupo» se puede elegir un bloque de hasta 50 preguntas de los temas habituales, o de hasta 10 preguntas en Carta de navegación: «Seguridad 1», «Seguridad 2», etc. También se puede practicar el banco completo. Los errores y el puntaje guardados en el navegador siguen disponibles después de actualizar la web.

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

**Importante al publicar:** se deben subir todos los archivos de `figures/`. Si falta uno, la web indica el nombre del archivo ausente junto a la pregunta. Para actualizar un repositorio existente, copiá el contenido del ZIP de actualización sobre la carpeta del proyecto y subí los archivos modificados.

## Control de extracción

Se cotejaron los 2.365 rótulos del PDF. Hay cuatro preguntas anuladas, 44 incompletas o con claves contradictorias y 24 duplicadas. Las 2.293 preguntas publicadas tienen cuatro opciones y una respuesta presente entre ellas. De Carta de navegación se añadieron 297: se excluyeron dos anuladas, una incompleta, dos con respuestas contradictorias y doce duplicadas. Muchos ejercicios de carta requieren la carta náutica externa, que no figura en el PDF recopilado. `extraction-report.json` identifica por número las 44 preguntas que requieren revisar el PDF fuente. Las preguntas con el mismo texto pero dibujos distintos se conservaron.
