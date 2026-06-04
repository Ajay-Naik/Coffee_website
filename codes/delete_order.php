<?php

header('Content-Type: application/json');

include 'connect.php';

try {

    $input = json_decode(file_get_contents("php://input"), true);

    $orderId = intval($input['orderId'] ?? 0);

    if (!$orderId) {

        echo json_encode([
            'success' => false,
            'message' => 'Invalid Order ID'
        ]);

        exit();
    }

    $stmt = $con->prepare(
        "DELETE FROM orders WHERE id = ?"
    );

    $stmt->execute([$orderId]);

    echo json_encode([
        'success' => true
    ]);

} catch (Exception $e) {

    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);

}