// create_exam.js

// Handle link generation
function generateLink() {
  const randomId = Math.random().toString(36).substr(2, 9);
  document.getElementById(
    "unique-link"
  ).value = `https://exam-platform.com/exam/${randomId}`;
  alert("Lien généré avec succès !");
}

// Handle showing the correct form
document.getElementById("direct-question-btn").addEventListener("click", () => {
  document.getElementById("direct-question-form").classList.remove("hidden");
  document.getElementById("qcm-question-form").classList.add("hidden");
});

document.getElementById("qcm-question-btn").addEventListener("click", () => {
  document.getElementById("qcm-question-form").classList.remove("hidden");
  document.getElementById("direct-question-form").classList.add("hidden");
});

// Helper to create an input field
function createInput(name, placeholder) {
  const input = document.createElement("input");
  input.type = "text";
  input.name = name;
  input.placeholder = placeholder;
  input.required = true;
  input.className = "option-input";
  return input;
}

// Handle uploaded media (returns media URL or file name)
function handleUploadedMedia(inputElement) {
  const file = inputElement.files[0];
  if (file) {
    return URL.createObjectURL(file); // For preview if needed
  }
  return "";
}

// QCM Option Addition
// Function to add a new option
function addQCMOption() {
  const optionsContainer = document.getElementById("qcm-options");

  const optionDiv = document.createElement("div");
  optionDiv.className = "option-item";

  // Input field
  const optionInput = createInput("qcm-option", "Entrez une option");

  // Actions (checkbox + delete)
  const actionsDiv = document.createElement("div");
  actionsDiv.className = "option-actions";

  // Correct answer checkbox
  const correctCheckbox = document.createElement("input");
  correctCheckbox.type = "checkbox";
  correctCheckbox.title = "Cochez si c'est la bonne réponse";
  correctCheckbox.className = "correct-checkbox";

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "delete-btn";
  deleteBtn.title = "Supprimer cette option";

  const deleteIcon = document.createElement("i");
  deleteIcon.className = "fa-solid fa-trash";

  deleteBtn.appendChild(deleteIcon);

  deleteBtn.onclick = function () {
    optionsContainer.removeChild(optionDiv);
  };

  // Assemble
  actionsDiv.appendChild(correctCheckbox);
  actionsDiv.appendChild(deleteBtn);

  optionDiv.appendChild(optionInput);
  optionDiv.appendChild(actionsDiv);

  optionsContainer.appendChild(optionDiv);
}

// Clear Direct Question Fields
function clearDirectFields() {
  document.getElementById("direct-question-text").value = "";
  document.getElementById("direct-error-tolerance").value = "";
  document.getElementById("direct-correct-answer").value = "";
  document.getElementById("direct-marks").value = "";
  document.getElementById("direct-media-upload").value = "";
  document.getElementById("direct-question-duration").value = "";
}

// Clear QCM Question Fields
function clearQCMFields() {
  document.getElementById("qcm-question-text").value = "";
  document.getElementById("qcm-marks").value = "";
  document.getElementById("qcm-media-upload").value = "";
  document.getElementById("qcm-question-duration").value = "";
  document.getElementById("qcm-options").innerHTML = "";
}

// Add Direct Question
function addDirectQuestion() {
  const questionText = document.getElementById("direct-question-text").value;
  const errorTolerance = document.getElementById(
    "direct-error-tolerance"
  ).value;
  const correctAnswer = document.getElementById("direct-correct-answer").value;
  const marks = document.getElementById("direct-marks").value;
  const media = handleUploadedMedia(
    document.getElementById("direct-media-upload")
  );
  const duration = document.getElementById("direct-question-duration").value;

  const questionList = document.getElementById("qcm-questions-list");
  const questionDiv = document.createElement("div");
  questionDiv.className = "question-item";

  questionDiv.innerHTML = `
    <h4>Question Directe:</h4>
    <p><strong>Texte:</strong> <span class="direct-question-text">${questionText}</span></p>
    <p><strong>Tolérance d'erreur:</strong> <span class="direct-error-tolerance">${errorTolerance}</span>%</p>
    <p><strong>Bonne Réponse:</strong> <span class="direct-correct-answer">${correctAnswer}</span></p>
    <p><strong>Points:</strong> <span class="direct-marks">${marks}</span></p>
    <p><strong>Durée:</strong> <span class="direct-duration">${duration}</span> secondes</p>
    ${
      media
        ? `<p><strong>Média:</strong> <a class="direct-media" href="${media}" target="_blank">Voir le média</a></p>`
        : ""
    }
    <div class="question-actions">
      <button type="button" class="btn-action" onclick="editDirectQuestion(this)">Modifier</button>
      <button type="button" class="btn-action btn-delete" onclick="deleteDirectQuestion(this)">Supprimer</button>
    </div>
  `;

  questionList.appendChild(questionDiv);

  alert("Question directe ajoutée avec succès!");
  clearDirectFields();
}

// Allow Editing Direct Question
function editDirectQuestion(button) {
  const questionDiv = button.closest(".question-item");

  const textSpan = questionDiv.querySelector(".direct-question-text");
  const errorToleranceSpan = questionDiv.querySelector(
    ".direct-error-tolerance"
  );
  const correctAnswerSpan = questionDiv.querySelector(".direct-correct-answer");
  const marksSpan = questionDiv.querySelector(".direct-marks");
  const durationSpan = questionDiv.querySelector(".direct-duration");
  const mediaLink = questionDiv.querySelector(".direct-media");

  const newText = prompt(
    "Modifier le texte de la question:",
    textSpan.textContent
  );
  if (newText !== null) textSpan.textContent = newText;

  const newErrorTolerance = prompt(
    "Modifier la tolérance d'erreur (%):",
    errorToleranceSpan.textContent
  );
  if (newErrorTolerance !== null)
    errorToleranceSpan.textContent = newErrorTolerance;

  const newCorrectAnswer = prompt(
    "Modifier la bonne réponse:",
    correctAnswerSpan.textContent
  );
  if (newCorrectAnswer !== null)
    correctAnswerSpan.textContent = newCorrectAnswer;

  const newMarks = prompt("Modifier les points:", marksSpan.textContent);
  if (newMarks !== null) marksSpan.textContent = newMarks;

  const newDuration = prompt(
    "Modifier la durée (en secondes):",
    durationSpan.textContent
  );
  if (newDuration !== null) durationSpan.textContent = newDuration;

  if (mediaLink) {
    const newMediaUrl = prompt(
      "Modifier l'URL du média (laisser vide pour ne rien changer):",
      mediaLink.href
    );
    if (newMediaUrl !== null && newMediaUrl.trim() !== "") {
      mediaLink.href = newMediaUrl;
    }
  }

  alert("Question directe modifiée avec succès!");
}

//Delete Direct questions
function deleteDirectQuestion(button) {
  if (confirm("Êtes-vous sûr de vouloir supprimer cette question ?")) {
    const questionDiv = button.closest(".question-item");
    questionDiv.remove();
    alert("Question supprimée !");
  }
}

// Add QCM Question
function addQCMQuestion() {
  const questionText = document.getElementById("qcm-question-text").value;
  const marks = document.getElementById("qcm-marks").value;
  const media = handleUploadedMedia(
    document.getElementById("qcm-media-upload")
  );
  const duration = document.getElementById("qcm-question-duration").value;

  const optionsContainer = document.getElementById("qcm-options");
  const options = Array.from(
    optionsContainer.querySelectorAll(".option-item")
  ).map((optionDiv) => {
    const text = optionDiv.querySelector('input[type="text"]').value;
    const isCorrect = optionDiv.querySelector('input[type="checkbox"]').checked;
    return { text, isCorrect };
  });

  const questionList = document.getElementById("qcm-questions-list");
  const questionDiv = document.createElement("div");
  questionDiv.className = "question-item";

  let optionsHTML = `
    <div class="options-list">
      ${options
        .map(
          (opt) => `
          <div class="option-item-display">
            <span class="option-text">- ${opt.text}</span>
            ${
              opt.isCorrect
                ? '<span class="option-correct"> => (La bonne réponse)</span>'
                : ""
            }
          </div>
        `
        )
        .join("")}
    </div>
  `;

  questionDiv.innerHTML = `
    <div class="question-content">
      <h4>Question QCM</h4>
      <p><strong>Texte:</strong> <span class="question-text">${questionText}</span></p>
      <p><strong>Points:</strong> <span class="question-points">${marks}</span></p>
      <p><strong>Durée:</strong> <span class="question-duration">${duration}</span> secondes</p>
      ${
        media
          ? `<p><strong>Média:</strong> <a href="${media}" target="_blank">Voir le média</a></p>`
          : ""
      }
      <div><strong>Options:</strong>${optionsHTML}</div>
      
      <div class="question-actions">
        <button type="button" class="btn-action" onclick="editQCMQuestion(this)">Modifier</button>
        <button type="button" class="btn-action btn-delete" onclick="deleteQCMQuestion(this)">Supprimer</button>
      </div>
    </div>
  `;

  questionList.appendChild(questionDiv);

  alert("Question QCM ajoutée avec succès!");
  clearQCMFields();
}

// Allow Editing QCM Question
function editQCMQuestion(button) {
  const questionDiv = button.closest(".question-item");

  const textSpan = questionDiv.querySelector(".question-text");
  const pointsSpan = questionDiv.querySelector(".question-points");
  const durationSpan = questionDiv.querySelector(".question-duration");

  const newText = prompt(
    "Modifier le texte de la question:",
    textSpan.textContent
  );
  if (newText !== null) {
    textSpan.textContent = newText;
  }

  const newPoints = prompt("Modifier les points:", pointsSpan.textContent);
  if (newPoints !== null) {
    pointsSpan.textContent = newPoints;
  }

  const newDuration = prompt(
    "Modifier la durée (en secondes):",
    durationSpan.textContent
  );
  if (newDuration !== null) {
    durationSpan.textContent = newDuration;
  }

  alert("Question QCM modifiée avec succès!");
}

//Delete QCM questions
function deleteQCMQuestion(button) {
  const confirmDelete = confirm(
    "Êtes-vous sûr de vouloir supprimer cette question ?"
  );
  if (confirmDelete) {
    const questionDiv = button.closest(".question-item");
    questionDiv.remove();
    alert("Question QCM supprimée avec succès !");
  }
}

// Save Exam (simple alert for now)
function saveExam() {
  alert("Examen enregistré avec succès!");
}

// Preview Exam (basic for now)
function previewExam() {
  alert("Aperçu de l'examen en cours...");
}
