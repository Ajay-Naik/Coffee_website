<?php
include 'connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $phone_number = isset($_POST['number']) ? trim($_POST['number']) : '';
    $booking_date = isset($_POST['date']) ? trim($_POST['date']) : '';

    if (strtotime($booking_date) < strtotime(date('Y-m-d'))) {
    header("Location: index.html?msg=invalid_date");
    exit();
}

    $booking_time = isset($_POST['time']) ? trim($_POST['time']) : '';
    $guests = isset($_POST['guests']) ? intval($_POST['guests']) : 0;
    if ($guests < 1 || $guests > 20) {

    header("Location: index.html?msg=invalid_guest_count");
    exit();

}

    if (
        empty($name) ||
        empty($email) ||
        empty($phone_number) ||
        empty($booking_date) ||
        empty($booking_time) ||
        $guests <= 0
    ) {

        header("Location: index.html?msg=invalid_booking");
        exit();

    }
    
     try {

        $sql = "INSERT INTO table_booking
        (name, email, phone_number, booking_date, booking_time, guests)
        VALUES (?, ?, ?, ?, ?, ?)";

        $stmt = $con->prepare($sql);

        $stmt->execute([
            $name,
            $email,
            $phone_number,
            $booking_date,
            $booking_time,
            $guests
        ]);

        header("Location: index.html?msg=booking_success");
        exit();

    } catch (PDOException $e) {

        header("Location: index.html?msg=booking_error");
        exit();

    }
}
?>