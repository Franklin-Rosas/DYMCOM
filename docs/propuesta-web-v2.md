# Propuesta web v2: arquitectura y sistema de diseño

Estado: **EN REVISIÓN**. No se construye nada hasta que el usuario diga «sí».
La web actual (`public/`) sigue publicada; la v2 se construye en una rama aparte
y se revisa con la vista previa de cada pull request antes de reemplazarla.

## 1. Arquitectura de carpetas

```
DYMCOM/
├── app/
│   ├── [lang]/                      # /es y /en (generateStaticParams)
│   │   ├── layout.tsx               # header, footer, Lenis, cursor, cookies, WhatsApp
│   │   ├── page.tsx                 # Home (14 secciones)
│   │   ├── nosotros/page.tsx
│   │   ├── servicios/[slug]/page.tsx
│   │   ├── proyectos/page.tsx
│   │   ├── proyectos/[slug]/page.tsx
│   │   ├── tecnologia/page.tsx
│   │   ├── sostenibilidad/page.tsx
│   │   ├── noticias/page.tsx
│   │   ├── noticias/[slug]/page.tsx
│   │   ├── contacto/page.tsx
│   │   ├── trabaja-con-nosotros/page.tsx
│   │   └── politica-de-privacidad/page.tsx
│   ├── not-found.tsx                # 404 personalizada
│   ├── sitemap.ts                   # sitemap.xml generado en build
│   └── robots.ts                    # robots.txt generado en build
├── components/
│   ├── ui/                          # Button, MagneticButton, Container, Grid, Tag, Input…
│   ├── motion/                      # RevealText, MaskImage, Parallax, Counter, Cursor, PageTransition
│   ├── brand/                       # BlueprintGrid, Dimension (cotas), Coordinates, ConcreteNoise
│   ├── sections/                    # Hero, Kpis, About, Services, Projects, Process, Tech…
│   └── three/BuildingViewer.tsx     # React Three Fiber, dynamic import sin SSR
├── content/                         # agregar un proyecto = agregar un archivo
│   ├── proyectos/*.mdx
│   ├── noticias/*.mdx
│   ├── servicios/*.mdx
│   ├── equipo/*.json
│   ├── empresa.json                 # KPIs, misión, visión, valores, contacto, ISOs
│   └── schemas.ts                   # validación con Zod (el build falla si falta un campo)
├── i18n/es.json, i18n/en.json       # textos de interfaz
├── lib/                             # firebase.ts, seo.ts (schema.org), content.ts
├── public/brand/                    # logos (SVG cuando exista; hoy PNG/WebP)
├── media/originales/                # fotos y videos originales (no se publican)
├── scripts/optimize-images.mjs      # sharp → WebP + AVIF en 640/1280/1920
├── firebase.json                    # public = "out", cachés, cabeceras de seguridad
├── firestore.rules                  # solo "create" validado en "leads", sin lectura pública
├── .env.example                     # NEXT_PUBLIC_FIREBASE_* (sin valores reales)
├── .github/workflows/deploy.yml     # push a main: npm ci → lint → build → deploy live
├── .github/workflows/preview.yml    # pull request: preview + comentario con la URL + Lighthouse CI
└── README.md
```

## 2. Sistema de diseño

### Color (tokens)

| Token | HEX | Origen | Uso |
|---|---|---|---|
| `carbon` | `#0E0E10` | brief | Fondos oscuros: hero, KPIs, tecnología, CTA final |
| `concreto` | `#8A8A85` | brief | Texto secundario, líneas de plano, cotas |
| `hueso` | `#F4F2EE` | brief | Fondo de contenido claro |
| `negro-marca` | `#111111` | logo DYMCON | Logo y titulares sobre claro |
| `granate` | `#460003` | logo MD Studio (muestreado) | Acento único: CTA, hover, foco |
| `marfil` | `#E8E2D0` | logo MD Studio (muestreado) | Detalles sobre oscuro |

Los colores oficiales de marca en HEX son **PENDIENTE**. Los de arriba se tomaron de
las imágenes del logo y se deben confirmar.

### Tipografía

- Titulares: **Manrope** 600–800, `clamp(3rem, 8vw + 1rem, 8.75rem)` (48 → 140 px), interlineado 0.95, tracking −0.03em.
- Texto: **Inter** 400/500, 17–18 px, interlineado 1.6, ancho máximo de 65 caracteres.
- Datos técnicos (cotas, coordenadas, fichas): Inter con `tabular-nums`, versalitas con tracking +0.12em.
- Las fuentes se sirven desde la misma web (`next/font`): no se depende de Google Fonts al cargar.
- Clash Display no está en Google Fonts (viene de Fontshare). Se puede usar si el usuario lo aprueba.

Escala: 12 · 14 · 16 · 18 · 22 · 28 · 36 · 48 · 64 · 96 · 140.

### Espaciado y grilla

- Base de 4 px. Secciones de 96 a 192 px de alto de aire (`clamp`).
- Grilla de 12 columnas con márgenes de 16 px en 360 px y de 64 px en escritorio. Composiciones asimétricas (7/5, 8/4, 5/7 desfasadas).
- Elemento de marca: una grilla tipo plano de fondo, en líneas de 1 px con 6 % de opacidad, con ejes A-B-C / 1-2-3 en el borde.

### Componentes base

`Button` (sólido / contorno / texto), `MagneticButton`, `Container`, `Section` (oscura/clara),
`Eyebrow` con cota, `RevealText`, `MaskImage`, `Counter`, `ProjectCard`, `ServiceCard`,
`FilterBar`, `Lightbox`, `BeforeAfter`, `Timeline`, `LogoMarquee`, `ContactForm`,
`CookieBanner`, `WhatsAppButton`, `LangSwitch`, `MobileMenu`.

### Motion

- Motor: GSAP + ScrollTrigger (revelados, máscaras, parallax, scroll horizontal) y Lenis (scroll suave).
- Duraciones: 0.6–1.2 s con curva `expo.out`. Escalonado de 0.06 s por palabra o línea.
- Con `prefers-reduced-motion`: sin parallax, sin scroll suave ni cursor; los textos aparecen sin moverse.
- Todo el contenido es visible sin JavaScript. La animación solo lo mejora.

## 3. Puntos a decidir (ver respuesta en el chat)

1. Correo automático del formulario (Trigger Email requiere plan Blaze).
2. App Check: reCAPTCHA v3 en vez de reCAPTCHA Enterprise.
3. Framer Motion: quitarlo y usar solo GSAP, por rendimiento.
4. Secciones sin contenido real: ocultarlas o mostrarlas con [PENDIENTE].
5. Nombre del secreto de GitHub: mantener `FIREBASE_SERVICE_ACCOUNT`.

## 4. Contenido PENDIENTE (lo entrega el usuario)

- Especialidad, propuesta de valor, KPIs (años, m², obras, trabajadores, HH sin accidentes).
- Misión, visión, valores. Servicios y sectores. Certificaciones ISO (solo si existen y están vigentes).
- Contacto completo: dirección, teléfono, correo, WhatsApp, redes.
- Logo en SVG (vectorial). Hoy solo hay PNG.
- Video de drone (se comprime a menos de 5 MB) y fotos reales de obras.
- Proyectos: cliente, ubicación, m², pisos/sótanos, plazo, tipo de contrato y fotos.
- Historia por año, logos de clientes (con permiso de uso), noticias y equipo.
- Relación entre DYMCON y MD Studio.
- Brochure en PDF.
- ID de medición de Google Analytics 4.
