<?php
require_once "../config/db.php";
$db = new Database();
$conn = $db->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    case "GET":
        $stmt = $conn->prepare("CALL sp_get_contenido()");
        $stmt->execute();
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;

    case "POST":
        $data = json_decode(file_get_contents("php://input"));

        $stmt = $conn->prepare("CALL sp_insert_contenido_multimedia(:fi, :ff, :t, :r)");
        $stmt->bindParam(":fi", $data->fecha_inicio);
        $stmt->bindParam(":ff", $data->fecha_fin);
        $stmt->bindParam(":t", $data->tipo);
        $stmt->bindParam(":r", $data->ruta);

        $stmt->execute();
        echo json_encode(["status" => "ok"]);
        break;

    case "DELETE":
        $id = $_GET['id'];
        $stmt = $conn->prepare("CALL sp_delete_contenido(:id)");
        $stmt->bindParam(":id", $id);
        $stmt->execute();
        echo json_encode(["status" => "deleted"]);
        break;
}
?>
