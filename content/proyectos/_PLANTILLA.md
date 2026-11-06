# Cómo agregar un proyecto

1. Copia el bloque de abajo en un archivo nuevo: `content/proyectos/nombre-del-proyecto.json`.
2. Completa los datos reales. Si un dato no se conoce, déjalo en `null`.
3. Sube las fotos originales a `media/originales/proyectos/nombre-del-proyecto/`.
4. Haz commit y push: la web se compila, valida el archivo y se publica sola.
   Si falta un campo obligatorio, la compilación falla y avisa cuál es.

```json
{
  "slug": "nombre-del-proyecto",
  "titulo": { "es": "Nombre del proyecto", "en": "Project name" },
  "sector": "vivienda",
  "cliente": null,
  "ubicacion": "Distrito, Lima",
  "areaM2": null,
  "pisos": null,
  "sotanos": null,
  "plazoMeses": null,
  "tipoContrato": null,
  "anio": 2026,
  "destacado": true,
  "portada": "nombre-del-proyecto/portada",
  "galeria": [],
  "antesDespues": null,
  "resumen": { "es": "", "en": "" }
}
```
