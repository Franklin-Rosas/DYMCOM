export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://dymcom-98c14.web.app").replace(/\/$/, "");
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
};
export const RECAPTCHA_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY || "";
export const firebaseReady = Boolean(firebaseConfig.apiKey && firebaseConfig.appId && firebaseConfig.projectId);
export const waLink = (n: string | null) => (n ? `https://wa.me/${n}` : null);
