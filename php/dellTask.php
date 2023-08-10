<?php
require_once('../db/db.php');

$taskId = $_GET['taskId'];

$sql = "DELETE FROM tasks WHERE id = :taskId";
$query = $db->prepare($sql);
$query->bindParam(':taskId', $taskId, PDO::PARAM_INT);

try {
    $query->execute();
    echo json_encode(['status' => 'success', 'message' => 'Tâche supprimée avec succès']);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Erreur lors de la suppression de la tâche: ' . $e->getMessage()]);
}
?>
