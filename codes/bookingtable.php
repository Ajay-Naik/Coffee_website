<?php

// include 'connect.php';
$servername = "localhost";
$username = "root";
$password = "";
$database = "coffie";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $phone_number = isset($_POST['number']) ? $_POST['number'] : ''; 
    $booking_date = isset($_POST['date']) ? $_POST['date'] : '';
    $booking_time = isset($_POST['time']) ? $_POST['time'] : '';
    $guests = isset($_POST['guests']) ? intval($_POST['guests']) : 0;

    if (empty($name) || empty($email) || empty($phone_number) || empty($booking_date) || empty($booking_time) || $guests <= 0) {
        die("Some fields are empty or invalid. Please fill all the details.");
    }

 
    $sql = "INSERT INTO table_booking (name, email, phone_number, booking_date, booking_time, guests) 
            VALUES (?, ?, ?, ?, ?, ?)"; 
            print_r($_POST); // Check all received POST data


    $stmt = $conn->prepare($sql);
    if ($stmt === false) {
        die("Error preparing statement: " . $conn->error);
    }

    $stmt->bind_param("sssssi", $name, $email, $phone_number, $booking_date, $booking_time, $guests);

    if (!$stmt->execute()) {
        die("Execute failed: " . $stmt->error);
    } else {
        header("Location: index.html");
    }

    $stmt->close();
    $conn->close();
} 
?>
