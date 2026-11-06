import type { Locale } from "./config";

const es = {
  meta: {
    title: "DYMCON Arquitectura & Construcción | Lima, Perú",
    description:
      "DYMCON Arquitectura & Construcción en Lima, Perú. Diseñamos y construimos tu proyecto, desde la idea hasta la obra terminada. Escríbenos y conversemos.",
  },
  nav: {
    about: "Nosotros",
    services: "Servicios",
    process: "Cómo trabajamos",
    tech: "Tecnología",
    contact: "Contacto",
    cta: "Cotiza tu proyecto",
    menu: "Menú",
    close: "Cerrar",
    skip: "Saltar al contenido",
    home: "Inicio",
  },
  hero: {
    eyebrow: "Arquitectura & Construcción",
    title: ["Diseñamos", "y", "construimos", "en", "Lima."],
    primary: "Cotiza tu proyecto",
    secondary: "Ver servicios",
    scroll: "Desplázate",
  },
  about: {
    eyebrow: "Nosotros",
    title: "Una sola empresa, del plano a la obra.",
    body: "DYMCON es una empresa de arquitectura y construcción con sede en Lima, Perú.",
    brochure: "Descargar brochure (PDF)",
    imageAlt:
      "Logo de DYMCON Arquitectura & Construcción entre un edificio residencial escalonado y una torre de vidrio",
  },
  services: { eyebrow: "Servicios", title: "Lo que hacemos" },
  process: {
    eyebrow: "Cómo trabajamos",
    title: "Cinco etapas, un solo responsable.",
    steps: [
      { t: "Pre-construcción", d: "Revisamos el terreno, el alcance y el presupuesto antes de empezar." },
      { t: "BIM / VDC", d: "Modelamos el proyecto en 3D para coordinar las especialidades antes de construir." },
      { t: "Construcción", d: "Ejecutamos la obra según el modelo y el cronograma aprobados." },
      { t: "Entrega", d: "Entregamos la obra terminada con su documentación." },
      { t: "Postventa", d: "Atendemos las observaciones después de la entrega." },
    ],
  },
  manifesto: {
    eyebrow: "Manifiesto",
    title: "Del plano a la obra.",
  },
  tech: {
    eyebrow: "Tecnología",
    title: "Herramientas para construir con menos incertidumbre.",
    items: [
      { t: "BIM", d: "Modelo digital del edificio que reúne arquitectura, estructuras e instalaciones." },
      { t: "Lean Construction", d: "Planificación de obra enfocada en reducir esperas y desperdicios." },
      { t: "Drones", d: "Vuelos de registro para medir y documentar el avance de obra." },
      { t: "IA en control de obra", d: "Análisis de datos de obra para detectar desviaciones a tiempo." },
    ],
  },
  cta: {
    eyebrow: "Contacto",
    title: "¿Tienes un proyecto en mente?",
    body: "Cuéntanos qué quieres construir y te respondemos.",
  },
  form: {
    name: "Nombre",
    email: "Correo",
    phone: "Teléfono (opcional)",
    message: "Cuéntanos sobre tu proyecto",
    consent: "Acepto el tratamiento de mis datos personales según la",
    policy: "Política de privacidad",
    submit: "Enviar mensaje",
    sending: "Enviando…",
    ok: "Mensaje enviado. Te responderemos pronto.",
    error: "No se pudo enviar. Revisa tu conexión e inténtalo otra vez.",
    notReady: "El formulario aún no está activo. PENDIENTE: configurar Firebase.",
    required: "Este campo es obligatorio.",
    invalidEmail: "Escribe un correo válido, por ejemplo nombre@correo.com.",
    consentRequired: "Necesitamos tu aceptación para responderte.",
    whatsapp: "O escríbenos por WhatsApp",
  },
  footer: {
    rights: "Todos los derechos reservados.",
    privacy: "Política de privacidad",
    location: "Lima, Perú",
  },
  cookies: {
    text: "Usamos cookies de Google Analytics para medir las visitas, solo si aceptas.",
    accept: "Aceptar",
    reject: "Rechazar",
  },
  notFound: { title: "Página no encontrada", body: "La dirección que escribiste no existe.", back: "Volver al inicio" },
  privacy: { title: "Política de privacidad" },
  whatsapp: "Escríbenos por WhatsApp",
};

export type Dictionary = typeof es;

const en: Dictionary = {
  meta: {
    title: "DYMCON Architecture & Construction | Lima, Peru",
    description:
      "DYMCON Architecture & Construction in Lima, Peru. We design and build your project, from the first idea to the finished building. Get in touch with us.",
  },
  nav: {
    about: "About",
    services: "Services",
    process: "How we work",
    tech: "Technology",
    contact: "Contact",
    cta: "Get a quote",
    menu: "Menu",
    close: "Close",
    skip: "Skip to content",
    home: "Home",
  },
  hero: {
    eyebrow: "Architecture & Construction",
    title: ["We", "design", "and", "build", "in", "Lima."],
    primary: "Get a quote",
    secondary: "See services",
    scroll: "Scroll",
  },
  about: {
    eyebrow: "About",
    title: "One company, from drawings to the building site.",
    body: "DYMCON is an architecture and construction company based in Lima, Peru.",
    brochure: "Download brochure (PDF)",
    imageAlt:
      "DYMCON Architecture & Construction logo between a stepped residential building and a glass tower",
  },
  services: { eyebrow: "Services", title: "What we do" },
  process: {
    eyebrow: "How we work",
    title: "Five stages, one team in charge.",
    steps: [
      { t: "Pre-construction", d: "We review the site, scope and budget before work begins." },
      { t: "BIM / VDC", d: "We model the project in 3D to coordinate every discipline before building." },
      { t: "Construction", d: "We build according to the approved model and schedule." },
      { t: "Handover", d: "We hand over the finished building with its documentation." },
      { t: "After-sales", d: "We follow up on any issues after handover." },
    ],
  },
  manifesto: {
    eyebrow: "Manifesto",
    title: "From blueprint to building.",
  },
  tech: {
    eyebrow: "Technology",
    title: "Tools to build with less uncertainty.",
    items: [
      { t: "BIM", d: "A digital building model that brings architecture, structure and MEP together." },
      { t: "Lean Construction", d: "Site planning focused on cutting waiting time and waste." },
      { t: "Drones", d: "Survey flights to measure and document progress on site." },
      { t: "AI for site control", d: "Analysis of site data to catch deviations early." },
    ],
  },
  cta: {
    eyebrow: "Contact",
    title: "Have a project in mind?",
    body: "Tell us what you want to build and we will get back to you.",
  },
  form: {
    name: "Name",
    email: "Email",
    phone: "Phone (optional)",
    message: "Tell us about your project",
    consent: "I agree to the processing of my personal data under the",
    policy: "Privacy policy",
    submit: "Send message",
    sending: "Sending…",
    ok: "Message sent. We will get back to you soon.",
    error: "The message could not be sent. Check your connection and try again.",
    notReady: "The form is not active yet. PENDING: Firebase setup.",
    required: "This field is required.",
    invalidEmail: "Enter a valid email, for example name@email.com.",
    consentRequired: "We need your consent to reply.",
    whatsapp: "Or message us on WhatsApp",
  },
  footer: { rights: "All rights reserved.", privacy: "Privacy policy", location: "Lima, Peru" },
  cookies: {
    text: "We use Google Analytics cookies to measure visits, only if you accept.",
    accept: "Accept",
    reject: "Reject",
  },
  notFound: { title: "Page not found", body: "The address you entered does not exist.", back: "Back to home" },
  privacy: { title: "Privacy policy" },
  whatsapp: "Message us on WhatsApp",
};

export const getDictionary = (l: Locale): Dictionary => (l === "en" ? en : es);
