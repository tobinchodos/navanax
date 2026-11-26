import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
export * from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { firebaseConfig } from "./config.js";
export { QUESTIONS } from "./questions.js";

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

// Points per player: one per correct answer on questions already revealed.
export function scores(QUESTIONS, answers, players, state) {
  const done = state.phase === "final" ? QUESTIONS.length : state.phase === "reveal" ? state.q + 1 : state.q;
  const s = {};
  for (const id in players) s[id] = 0;
  for (let i = 0; i < done; i++) {
    const Q = QUESTIONS[i];
    if (!Q || Q.answer === undefined) continue;
    const a = (answers && answers[i]) || {};
    for (const id in a) if (a[id] === Q.answer && id in s) s[id]++;
  }
  return Object.entries(s)
    .map(([id, pts]) => ({ id, pts, name: players[id]?.name || "Guest" }))
    .sort((x, y) => y.pts - x.pts || x.name.localeCompare(y.name));
}

export const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
export const LETTERS = "ABCDEF";
