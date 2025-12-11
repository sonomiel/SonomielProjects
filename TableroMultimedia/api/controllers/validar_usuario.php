<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, PUT, DELETE, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once "../config/db.php";

$db = new Database();
$conn = $db->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {

    // 1. Leer JSON recibido
    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

    // 2. Obtener valores
    $username = $data['username'] ?? null;
    $password = $data['password'] ?? null;

    // 3. Validar que el JSON traiga datos
    if (!$username || !$password) {
        echo json_encode([
            "success" => false,
            "message" => "Faltan datos en el JSON"
        ]);
        exit;
    }

    // 4. Llamar al SP
    $stmt = $conn->prepare("CALL sp_validar_usuario(:u, :p)");
    $stmt->bindParam(':u', $username);
    $stmt->bindParam(':p', $password);
    $stmt->execute();

    $resultado = $stmt->fetch(PDO::FETCH_ASSOC);

    // 5. Respuesta
    if ($resultado && $resultado['resultado'] == 1) {
        echo json_encode([
            "success" => true,
            "message" => "Acceso permitido"
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Credenciales incorrectas"
        ]);
    }

    $stmt->closeCursor();
}
?>
