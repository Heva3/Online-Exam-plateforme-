document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // Stop form from refreshing the page

  const data = {
    email: document.getElementById("email").value,
    nom: document.getElementById("nom").value,
    prenom: document.getElementById("prenom").value,
    date_naissance: document.getElementById("date_naissance").value,
    role: document.querySelector('input[name="role"]:checked').value,
    etablissement: document.getElementById("etablissement").value,
    filiere: document.getElementById("filiere").value,
  };

  const response = await fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  alert(result.message); // You can replace this with a redirect or something else
});
