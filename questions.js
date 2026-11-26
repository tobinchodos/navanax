// Everything you'll want to edit lives here.

// Login screen. Only the password's SHA-256 hash is stored, so it can't be read from the page source.
export const HINT = "The next president of the United States";
export const PASSWORD_SHA256 = "62f100bfa4c2aa8f07427e448b8660e0930da1146266c8bb32b5292e2cd0fb40";

// Questions, in order.
//   type:    "text" (free answer) or "number" (live histogram)
//   answer:  for number questions, the correct value, marked on the histogram at reveal
//   scale:   "log" for number questions whose guesses span many orders of magnitude
//   reveal:  what the screen shows after you press Next: { image, caption } or { text }
//   figure:  a drawing shown with the question ("seats")
//   quote:   a quotation shown with the question
//   accept:  for text questions, words that count as correct (case-insensitive). Number questions: closest guess wins.
//   judged:  true for subjective questions: at reveal the host clicks the winning answer(s).
//   On any reveal screen the host can click an answer to flip it between right and wrong.
//   Questions with none of answer, accept or judged aren't scored.
export const QUESTIONS = [
  {
    type: "text",
    q: "What is a Navanax?",
    accept: ["slug", "nudibranch", "mollusc", "mollusk", "gastropod"],
    reveal: {
      image: "navanax.jpg",
      text: "A sea slug.",
      caption: "Navanax inermis, Monterey Bay. Photo: Chad King / NOAA MBNMS, public domain.",
    },
  },
  {
    type: "number",
    q: "How old is Danny Chodos?",
    answer: 81,
  },
  {
    type: "text",
    q: "What is Breghan’s boyfriend’s name?",
    accept: ["devin"],
    reveal: { text: "Devin #2" },
  },
  {
    type: "number",
    scale: "log",
    figure: "seats",
    q: "There are 20 guests and 20 seats. How many different ways can everyone be seated?",
    answer: 2432902008176640000,
    answerLabel: "20! = 2,432,902,008,176,640,000",
  },
  {
    type: "text",
    q: "What do you think of this?",
    judged: true,
    quote: {
      text: "The holidays are part and parcel of the gross fraud, wrong, and inhumanity of slavery. … Their object seems to be, to disgust their slaves with freedom, by plunging them into the lowest depths of dissipation. … So, when the holidays ended, we staggered up from the filth of our wallowing, took a long breath, and marched to the field,—feeling, upon the whole, rather glad to go, from what our master had deceived us into a belief was freedom, back to the arms of slavery.",
      cite: "Frederick Douglass, Narrative of the Life of Frederick Douglass, an American Slave (1845)",
    },
  },
];
