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

<script>
  const loginForm = document.querySelector(".login-form");

  loginForm.addEventListener("submit", async (e) = {
    e.preventDefault();// empêche le rechargement de la page

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // On prépare les données en JSON
    const data = {
      email: email,
      password: password,
    ;

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        ,
        body: JSON.stringify(data), // envoie les données en JSON
      );

      const result = await response.json();

      if (response.ok) {
        alert("✅ Connexion réussie !");
        console.log(result);
        // Tu peux rediriger vers le dashboard ici :
        // window.location.href = "teacher_dashboard.html";
      else {
        alert("❌ Erreur de connexion : " + result.message);
      
    catch (error) {
      console.error("Erreur réseau :", error);
      alert("Erreur de connexion au serveur");
    
  );
</script>
