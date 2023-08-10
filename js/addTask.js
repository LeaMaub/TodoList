let currentCategory = null; // Pas de catégorie par défaut

function addTask() {
  let taskName = document.getElementById("inputTaskName").value;
  let category = currentCategory; // Utilisez la catégorie actuelle

  if (!category) {
    const errorMessageDiv = document.getElementById("error-message");
    errorMessageDiv.innerText = "Veuillez sélectionner une catégorie avant d'ajouter une tâche.";
    errorMessageDiv.style.display = "block"; // Affichez la div
    return;
  }  

  fetch("/php/addTask.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      taskName: taskName,
      category: category,
    }).toString(),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        filterByCategory(category); // Actualiser la liste des tâches
        document.getElementById("inputTaskName").value = ""; // Réinitialiser la valeur de l'input
      } else {
        alert("Erreur : " + data.message);
      }
    });
}

document.getElementById("formAddTask").addEventListener("submit", function (e) {
  e.preventDefault();
  addTask();
});
