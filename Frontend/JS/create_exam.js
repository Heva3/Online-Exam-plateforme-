// Handle link generation
function generateLink() {
  const randomId = Math.random().toString(36).substr(2, 9);
  document.getElementById(
    "unique-link"
  ).value = `https://exam-platform.com/exam/${randomId}`;
}

// Use addEventListener for better handling of events
document.getElementById("direct-question-btn").addEventListener("click", () => {
  document.getElementById("direct-question-form").classList.remove("hidden");
  document.getElementById("qcm-question-form").classList.add("hidden");
});

document.getElementById("qcm-question-btn").addEventListener("click", () => {
  document.getElementById("qcm-question-form").classList.remove("hidden");
  document.getElementById("direct-question-form").classList.add("hidden");
});

// Helper function to create input fields
function createInputField(id, placeholder, type = "text") {
  const input = document.createElement("input");
  input.type = type;
  input.placeholder = placeholder;
  input.id = id;
  return input;
}

// Handle uploaded media
function getUploadedMediaInfo() {
  const mediaInput = document.getElementById("media-upload");
  if (mediaInput.files.length > 0) {
    const file = mediaInput.files[0];
    const fileType = file.type.split("/")[0]; // image, audio, video
    return { name: file.name, type: fileType };
  }
  return null;
}

// QCM option addition with checkboxes for correct answers
let optionCount = 1;
function addQCMOption() {
  const container = document.getElementById("qcm-options");

  const optionId = `option-${optionCount}`;
  const wrapper = document.createElement("div");
  wrapper.className = "option-wrapper";
  wrapper.id = `wrapper-${optionId}`;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "correct-checkbox";
  checkbox.value = optionId;
  checkbox.title = "Cochez si c'est une bonne réponse";

  const input = createInputField(optionId, `Option ${optionCount}`);
  input.className = "qcm-option";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.className = "delete-option-btn";
  deleteBtn.addEventListener("click", () => {
    container.removeChild(wrapper);
    optionCount = container.querySelectorAll(".option-wrapper").length + 1;
  });

  wrapper.appendChild(checkbox);
  wrapper.appendChild(input);
  wrapper.appendChild(deleteBtn);
  container.appendChild(wrapper);

  optionCount++;
}

// Add direct question
function addDirectQuestion() {
  const question = document.getElementById("direct-question-text").value;
  const tolerance = document.getElementById("direct-error-tolerance").value;
  const answer = document.getElementById("direct-correct-answer").value;
  const marks = document.getElementById("qcm-marks").value;
  const duration = document.getElementById("question-duration").value;
  const media = getUploadedMediaInfo();

  if (!question || !tolerance || !answer || !marks || !duration) {
    return alert("Veuillez remplir tous les champs.");
  }

  let mediaHTML = "";
  if (media) {
    if (media.type === "image") {
      mediaHTML = `<p class="media"><strong>Image:</strong> ${media.name}</p>`;
    } else if (media.type === "audio") {
      mediaHTML = `<p class="media"><strong>Audio:</strong> ${media.name}</p>`;
    } else if (media.type === "video") {
      mediaHTML = `<p class="media"><strong>Vidéo:</strong> ${media.name}</p>`;
    }
  }

  const questionCard = document.createElement("div");
  questionCard.className = "question-card";
  questionCard.innerHTML = `
        <h4>Question Directe :</h4>
        <p class="question"><strong>Question:</strong> ${question}</p>
        ${mediaHTML}
        <p class="answer"><strong>Bonne Réponse:</strong> ${answer}</p>
        <p class="tolerance"><strong>Tolérance d'Erreur:</strong> ±${tolerance}%</p>
        <p class="duration"><strong>Durée:</strong> ${duration} secondes</p>
        <p class="marks"><strong>Score:</strong> ${marks}</p>
        <button class="modify-question-btn">Modifier</button>
    `;

  // Append to the list
  document.getElementById("qcm-questions-list").appendChild(questionCard);

  // Modify logic
  const modifyBtn = questionCard.querySelector(".modify-question-btn");
  modifyBtn.addEventListener("click", () => {
    // Get elements to update later
    const questionEl = questionCard.querySelector(".question");
    const answerEl = questionCard.querySelector(".answer");
    const toleranceEl = questionCard.querySelector(".tolerance");
    const durationEl = questionCard.querySelector(".duration");
    const marksEl = questionCard.querySelector(".marks");

    // Fill form fields
    document.getElementById("direct-question-text").value =
      questionEl.textContent.replace("Question:", "").trim();
    document.getElementById("direct-correct-answer").value =
      answerEl.textContent.replace("Bonne Réponse:", "").trim();
    document.getElementById("direct-error-tolerance").value =
      toleranceEl.textContent
        .replace("Tolérance d'Erreur: ±", "")
        .replace("%", "")
        .trim();
    document.getElementById("question-duration").value = durationEl.textContent
      .replace("Durée:", "")
      .replace("secondes", "")
      .trim();
    document.getElementById("qcm-marks").value = marksEl.textContent
      .replace("Score:", "")
      .trim();

    // Change button to update
    modifyBtn.textContent = "Mettre à jour";

    // Replace click behavior
    modifyBtn.onclick = () => {
      const newQ = document.getElementById("direct-question-text").value;
      const newA = document.getElementById("direct-correct-answer").value;
      const newT = document.getElementById("direct-error-tolerance").value;
      const newD = document.getElementById("question-duration").value;
      const newM = document.getElementById("qcm-marks").value;

      // Update UI
      questionEl.innerHTML = `<strong>Question:</strong> ${newQ}`;
      answerEl.innerHTML = `<strong>Bonne Réponse:</strong> ${newA}`;
      toleranceEl.innerHTML = `<strong>Tolérance d'Erreur:</strong> ±${newT}%`;
      durationEl.innerHTML = `<strong>Durée:</strong> ${newD} secondes`;
      marksEl.innerHTML = `<strong>Score:</strong> ${newM}`;

      clearDirectFields();
      modifyBtn.textContent = "Modifier";
      modifyBtn.onclick = null;
      modifyBtn.addEventListener("click", arguments.callee); // Restore edit mode
    };
  });

  clearDirectFields();
}

function clearDirectFields() {
  document.getElementById("direct-question-text").value = "";
  document.getElementById("direct-correct-answer").value = "";
  document.getElementById("direct-error-tolerance").value = "";
  document.getElementById("question-duration").value = "";
  document.getElementById("qcm-marks").value = "";
}

// Function to add QCM question
function addQCMQuestion() {
  const question = document.getElementById("qcm-question-text").value;
  const marks = document.getElementById("qcm-marks").value;
  const duration = document.getElementById("question-duration").value;

  // Check if all required fields are filled
  if (!question.trim() || !marks.trim() || !duration.trim()) {
    return alert("Veuillez remplir tous les champs.");
  }

  // Check if there are any options added
  const options = Array.from(document.querySelectorAll(".qcm-option")).map(
    (opt) => opt.value
  );

  if (options.length === 0 || options.some((opt) => !opt.trim())) {
    return alert("Veuillez ajouter au moins une option.");
  }

  // Create the question card
  const questionCard = document.createElement("div");
  questionCard.className = "question-card";

  // Create the inner HTML of the question card
  questionCard.innerHTML = `
      <h4>Question à Choix Multiples :</h4>
      <p><strong>Question:</strong> ${question}</p>
      <ul>${options.map((opt, i) => `<li>${i + 1}. ${opt}</li>`).join("")}</ul>
      <p><strong>Durée:</strong> ${duration} secondes</p>
      <p><strong>Score:</strong> ${marks}</p>
      <button class="modify-question-btn">Modifier</button>
    `;

  // Append the question card to the list
  document.getElementById("qcm-questions-list").appendChild(questionCard);

  // Clear the form fields after adding the question
  clearQCMFields();
}

function clearQCMFields() {
  document.getElementById("qcm-question-text").value = "";
  document.getElementById("qcm-marks").value = "";
  document.getElementById("question-duration").value = "";
  document.getElementById("qcm-options").innerHTML = ""; // Clear options list
}

function clearQCMFields() {
  document.getElementById("qcm-question-text").value = "";
  document.getElementById("qcm-marks").value = "";
  document.getElementById("question-duration").value = "";
  // Optionally clear the options list
  document.getElementById("qcm-options").innerHTML = "";
}

function clearQCMFields() {
  document.getElementById("qcm-question-text").value = "";
  document.getElementById("qcm-marks").value = "";
  document.getElementById("question-duration").value = "";
  // Optionally clear the options list
  document.getElementById("qcm-options").innerHTML = "";
}

function clearQCMFields() {
  document.getElementById("qcm-question-text").value = "";
  document.getElementById("qcm-marks").value = "";
  document.getElementById("question-duration").value = "";
  document.getElementById("media-upload").value = "";
  // Optionally clear the options list
  document.getElementById("qcm-options").innerHTML = "";
}

// Helper function to show error message
function showError(message) {
  const errorMessage = document.createElement("div");
  errorMessage.className = "error-message";
  errorMessage.textContent = message;
  document.getElementById("form-error-container").appendChild(errorMessage);
  setTimeout(() => errorMessage.remove(), 3000); // Remove error message after 3 seconds
}

// Helper function to clear the QCM fields after adding/updating
function clearQCMFields() {
  document.getElementById("qcm-question-text").value = "";
  document.getElementById("qcm-options").innerHTML = "";
  document.getElementById("qcm-marks").value = "";
  document.getElementById("question-duration").value = "";
  optionCount = 1;
}

// Media handler (assuming it's defined)
function getUploadedMediaInfo() {
  const mediaInput = document.getElementById("media-upload");
  if (mediaInput.files.length > 0) {
    const file = mediaInput.files[0];
    return { name: file.name, type: file.type.split("/")[0] }; // Extract file type
  }
  return null;
}

// Clear QCM fields
function clearQCMFields() {
  document.getElementById("qcm-question-text").value = "";
  document.getElementById("qcm-options").innerHTML = "";
  document.getElementById("qcm-marks").value = "";
  optionCount = 1;
}

// Clear direct fields
function clearDirectFields() {
  document.getElementById("direct-question-text").value = "";
  document.getElementById("direct-error-tolerance").value = "";
  document.getElementById("direct-correct-answer").value = "";
  document.getElementById("media-upload").value = "";
  document.getElementById("question-duration").value = "";
}

// Show error message
function showError(message) {
  const errorMessage = document.createElement("div");
  errorMessage.textContent = message;
  errorMessage.className = "error-message";
  document.getElementById("form-error-container").appendChild(errorMessage);
}

// Placeholder save & preview
function saveExam() {
  alert("Examen sauvegardé avec succès !");
}

function previewExam() {
  alert("Fonction Aperçu encore en cours de développement.");
}
