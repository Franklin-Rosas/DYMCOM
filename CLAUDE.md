# CLAUDE.md — Proyecto DYMCOM

Instrucciones para Claude (y cualquier asistente) que trabaje en este repositorio.

## Descripción del proyecto

- **Qué es:** web estática de la marca, publicada en Firebase Hosting, lista para aparecer en Google (SEO, sitemap, Search Console).
- **Qué debe hacer:** página informativa de una sola página (Servicios, Nosotros, Contacto) para que los clientes encuentren la empresa en Google.
- **Quién lo va a usar:** PENDIENTE (solo yo / mi equipo / clientes).
- **¿Necesita login?:** PENDIENTE (sí / no).
- **Marca principal:** DYMCON – Arquitectura & Construcción (logo en el banner). El repositorio se llama DYMCOM con **M**.
- **MD Studio:** su logo se usa para el favicon y la sección «Nosotros». Relación con DYMCON: PENDIENTE.
- **Ubicación del negocio:** Lima, Perú.
- **Teléfono:** PENDIENTE.
- **Correo:** PENDIENTE.
- **URL pública:** https://dymcom-98c14.web.app

## Datos técnicos

- **GitHub:** `Franklin-Rosas/DYMCOM`.
- **Firebase:** proyecto `dymcom-98c14`, plan **Spark (gratis)**.
- **Proyecto independiente:** NO tiene relación con «Metrados App». No conectarlo con él ni copiar nada de allí.

## Reglas de trabajo

1. **Idioma:** todo se explica en español, claro y paso a paso. El usuario es ingeniero civil, no programador.
2. **Todo gratis:** nada de planes de pago, Blaze, APIs ni servicios que pidan tarjeta.
3. **Sin instalaciones ni descargas grandes sin preguntar.** Internet del usuario: ~23 Mbps de bajada y ~7 Mbps de subida.
4. **Nunca guardar claves ni contraseñas en el repositorio.** Los secretos van en GitHub → Settings → Secrets.
5. **Nunca inventar datos.** Lo que no se sepa se marca como **PENDIENTE**.
6. **Cada cambio termina con commit y push.** Commits pequeños, con mensajes claros en español.
7. **Publicación automática:** al hacer push a `main`, GitHub Actions publica la web en Firebase Hosting.
   En cada pull request se genera una vista previa (preview).
8. **Decisiones del usuario:** se le preguntan con preguntas de sí/no.
9. **Reportes de avance** con este formato: **hecho · en revisión · falta**.
10. **No cambiar el diseño ni los textos visibles sin preguntar**, salvo lo necesario para el SEO.
11. **Si falta información, preguntar antes de inventarla.**
12. **Antes de construir algo nuevo, esperar el «sí» del usuario.**
13. **Al terminar cada tarea, compartir siempre el link** para ver el resultado (vista previa del pull request o web publicada).

## Estructura

```
DYMCOM/
├── CLAUDE.md
├── README.md
├── firebase.json            # Hosting + cabeceras de caché
├── .firebaserc              # id del proyecto Firebase (no es secreto)
├── .gitignore
├── .github/workflows/
│   ├── firebase-hosting-merge.yml         # deploy al hacer push a main
│   └── firebase-hosting-pull-request.yml  # preview en cada pull request
└── public/                  # todo lo que se publica
    ├── index.html
    ├── 404.html
    ├── robots.txt
    ├── sitemap.xml
    ├── site.webmanifest
    └── assets/
        ├── css/
        └── img/             # logos, favicons, imágenes WebP
```

## Partes de Firebase que se usan

- **Hosting:** sí (gratis en plan Spark).
- Authentication, Firestore, Storage, Functions: **no**, salvo que el usuario lo apruebe.
  (Functions requiere plan Blaze → no se usa.)

## Marcador de datos pendientes

- Los textos que faltan en la página llevan la clase CSS `pendiente`, que los muestra en granate.
