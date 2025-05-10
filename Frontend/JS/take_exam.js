// ===== Données simulées =====
const questions = [
  {
    type: "qcm",
    question: "Quels sont des langages de programmation ?",
    options: ["HTML", "Python", "CSS", "JavaScript"],
    correctAnswers: ["Python", "JavaScript"],
  },
  {
    type: "direct",
    question: "Quelle est la capitale de la France ?",
    correctAnswer: "Paris",
  },
  {
    type: "qcm",
    question: "Sélectionnez les nombres premiers.",
    options: ["2", "4", "5", "8"],
    correctAnswers: ["2", "5"],
  },
];

// ===== Variables globales =====
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;
let studentLocation = null;

// ===== Sélection des éléments DOM =====
const geoScreen = document.getElementById("geolocation-screen");
const examScreen = document.getElementById("exam-screen");
const resultScreen = document.getElementById("result-screen");
const allowLocationBtn = document.getElementById("allow-location-btn");
const geoError = document.getElementById("geo-error");
const timerElement = document.getElementById("time-left");
const timerBar = document.getElementById("timer-bar");
const questionContainer = document.getElementById("question-container");
const nextBtn = document.getElementById("next-btn");
const finalScore = document.getElementById("final-score");
const motivationMessage = document.getElementById("motivation-message");

// ===== Gestion de la Géolocalisation =====
allowLocationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        studentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        startExam();
      },
      () => {
        geoError.innerText =
          "La permission de localisation est requise pour commencer.";
      }
    );
  } else {
    geoError.innerText =
      "La géolocalisation n'est pas supportée par votre navigateur.";
  }
});

// ===== Démarrer l'Examen =====
function startExam() {
  geoScreen.classList.add("hidden");
  examScreen.classList.remove("hidden");
  loadQuestion();
}

// ===== Charger une Question =====
function loadQuestion() {
  clearInterval(timer);
  timeLeft = 30;
  timerElement.innerText = timeLeft;
  timerBar.style.width = "100%";
  timer = setInterval(updateTimer, 1000);

  const currentQuestion = questions[currentQuestionIndex];
  questionContainer.innerHTML = "";

  const questionTitle = document.createElement("h3");
  questionTitle.innerText = currentQuestion.question;
  questionContainer.appendChild(questionTitle);

  if (currentQuestion.type === "qcm") {
    currentQuestion.options.forEach((option) => {
      const label = document.createElement("label");
      label.classList.add("answer-option");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = option;

      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(" " + option));
      questionContainer.appendChild(label);
    });
  } else if (currentQuestion.type === "direct") {
    const input = document.createElement("input");
    input.type = "text";
    input.id = "direct-answer";
    input.placeholder = "Écrivez votre réponse...";
    input.style.width = "100%";
    input.style.padding = "10px";
    input.style.marginTop = "15px";
    questionContainer.appendChild(input);
  }
}

// ===== Mettre à jour le Timer =====
function updateTimer() {
  timeLeft--;
  timerElement.innerText = timeLeft;
  timerBar.style.width = `${(timeLeft / 30) * 100}%`;

  if (timeLeft <= 0) {
    clearInterval(timer);
    submitAnswer();
  }
}

// ===== Bouton Suivant =====
nextBtn.addEventListener("click", () => {
  clearInterval(timer);
  submitAnswer();
});

// ===== Soumettre la réponse =====
function submitAnswer() {
  const currentQuestion = questions[currentQuestionIndex];

  if (currentQuestion.type === "qcm") {
    const selected = Array.from(
      document.querySelectorAll('input[type="checkbox"]:checked')
    ).map((cb) => cb.value);
    const correct = currentQuestion.correctAnswers;

    const isCorrect =
      JSON.stringify(selected.sort()) === JSON.stringify(correct.sort());
    if (isCorrect) score += 100 / questions.length;
  } else if (currentQuestion.type === "direct") {
    const answer = document
      .getElementById("direct-answer")
      .value.trim()
      .toLowerCase();
    const correct = currentQuestion.correctAnswer.toLowerCase();

    if (answer === correct) {
      score += 100 / questions.length;
    }
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    endExam();
  }
}

// ===== Finir l'Examen =====
function endExam() {
  examScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  finalScore.innerText = `Votre score : ${Math.round(score)}/100`;

  if (score >= 70) {
    motivationMessage.innerText = "🎉 Bravo !";
  } else {
    motivationMessage.innerText = "💪 Continuez vos efforts !";
  }
}
