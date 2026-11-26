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

export const hasReveal = (Q) => !!Q && (Q.answer !== undefined || !!Q.reveal || !!Q.accept || !!Q.judged);

// Reads numbers the way people type them: "81", "2,400", "3.5 million", "2.4e18", "5 x 10^12", "20!".
const WORDS = { k: 1e3, thousand: 1e3, m: 1e6, mil: 1e6, million: 1e6, b: 1e9, bn: 1e9, billion: 1e9, t: 1e12, trillion: 1e12, quadrillion: 1e15, quintillion: 1e18, sextillion: 1e21, septillion: 1e24, octillion: 1e27, nonillion: 1e30, decillion: 1e33 };
export function parseNum(input) {
  let s = String(input).toLowerCase().replace(/,/g, "").replace(/\s+/g, " ").trim().replace(/ ?%$/, "");
  const neg = /^[-−–]/.test(s);
  s = s.replace(/^[-−–+] ?/, "");
  const v = parseAbs(s);
  return neg ? -v : v;
}
function parseAbs(s) {
  let m;
  if ((m = s.match(/^(\d+) ?!$/))) { const n = +m[1]; if (n > 170) return Infinity; let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; }
  if ((m = s.match(/^(\d*\.?\d+) ?(?:x|\*|×) ?10 ?\^ ?(-?\d+)$/))) return +m[1] * 10 ** +m[2];
  if ((m = s.match(/^(\d*\.?\d+) ?\^ ?(\d+)$/))) return (+m[1]) ** +m[2];
  if ((m = s.match(/^(\d*\.?\d+(?:e\+?\d+)?) ?([a-z]+)?$/))) {
    if (!m[2]) return +m[1];
    return WORDS[m[2]] ? +m[1] * WORDS[m[2]] : NaN;
  }
  return NaN;
}
const NAMES = [[1e33, "decillion"], [1e30, "nonillion"], [1e27, "octillion"], [1e24, "septillion"], [1e21, "sextillion"], [1e18, "quintillion"], [1e15, "quadrillion"], [1e12, "trillion"], [1e9, "billion"], [1e6, "million"]];
export function fmtNum(v) {
  if (Number.isNaN(v)) return "?";
  if (!isFinite(v)) return "∞";
  if (Math.abs(v) < 1e6) return v.toLocaleString("en-US", { maximumFractionDigits: 2 });
  for (const [n, w] of NAMES) if (Math.abs(v) >= n) return v / n >= 1000 ? v.toExponential(2) : `${+(v / n).toPrecision(3)} ${w}`;
  return v.toExponential(2);
}

// A long table with ten seats down each side.
export function seatsSVG() {
  const seats = [];
  for (let i = 0; i < 10; i++) {
    const x = 60 + i * 52;
    seats.push(`<circle cx="${x}" cy="26" r="15"/><circle cx="${x}" cy="154" r="15"/>`);
  }
  return `<svg class="seats" viewBox="0 0 588 180" role="img" aria-label="A long table with 20 seats, ten on each side">
    <rect x="28" y="54" width="532" height="72" rx="4" fill="none" stroke="currentColor" stroke-width="2"/>
    <g fill="none" stroke="currentColor" stroke-width="2">${seats.join("")}</g></svg>`;
}

// ---------- scoring ----------
export const isScored = (Q) => !!Q && (Q.answer !== undefined || !!Q.accept || !!Q.judged);

// Who got question i right: closest guess(es) for numbers, any accepted word for text.
// Judged questions start with nobody. Host clicks (state.marks["q"+i][uid] = true/false) win.
export function correctSet(Q, i, answers, marks) {
  const out = new Set();
  const a = (answers && answers[i]) || {};
  if (Q.type === "number" && Q.answer !== undefined) {
    const log = Q.scale === "log";
    const tx = (v) => (log ? (v > 0 ? Math.log10(v) : NaN) : v);
    const target = tx(Q.answer);
    const d = Object.entries(a).map(([id, r]) => [id, Math.abs(tx(parseNum(r.text)) - target)]).filter(([, x]) => isFinite(x));
    if (d.length) { const best = Math.min(...d.map(([, x]) => x)); for (const [id, x] of d) if (x - best < 1e-9) out.add(id); }
  } else if (Q.accept) {
    for (const [id, r] of Object.entries(a)) {
      const t = String(r.text).toLowerCase();
      if (Q.accept.some((w) => t.includes(w.toLowerCase()))) out.add(id);
    }
  }
  const m = (marks && marks["q" + i]) || {};
  for (const [id, v] of Object.entries(m)) { if (v === true && a[id]) out.add(id); if (v === false) out.delete(id); }
  return out;
}

// How many questions have been revealed so far (only those count).
export function revealedCount(state, QUESTIONS) {
  if (state.phase === "scores" || state.phase === "end") return QUESTIONS.length;
  if (state.phase === "reveal") return state.q + 1;
  if (state.phase === "question") return state.q;
  return 0;
}

// [{ id, name, pts, marks: [true|false|null per question] }], best first.
export function scoreboard(QUESTIONS, state, players, answers) {
  const upto = revealedCount(state, QUESTIONS);
  const sets = QUESTIONS.map((Q, i) => (i < upto && isScored(Q) ? correctSet(Q, i, answers, state.marks) : null));
  return Object.entries(players).map(([id, p]) => {
    const marks = QUESTIONS.map((Q, i) => (sets[i] ? sets[i].has(id) : null));
    return { id, name: p.name, t: p.t || 0, marks, pts: marks.filter((x) => x === true).length };
  }).sort((x, y) => y.pts - x.pts || x.t - y.t);
}
