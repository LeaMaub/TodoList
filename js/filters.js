function filterByCategory(category) {
  const errorMessageDiv = document.getElementById("error-message");
  errorMessageDiv.style.display = "none"; // Cachez la div
  
  currentCategory = category; // Mise à jour de la catégorie actuelle
  filterTasks('all'); // Filtrez avec 'all' pour réinitialiser le filtre de statut
  fetch(`/php/getTasks.php?category=${category}`)
    .then((response) => response.json())
    .then((tasks) => {
      displayTasks(tasks);
    });
}

function updateTaskStatus(taskId, status) {
  fetch(`/php/updateTaskStatus.php?taskId=${taskId}&status=${status}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
      } else {
        alert("Erreur lors de la mise à jour du statut : " + data.message);
      }
    });
}

function displayTasks(tasks) {
  const tableBody = document.querySelector(".table tbody");
  tableBody.innerHTML = ""; // Vider le tableau
  tasks.forEach((task) => {
    const row = document.createElement("tr");

    const finishedCheckbox = document.createElement("input");
    finishedCheckbox.type = "checkbox";
    finishedCheckbox.className = "form-check-input";
    finishedCheckbox.checked = task.status === "Terminée";

    const inProgressCheckbox = document.createElement("input");
    inProgressCheckbox.type = "checkbox";
    inProgressCheckbox.className = "form-check-input";
    inProgressCheckbox.checked = task.status === "En cours";

    // Ajouter des écouteurs pour gérer la sélection exclusive
    finishedCheckbox.addEventListener("change", () => {
      if (finishedCheckbox.checked) {
        inProgressCheckbox.checked = false;
        updateTaskStatus(task.id, "Terminée");
      }
    });

    inProgressCheckbox.addEventListener("change", () => {
      if (inProgressCheckbox.checked) {
        finishedCheckbox.checked = false;
        updateTaskStatus(task.id, "En cours");
      }
    });

    const cellFinished = document.createElement("td");
    cellFinished.className = "checkbox text-center";
    cellFinished.appendChild(finishedCheckbox);

    const cellInProgress = document.createElement("td");
    cellInProgress.className = "checkbox text-center";
    cellInProgress.appendChild(inProgressCheckbox);

    const cellTask = document.createElement("td");
    cellTask.innerHTML = `
        <div class="d-flex justify-content-between">
          <span>${task.name}</span>
          <button class="btn btn-danger btn-sm" onclick="deleteTask('${task.id}')" aria-label="Supprimer la tâche">
          <i class="fas fa-trash" style="color: #ffffff;"></i>
          </button>
        </div>
      `;

    row.appendChild(cellFinished);
    row.appendChild(cellInProgress);
    row.appendChild(cellTask);

    tableBody.appendChild(row);
  });
}

function filterTasks(filterType) {
  let url = `/php/getTasks.php?category=${currentCategory}`;

  if (filterType !== 'all') {
    url += `&filterType=${filterType}`;
  }

  fetch(url)
    .then((response) => response.json())
    .then((tasks) => {
      displayTasks(tasks);
    });
}


