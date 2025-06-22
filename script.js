const quotes = [
  "the little progress you have made today still matters.",
  "don't feel guilty for doing what's best for you.",
  "doing it scared is just as brave.",
  "failure is not the opposite of success, it's part of success.",
  "change is scary but so is staying the same.",
  "your direction is more important than your speed.",
  "do it for the person you hope to become.",
  "don't stress over things you can't control.",
  "give yourself credit for how far you've come.",
  "a little progress each day adds up to big results.",
  "your best is enough.",
  "you are going to be okay, even if you have to start over."
];

const quoteDisplay = document.getElementById("quoteDisplay");
const quoteInput = document.getElementById("quoteInput");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("startBtn");

let startTime, timerInterval, currentQuote = "";

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function startTest() {
  currentQuote = getRandomQuote();
  quoteDisplay.textContent = currentQuote;
  quoteInput.value = "";
  quoteInput.disabled = false;
  quoteInput.focus();

  startTime = new Date();
  timeDisplay.textContent = "0s";

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    const elapsed = Math.floor((new Date() - startTime) / 1000);
    timeDisplay.textContent = `${elapsed}s`;
  }, 1000);
}

function endTest() {
  clearInterval(timerInterval);

  const timeTaken = (new Date() - startTime) / 1000 / 60; // in minutes
  const inputText = quoteInput.value.trim();
  const wordsTyped = inputText.split(" ").length;
  const wpm = Math.round(wordsTyped / timeTaken);

  const quoteChars = currentQuote.split("");
  const inputChars = inputText.split("");
  let correct = 0;
  for (let i = 0; i < inputChars.length; i++) {
    if (inputChars[i] === quoteChars[i]) correct++;
  }
  const accuracy = ((correct / quoteChars.length) * 100).toFixed(1);

  wpmDisplay.textContent = wpm;
  accuracyDisplay.textContent = `${accuracy}%`;
}

quoteInput.addEventListener("input", () => {
  if (quoteInput.value.trim() === currentQuote) {
    endTest();
    quoteInput.disabled = true;
  }
});

startBtn.addEventListener("click", startTest);

