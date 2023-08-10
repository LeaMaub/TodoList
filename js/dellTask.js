function deleteTask(taskId) {
  fetch(`/php/dellTask.php?taskId=${taskId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        filterByCategory(currentCategory); // Actualiser la liste des tâches
      } else {
        alert("Erreur : " + data.message);
      }
    });
}
