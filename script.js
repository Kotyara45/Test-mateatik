let timer;
let timeLeft = 60;
let correct = 0;
let wrong = 0;

function startGame() {
  document.getElementById("startScreen").classList.add("hidden");
  document.getElementById("statsScreen").classList.add("hidden");
  document.getElementById("gameScreen").classList.remove("hidden");

  correct = 0;
  wrong = 0;
  timeLeft = 60;
  document.getElementById("timer").textContent = timeLeft;
  nextQuestion();

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;
    if (timeLeft <= 0) endGame();
  }, 1000);
}

function nextQuestion() {
  const a = Math.floor(Math.random() * 20) + 1;
  const b = Math.floor(Math.random() * 20) + 1;
  const operators = ["+", "-", "×"];
  const op = operators[Math.floor(Math.random() * operators.length)];
  let correctAnswer;

  if (op === "+") correctAnswer = a + b;
  if (op === "-") correctAnswer = a - b;
  if (op === "×") correctAnswer = a * b;

  document.getElementById("question").textContent = `${a} ${op} ${b}`;

  let answers = new Set();
  answers.add(correctAnswer);
  while (answers.size < 5) {
    answers.add(Math.floor(Math.random() * 40) + 1);
  }

  const answersArray = Array.from(answers).sort(() => Math.random() - 0.5);
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  answersArray.forEach(ans => {
    const btn = document.createElement("div");
    btn.className = "answer";
    btn.textContent = ans;
    btn.onclick = () => checkAnswer(btn, ans, correctAnswer);
    answersDiv.appendChild(btn);
  });
}

function checkAnswer(btn, selected, correctAnswer) {
  if (selected === correctAnswer) {
    btn.classList.add("correct");
    correct++;
  } else {
    btn.classList.add("wrong");
    wrong++;
  }
  setTimeout(nextQuestion, 500);
}

function endGame() {
  clearInterval(timer);
  document.getElementById("gameScreen").classList.add("hidden");
  document.getElementById("statsScreen").classList.remove("hidden");

  document.getElementById("correctCount").textContent = correct;
  document.getElementById("wrongCount").textContent = wrong;
  document.getElementById("accuracy").textContent = ((correct / (correct + wrong)) * 100).toFixed(1);
}
