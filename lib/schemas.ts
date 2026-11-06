import { z } from "zod";

export const Localized = z.object({ es: z.string().min(1), en: z.string().min(1) });
export type Localized = z.infer<typeof Localized>;

export const Kpi = z.object({
  valor: z.number(),
  sufijo: z.string().default(""),
  etiqueta: Localized,
});

export const Empresa = z.object({
  nombre: z.string(),
  nombreCompleto: z.string(),
  ciudad: z.string(),
  pais: z.string(),
  especialidad: Localized.nullable(),
  propuestaDeValor: Localized,
  kpis: z.array(Kpi),
  mision: Localized.nullable(),
  vision: Localized.nullable(),
  valores: z.array(Localized),
  sectores: z.array(z.object({ id: z.string(), nombre: Localized })),
  certificaciones: z.array(z.string()),
  contacto: z.object({
    direccion: z.string().nullable(),
    telefono: z.string().nullable(),
    correo: z.string().email().nullable(),
    whatsapp: z.string().regex(/^\d{9,15}$/, "Solo números con código de país, ej. 51987654321").nullable(),
    redes: z.array(z.object({ red: z.string(), url: z.string().url() })),
  }),
  brochurePdf: z.string().nullable(),
  heroVideo: z
    .object({ horizontal: z.string(), vertical: z.string(), poster: z.string() })
    .nullable(),
  historia: z.array(z.object({ anio: z.number(), texto: Localized })),
  clientes: z.array(z.object({ nombre: z.string(), logo: z.string() })),
});
export type Empresa = z.infer<typeof Empresa>;

export const Servicio = z.object({
  slug: z.string(),
  codigo: z.string(),
  titulo: Localized,
  resumen: Localized,
  imagen: z.string().nullable(),
});
export type Servicio = z.infer<typeof Servicio>;

export const Proyecto = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  titulo: Localized,
  sector: z.string(),
  cliente: z.string().nullable(),
  ubicacion: z.string(),
  areaM2: z.number().nullable(),
  pisos: z.number().nullable(),
  sotanos: z.number().nullable(),
  plazoMeses: z.number().nullable(),
  tipoContrato: z.string().nullable(),
  anio: z.number(),
  destacado: z.boolean(),
  portada: z.string(),
  galeria: z.array(z.string()),
  antesDespues: z.object({ antes: z.string(), despues: z.string() }).nullable(),
  resumen: Localized,
});
export type Proyecto = z.infer<typeof Proyecto>;

export const Noticia = z.object({
  slug: z.string(),
  fecha: z.string(),
  titulo: Localized,
  resumen: Localized,
  imagen: z.string().nullable(),
});
export type Noticia = z.infer<typeof Noticia>;
