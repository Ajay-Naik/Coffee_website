<?php
include 'connect.php'; // Database connection

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        // Collect & sanitize inputs
        $full_name = trim($_POST['full_name']);
        $address = trim($_POST['address']);
        $city = trim($_POST['city']);
        $zip_code = trim($_POST['zip_code']);
        $payment_method = trim($_POST['payment_method']);
        $upi_id = !empty($_POST['upi_id']) ? trim($_POST['upi_id']) : null;
        $card_number = !empty($_POST['card_number']) ? trim($_POST['card_number']) : null;
        $expiry_date = !empty($_POST['expiry_date']) ? trim($_POST['expiry_date']) : null;
        $cvc = !empty($_POST['cvc']) ? trim($_POST['cvc']) : null;
        $created_at = date("Y-m-d H:i:s"); // Current timestamp

        // Prepare SQL statement
        $sql = "INSERT INTO contact (full_name, address, city, zip_code, payment_method, upi_id, card_number, expiry_date, cvc, created_at) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        $stmt = $con->prepare($sql);
        
        // Bind parameters
        $stmt->bindParam(1, $full_name);
        $stmt->bindParam(2, $address);
        $stmt->bindParam(3, $city);
        $stmt->bindParam(4, $zip_code);
        $stmt->bindParam(5, $payment_method);
        $stmt->bindParam(6, $upi_id);
        $stmt->bindParam(7, $card_number);
        $stmt->bindParam(8, $expiry_date);
        $stmt->bindParam(9, $cvc);
        $stmt->bindParam(10, $created_at);

        // Execute
        if ($stmt->execute()) {
            echo "Data inserted successfully!";
        } else {
            echo "Error inserting data.";
        }

    } catch (PDOException $e) {
        echo "Database Error: " . $e->getMessage();
    }
} else {
    die("Invalid request.");
}
?>
