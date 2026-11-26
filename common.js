import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
export * from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
// Loaded fresh every time so edits to the password, hint or questions show up immediately.
const bust = "?t=" + Date.now();
const { firebaseConfig } = await import("./config.js" + bust);
const Q = await import("./questions.js" + bust);
export const QUESTIONS = Q.QUESTIONS, HINT = Q.HINT, PASSWORD_SHA256 = Q.PASSWORD_SHA256;

export const configured = !!firebaseConfig;

// Resolves { db, uid } once signed in anonymously.
export function connect() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getDatabase(app);
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (u) => { if (u) resolve({ db, uid: u.uid }); });
    signInAnonymously(auth).catch(reject);
  });
}

// Guesses are compared case-insensitively, ignoring spaces at the ends.
export async function sha256(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text.trim().toLowerCase()));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
