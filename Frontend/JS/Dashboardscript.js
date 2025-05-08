// Sidebar toggle logic
document.getElementById("toggleBtn").addEventListener("click", function () {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("collapsed");
});
// Toggle user dropdown
// Show dropdown menu when clicking the avatar
const avatarBtn = document.getElementById("avatarBtn");
const dropdownMenu = document.getElementById("dropdownMenu");

avatarBtn.addEventListener("click", function () {
  dropdownMenu.classList.toggle("show");
});
