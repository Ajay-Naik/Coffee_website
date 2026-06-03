<?php
header('Content-Type: application/json');
include 'connect.php';

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    try {
        // Get order ID if specified
        $orderId = isset($_GET['id']) ? intval($_GET['id']) : null;

        if ($orderId) {
            // Fetch specific order
            $sql = "SELECT o.id, o.full_name, o.address, o.city, o.zip_code, 
                           o.payment_method, o.created_at
                    FROM orders o
                    WHERE o.id = ?
                    LIMIT 1";
            
            $stmt = $con->prepare($sql);
            $stmt->execute([$orderId]);
            $order = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$order) {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'Order not found']);
                exit();
            }

            // Fetch order items
            $itemSql = "SELECT item_name, item_price, item_quantity, created_at
                       FROM order_items
                       WHERE order_id = ?
                       ORDER BY created_at DESC";
            
            $itemStmt = $con->prepare($itemSql);
            $itemStmt->execute([$orderId]);
            $items = $itemStmt->fetchAll(PDO::FETCH_ASSOC);

            $order['items'] = $items;
            $order['total'] = array_reduce($items, function($sum, $item) {
                return $sum + ($item['item_price'] * $item['item_quantity']);
            }, 0);

            http_response_code(200);
            echo json_encode([
                'success' => true,
                'order' => $order
            ]);
        } else {
            // Fetch all orders
            $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;
            $offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;

            $sql = "SELECT id, full_name, address, city, payment_method, created_at
                    FROM orders
                    ORDER BY created_at DESC
                    LIMIT ? OFFSET ?";
            
            $stmt = $con->prepare($sql);
            $stmt->bindValue(1, $limit, PDO::PARAM_INT);
            $stmt->bindValue(2, $offset, PDO::PARAM_INT);
            $stmt->execute();
            $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Get total count
            $countSql = "SELECT COUNT(*) as total FROM orders";
            $countStmt = $con->prepare($countSql);
            $countStmt->execute();
            $countResult = $countStmt->fetch(PDO::FETCH_ASSOC);

            http_response_code(200);
            echo json_encode([
                'success' => true,
                'orders' => $orders,
                'total' => $countResult['total'],
                'limit' => $limit,
                'offset' => $offset
            ]);
        }

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
?>
