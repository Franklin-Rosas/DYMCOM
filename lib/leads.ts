"use client";
import { firebaseConfig, RECAPTCHA_KEY } from "./site";

export type Lead = { nombre: string; correo: string; telefono: string; mensaje: string; idioma: string; origen: string };

/**
 * Guarda un mensaje del formulario en Firestore (colección "leads").
 * El SDK de Firebase se descarga solo al enviar, para no pesar en la carga inicial.
 */
export async function sendLead(lead: Lead) {
  const [{ initializeApp, getApps }, { getFirestore, addDoc, collection, serverTimestamp }, appCheck] =
    await Promise.all([import("firebase/app"), import("firebase/firestore/lite"), import("firebase/app-check")]);
  const app = getApps()[0] ?? initializeApp(firebaseConfig);
  if (RECAPTCHA_KEY) {
    try {
      appCheck.initializeAppCheck(app, {
        provider: new appCheck.ReCaptchaV3Provider(RECAPTCHA_KEY),
        isTokenAutoRefreshEnabled: false,
      });
    } catch {
      /* ya inicializado */
    }
  }
  await addDoc(collection(getFirestore(app), "leads"), { ...lead, creado: serverTimestamp() });
}
