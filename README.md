# Práctica PER

Sitio estático para practicar preguntas del examen PER en español. Contiene 2.291 preguntas practicables extraídas de `PER-preguntas-con-respuestas.pdf`, incluidas 297 de Carta de navegación, con los enunciados originales (a menudo bilingües), opciones, respuestas y recortes de las figuras presentes en el PDF.

En «Tema y grupo» se puede elegir un bloque de hasta 50 preguntas de los temas habituales, o de hasta 10 preguntas en Carta de navegación: «Seguridad 1», «Seguridad 2», etc. También se puede practicar el banco completo. Los errores y el puntaje guardados en el navegador siguen disponibles después de actualizar la web.

## Ejecutar localmente

Desde la carpeta `per-practice`, ejecutar `python -m http.server 8000` y abrir `http://localhost:8000/`. Abrir directamente `index.html` como archivo puede impedir la carga de `questions.json` y `explanations.json` por las restricciones del navegador.

## Publicar en GitHub Pages

1. Subir el contenido de esta carpeta a la raíz de un repositorio público de GitHub (o conservar la carpeta y elegir `/docs` tras renombrarla a `docs`).
2. En **Settings → Pages**, elegir **Deploy from a branch**, rama `main` y carpeta `/ (root)`; guardar.
3. Abrir la URL publicada que GitHub mostrará en Pages. Las rutas relativas funcionan en repositorios de proyecto (`usuario.github.io/repositorio/`).

No requiere instalación, compilación, servidor de aplicaciones ni servicios externos.

## Estructura

- `index.html`: interfaz en español.
- `styles.css`: diseño adaptable.
- `app.js`: modos, corrección y progreso en `localStorage`.
- `questions.json`: banco de preguntas.
- `explanations.json`: explicaciones revisadas para 492 preguntas de RIPA, Maniobra y Emergencias; cuando no hay una justificación segura, la web lo indica después de responder.
- `figures/`: recortes de preguntas con figuras o esquemas.
- `extraction-report.json`: conteos y preguntas que requieren revisión.

El progreso se guarda solo en el navegador y se puede borrar desde la pantalla inicial.

Las explicaciones aparecen únicamente después de comprobar una respuesta. En algunos casos también explican por qué la opción elegida no corresponde. Las referencias principales son el [RIPA publicado en el BOE](https://www.boe.es/buscar/act.php?id=BOE-A-1977-15605), las [recomendaciones de Salvamento Marítimo](https://www.salvamentomaritimo.es/mejora-tu-seguridad/actuar-en-emergencias) y la [clasificación de incendios del INSST](https://www.insst.es/documentacion/colecciones-tecnicas/ntp-notas-tecnicas-de-prevencion). Las preguntas con figuras que no permiten justificar la respuesta sin revisar la imagen de forma individual se dejaron sin explicación.

**Importante al publicar:** se deben subir todos los archivos de `figures/`. Si falta uno, la web indica el nombre del archivo ausente junto a la pregunta. Para actualizar un repositorio existente, copiá el contenido del ZIP de actualización sobre la carpeta del proyecto y subí los archivos modificados.

## Control de extracción

Se cotejaron los 2.365 rótulos del PDF. Hay cuatro preguntas anuladas, 44 incompletas o con claves contradictorias y 24 duplicadas. En la extracción original, las 2.293 preguntas tenían cuatro opciones y una respuesta presente entre ellas. De Carta de navegación se añadieron 297: se excluyeron dos anuladas, una incompleta, dos con respuestas contradictorias y doce duplicadas. Muchos ejercicios de carta requieren la carta náutica externa, que no figura en el PDF recopilado. `extraction-report.json` identifica por número las 44 preguntas que requieren revisar el PDF fuente. Luego se excluyeron dos preguntas de Balizamiento sin opción correcta; el banco actual tiene 2.291 preguntas. Las preguntas con el mismo texto pero dibujos distintos se conservaron.
