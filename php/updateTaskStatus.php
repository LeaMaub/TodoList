<?php
require_once('../db/db.php');

$taskId = $_GET['taskId'];
$status = $_GET['status'];

if(empty($taskId) || empty($status)) {
  echo json_encode(['status' => 'error', 'message' => 'ID de tâche et statut sont requis']);
  exit();
}

$sql = "UPDATE tasks SET status = :status WHERE id = :taskId";
$query = $db->prepare($sql);
$query->bindParam(':status', $status, PDO::PARAM_STR);
$query->bindParam(':taskId', $taskId, PDO::PARAM_INT);

try {
  $query->execute();
  echo json_encode(['status' => 'success', 'message' => 'Statut mis à jour avec succès']);
} catch (Exception $e) {
  echo json_encode(['status' => 'error', 'message' => 'Erreur lors de la mise à jour du statut: ' . $e->getMessage()]);
}
?>
