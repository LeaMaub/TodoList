<?php
require_once('../db/db.php');

$name = $_POST['taskName'];
$category = $_POST['category'];
$status = "À faire"; // Ou vous pouvez également le récupérer depuis POST si nécessaire

// Validation des données
if(empty($name) || empty($category)) {
    echo json_encode(['status' => 'error', 'message' => 'Nom et catégorie sont requis']);
    exit();
}

// Préparation de la requête SQL
$sql = "INSERT INTO tasks (name, category, status) VALUES (:name, :category, :status)";
$query = $db->prepare($sql);

// Liaison des paramètres
$query->bindParam(':name', $name, PDO::PARAM_STR);
$query->bindParam(':category', $category, PDO::PARAM_STR);
$query->bindParam(':status', $status, PDO::PARAM_STR);

// Exécution de la requête
try {
    $query->execute();
    echo json_encode(['status' => 'success', 'message' => 'Tâche ajoutée avec succès']);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Erreur lors de l\'ajout de la tâche: ' . $e->getMessage()]);
}