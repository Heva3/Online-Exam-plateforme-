// Simule le chargement des résultats
document.addEventListener("DOMContentLoaded", function () {
  const loadingElement = document.getElementById("loading");
  const resultsTableBody = document.querySelector("#results-table tbody");

  // Simuler un délai de chargement de 2 secondes
  setTimeout(() => {
    loadingElement.style.display = "none"; // Masquer le message de chargement

    // Données simulées des résultats
    const results = [
      { name: "Jean Dupont", examTitle: "Examen de Mathématiques", score: 85 },
      { name: "Marie Martin", examTitle: "Examen d'Informatique", score: 92 },
    ];

    // Ajouter les résultats au tableau
    results.forEach((result) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${result.name}</td>
          <td>${result.examTitle}</td>
          <td>${result.score} / 100</td>
        `;
      resultsTableBody.appendChild(row);
    });
  }, 2000); // Simule un délai de 2 secondes
});
