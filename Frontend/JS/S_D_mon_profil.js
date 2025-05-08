// Sidebar toggle logic
document.getElementById("toggleBtn").addEventListener("click", function () {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("collapsed");
});

//Changement photo
const changePicBtn = document.getElementById("changePicBtn");
const picInput = document.getElementById("picInput");
const profilePic = document.getElementById("profilePic");

changePicBtn.addEventListener("click", () => {
  // Simulate a click on the hidden file input
  picInput.click();
});

picInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      // Change the image source to the uploaded image
      profilePic.src = e.target.result;
      changePicBtn.textContent = "Photo modifiée";
    };

    reader.readAsDataURL(file);
  }
});

// Elements
const editBtn = document.getElementById("editBtn");
const cancelBtn = document.getElementById("cancelBtn");
const editForm = document.getElementById("editForm");
const profileInfo = document.querySelector(".profile-info");

// Toggle edit form on "Modifier Profil" button
editBtn.addEventListener("click", () => {
  editForm.style.display = "block";
  profileInfo.style.display = "none";
  editBtn.style.display = "none";
});

// Cancel edit and hide form
cancelBtn.addEventListener("click", () => {
  editForm.style.display = "none";
  profileInfo.style.display = "block";
  editBtn.style.display = "inline-block";
});

// Handle form submission
editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Update profile info
  document.getElementById("name").textContent =
    document.getElementById("editName").value;
  document.getElementById("filiere").textContent =
    document.getElementById("editFiliere").value;
  document.getElementById("etablissement").textContent =
    document.getElementById("editEtablissement").value;

  // Hide form and show updated profile
  editForm.style.display = "none";
  profileInfo.style.display = "block";
  editBtn.innerText = "Modifier Profil";
});
