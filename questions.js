// Everything you'll want to edit lives here.

// Login screen. Only the password's SHA-256 hash is stored, so it can't be read from the page source.
export const HINT = "The next president of the United States";
export const PASSWORD_NOTE = "The password is all lowercase.";
export const PASSWORD_SHA256 = "62f100bfa4c2aa8f07427e448b8660e0930da1146266c8bb32b5292e2cd0fb40";

// Shown after the login screen, before question 1.
export const RULES = [
  "We can stop at any time.",
  "Points awarded at the discretion of the Lord of the Navanax.",
  "Noteworthy responses may be called on for additional explanation at any time.",
];

// Questions, in order.
//   type:    "text" (free answer), "number" (live histogram) or "choice" (buttons; set options, and correct for the right one;
//            comment: true adds an optional comment box)
//   answer:  for number questions, the correct value, marked on the histogram at reveal
//   scale:   "log" for number questions whose guesses span many orders of magnitude
//   reveal:  what the screen shows after you press Next: { image, text, caption } or { chart: "file.json", text, caption }
//   figure:  a drawing shown with the question ("seats")
//   quote:   a quotation shown with the question
//   accept:  for text questions, words that count as correct (case-insensitive). Number questions: closest guess wins.
//   image:   a picture shown with the question (black and white unless color: true)
//   note:    a smaller line under the question
//   range:   [min, max] for number questions on a fixed scale (e.g. 0–10)
//   whole:   number questions that only take whole numbers, 0 or more
//   unit:    shown after numbers, e.g. "%"
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
    type: "text",
    q: "What was the best food on the table today?",
    judged: true,
  },
  {
    type: "text",
    q: "Whose hand is this?",
    image: "hand.jpg",
    accept: ["bush"],
    reveal: { image: "bush.jpg", text: "George H. W. Bush", caption: "Hand: Bush gives troops a thumbs-up, Dec 31, 1992 (U.S. National Archives). Portrait: official, 1989. Both public domain." },
  },
  {
    type: "text",
    q: "What wars happened on George H. W. Bush’s watch?",
    accept: ["gulf", "desert storm", "desert shield", "iraq", "kuwait", "panama", "just cause", "noriega"],
    reveal: {
      text: "Panama (1989) and the Gulf War (1990–91)",
      caption: "Operation Just Cause in Panama, and Operations Desert Shield and Desert Storm in Iraq and Kuwait. He also sent troops to Somalia in Dec 1992 (Operation Restore Hope).",
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
    type: "text",
    q: "Whose hand is this?",
    image: "jordan-hand.jpg",
    accept: ["jordan"],
    reveal: {
      image: "jordan.jpg",
      text: "Michael Jordan",
      caption: "Photo: Steve Lipofsky, Basketballphoto.com, CC BY-SA 3.0 (cropped for the question).",
    },
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
    type: "number",
    q: "How much has the S&P 500 gained or lost so far in 2026?",
    note: "In percent. Use a minus sign for a loss.",
    unit: "%",
    answer: 4.93,
    answerLabel: "+4.9%",
    reveal: {
      chart: "spx2026.json",
      text: "+4.9%",
      caption: "S&P 500 close: 6,845.50 on Dec 31, 2025 to 7,182.78 on Nov 25, 2026. Sources: FRED, Yahoo Finance.",
    },
  },
  {
    type: "text",
    q: "Whose hand is this?",
    image: "holmes-hand.jpg",
    accept: ["holmes"],
    reveal: {
      image: "holmes.jpg",
      text: "Elizabeth Holmes",
      caption: "TechCrunch Disrupt, Sept 8, 2014. Photo: TechCrunch, CC BY 2.0 (cropped for the question).",
    },
  },
  {
    type: "text",
    q: "What is one thing the other side of the political spectrum got right recently?",
    note: "The right if you lean left, the left if you lean right.",
    judged: true,
  },
  {
    type: "text",
    q: "What is one thing your own side of the political spectrum got wrong recently?",
    judged: true,
  },
  {
    type: "number",
    q: "How old is Tobin?",
    whole: true,
    answer: 40,
  },
  {
    type: "text",
    q: "Whose hand is this?",
    image: "bigbird-hand.jpg",
    accept: ["big bird", "bigbird"],
    reveal: {
      image: "bigbird.jpg",
      text: "Big Bird",
      caption: "Photo: Tony Alter, CC BY 2.0 (cropped for the question).",
    },
  },
  {
    type: "number",
    q: "How much has artificial intelligence impacted your life?",
    judged: true,
    note: "0 = not at all, 10 = completely.",
    range: [0, 10],
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
  {
    type: "text",
    q: "What is the Turing Test, and why do we care?",
    judged: true,
  },
  {
    type: "text",
    q: "Whose hand is this?",
    image: "picard-hand.jpg",
    accept: ["picard", "patrick stewart", "stewart"],
    reveal: {
      image: "picard.jpg",
      text: "Jean-Luc Picard",
      caption: "Patrick Stewart at San Diego Comic-Con, 2019. Photo: Gage Skidmore, CC BY-SA 2.0 (cropped for the question).",
    },
  },
  {
    type: "text",
    q: "What does the acronym AGI stand for?",
    accept: ["general intelligence"],
    reveal: { text: "Artificial General Intelligence" },
  },
  {
    type: "text",
    q: "What does the acronym RSI stand for?",
    accept: ["recursive", "self-improvement", "self improvement"],
    reveal: { text: "Recursive Self-Improvement" },
  },
  {
    type: "choice",
    q: "In AI-speak, what is a “token”?",
    options: [
      "A chunk of text, often part of a word, that the model reads and writes",
      "A cryptocurrency used to pay for AI",
      "A password that unlocks an AI model",
      "One full sentence of the AI’s answer",
    ],
    correct: "A chunk of text, often part of a word, that the model reads and writes",
    reveal: {
      text: "“unbelievable” → un · believ · able",
      caption: "Models see text as tokens, roughly ¾ of an English word each, so a long word can be several tokens and a short one is often one. Exact splits vary by model. AI usage is priced and limited by tokens.",
    },
  },
  {
    type: "text",
    q: "Give your best example of internet slang.",
    note: "Include a definition.",
    judged: true,
  },
  {
    type: "text",
    q: "Whose hand is this?",
    image: "trump-hand.jpg",
    color: true,
    accept: ["trump"],
    reveal: {
      image: "trump.jpg",
      text: "Donald Trump",
      caption: "Hand: Sparrows Point, Maryland, Oct 6, 2026. Portrait: official, 2025. Both official White House photos, public domain.",
    },
  },
  {
    type: "text",
    q: "What wars have happened on Donald Trump’s watch?",
    judged: true,
  },
  {
    type: "text",
    q: "What’s something boomers say?",
    judged: true,
  },
  {
    type: "choice",
    q: "Without checking, can you remember what underwear you’re wearing?",
    judged: true,
    options: ["Yes", "No"],
  },
  {
    type: "number",
    q: "How many credit cards are in your name?",
    judged: true,
    whole: true,
  },
  {
    type: "choice",
    q: "Do you owe the government money, does the government owe you money, or are you even-steven?",
    options: ["I owe the government", "The government owes me", "Even-steven"],
    judged: true,
  },
  {
    type: "text",
    q: "Two years ago, instead of saying what we were grateful for, we all shared the worst pain we’d ever felt. Can you remember a single thing anyone said that day?",
    judged: true,
  },
  {
    type: "choice",
    q: "Have you ever had your heart broken?",
    options: ["Yes", "No"],
    comment: true,
    judged: true,
  },
];
