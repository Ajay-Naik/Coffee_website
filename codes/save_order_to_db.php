<?php
header('Content-Type: application/json');
include 'connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        $input = json_decode(file_get_contents("php://input"), true);

        if (!$input || empty($input['order'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Invalid order data']);
            exit();
        }

        $order = $input['order'];

        // Validate required fields
        if (empty($order['name']) || empty($order['address']) || empty($order['city'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Missing required fields']);
            exit();
        }
        if (($order['paymentMethod'] ?? '') !== 'Card') {
            $order['cardNumber'] = null;
            $order['cardExpiry'] = null;
        }

        // Insert into orders table
        $sql = "INSERT INTO orders 
                (full_name, address, city, zip_code, payment_method, upi_id, card_number, expiry_date) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        $stmt = $con->prepare($sql);

        $stmt->execute([
            $order['name'],
            $order['address'],
            $order['city'],
            $order['zip'] ?? '',
            $order['paymentMethod'] ?? 'Cash on Delivery',
            $order['upiId'] ?? null,
            !empty($order['cardNumber'])
                ? substr(str_replace(' ', '', $order['cardNumber']), -4)
                : null,
            $order['cardExpiry'] ?? null
        ]);

        $orderId = $con->lastInsertId();

        // Create order_items table if doesn't exist
        $createTableSql = "CREATE TABLE IF NOT EXISTS `order_items` (
            `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
            `order_id` int(11) NOT NULL,
            `item_name` varchar(255) NOT NULL,
            `item_price` decimal(10, 2) NOT NULL,
            `item_quantity` int(11) NOT NULL,
            `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci";

        $con->exec($createTableSql);

        // Insert order items
        if (!empty($order['items']) && is_array($order['items'])) {
            $itemSql = "INSERT INTO order_items (order_id, item_name, item_price, item_quantity) 
                       VALUES (?, ?, ?, ?)";
            $itemStmt = $con->prepare($itemSql);

            foreach ($order['items'] as $item) {
                $itemStmt->execute([
                    $orderId,
                    $item['name'] ?? '',
                    $item['price'] ?? 0,
                    $item['quantity'] ?? 1
                ]);
            }
        }

        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Order saved successfully',
            'orderId' => $orderId
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
