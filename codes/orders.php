<?php
include 'connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $full_name = trim($_POST['name']);
    $address = trim($_POST['address']);
    $city = trim($_POST['city']);
    $zip_code = trim($_POST['zip']);
    $payment_method = trim($_POST['payment_method']);

    $upi_id = !empty($_POST['upi'])
        ? trim($_POST['upi'])
        : NULL;

    $card_number = !empty($_POST['card'])
        ? substr(trim($_POST['card']), -4)
        : NULL;

    $expiry_date = !empty($_POST['expiry'])
        ? trim($_POST['expiry'])
        : NULL;

    if (
        empty($full_name) ||
        empty($address) ||
        empty($city)
    ) {

        header("Location: menu.html?msg=missing_fields");
        exit();

    }

    if ($payment_method == "UPI" && empty($upi_id)) {

        header("Location: menu.html?msg=upi_required");
        exit();

    }
    if ($payment_method == "Card" && empty($_POST['card'])) {

        header("Location: menu.html?msg=card_required");
        exit();

    }

    try {

        $sql = "INSERT INTO orders
        (full_name, address, city, zip_code, payment_method, upi_id, card_number, expiry_date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        $stmt = $con->prepare($sql);

        $stmt->execute([
            $full_name,
            $address,
            $city,
            $zip_code,
            $payment_method,
            $upi_id,
            $card_number,
            $expiry_date
        ]);

        header("Location: menu.html?msg=order_success");
        exit();

    } catch (PDOException $e) {

        header("Location: menu.html?msg=order_error");
        exit();

    }
}
?>