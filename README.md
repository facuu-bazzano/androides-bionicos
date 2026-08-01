# Androides Biónicos · Academia personal

Sitio estático e interactivo para estudiar el temario del webinar de Androides Biónicos, relacionar cada tema con las consignas del examen y elaborar respuestas propias desde la comprensión.

## Qué incluye

- Dashboard con avance general y rutas de estudio.
- Nueve módulos organizados desde la selección del androide hasta su manufactura.
- Explicaciones, comparaciones, diagramas y ejemplos aplicados.
- Relación explícita entre cada módulo y las cuatro preguntas del examen.
- Taller para elegir cinco etapas en la pregunta 2.
- Borradores con guardado automático por consigna.
- Autoevaluaciones en cada módulo.
- Glosario con búsqueda y filtros por pregunta.
- Tarjetas de estudio con clasificación «dominado / repasar».
- Búsqueda global mediante `Ctrl/Cmd + K`.
- Tema claro y oscuro.
- Diseño responsive para escritorio, tablet y móvil.

## Alcance del contenido

El contenido fue reconstruido a partir de:

1. El temario escrito del webinar.
2. Los apuntes tomados durante la síntesis final.
3. Las pistas incluidas en las consignas del examen.
4. Explicaciones técnicas generales de robótica, control, biosensores y manufactura aditiva.

No es una transcripción oficial del webinar ni un banco oficial de respuestas de P4H Bionics. La interfaz diferencia contenido directo, hipótesis probables y ampliaciones didácticas.

## Arquitectura

No utiliza frameworks ni dependencias de producción.

```text
.
├── index.html       # Estructura base y shell de navegación
├── styles.css       # Sistema visual, responsive y temas
├── content.js       # Contenido curricular estructurado
├── app.js           # Router, filtros, progreso y actividades
├── favicon.svg
└── .nojekyll        # Publicación estática sin procesamiento de Jekyll
```

La navegación usa rutas con hash (`#/modulo/biosensores`), por lo que funciona correctamente como sitio estático dentro de un subdirectorio de GitHub Pages.

## Ejecutar localmente

Podés abrir `index.html` directamente o iniciar un servidor estático:

```bash
python -m http.server 8000
```

Después abrí `http://localhost:8000`.

## Publicación en GitHub Pages

GitHub Pages ya está configurado para publicar la raíz de la rama `main`. Cada cambio enviado a esa rama activa automáticamente el despliegue nativo **Pages Build and Deployment**; no hay pasos de instalación ni workflows manuales.

La dirección esperada es:

```text
https://facuu-bazzano.github.io/androides-bionicos/
```

## Persistencia y privacidad

El progreso se almacena exclusivamente en `localStorage` del navegador:

- módulos completados;
- respuestas de autoevaluación;
- notas personales;
- borradores del examen;
- selección de cinco etapas;
- estado de las tarjetas;
- módulos guardados.

No existe backend ni envío de información a un servidor. Borrar los datos del navegador o usar otro dispositivo inicia un progreso independiente.

## Edición del contenido

El contenido vive en `content.js` dentro del objeto global `window.AB_CONTENT`. Cada módulo contiene:

- metadatos;
- objetivos de aprendizaje;
- secciones;
- conceptos clave;
- proceso aplicado;
- ejemplo;
- autoevaluación;
- ideas para retener.

Esto permite ampliar el curso sin modificar el motor principal de la interfaz.
