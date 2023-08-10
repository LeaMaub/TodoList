<?php
require_once('../db/db.php');

$category = $_GET['category'];
$filterType = isset($_GET['filterType']) ? $_GET['filterType'] : 'all';

switch ($filterType) {
  case 'to_do':
    $statusCondition = "status = 'À faire'";
    break;
  case 'in_progress':
    $statusCondition = "status = 'En cours'";
    break;
  case 'done':
    $statusCondition = "status = 'Terminée'";
    break;
  default:
    $statusCondition = "1 = 1"; // Aucun filtre
}

$sql = "SELECT * FROM tasks WHERE category = :category AND $statusCondition";
$query = $db->prepare($sql);
$query->bindParam(':category', $category, PDO::PARAM_STR);
$query->execute();

$tasks = $query->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($tasks);

?>
