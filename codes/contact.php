<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "coffie";

// Create connection
$con = new mysqli($servername, $username, $password, $database);

// Check connection
if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = isset($_POST['name']) ? trim($_POST['name']) : null;
    $email = isset($_POST['email']) ? trim($_POST['email']) : null;
    $number = isset($_POST['number']) && !empty($_POST['number']) ? trim($_POST['number']) : "N/A";
    $message = !empty($_POST['message']) ? trim($_POST['message']) : "No message provided";

    try {
        $insertQuery = $con->prepare("INSERT INTO contact (name, email, number, message) VALUES (?, ?, ?, ?)");
        $insertQuery->bind_param("ssss", $name, $email, $number, $message);

        if ($insertQuery->execute()) {
            header("Location: contact.html");
            exit();
        } else {
            echo "Error: " . $insertQuery->error;
        }
    } catch (Exception $e) {
        echo "Database Error: " . $e->getMessage();
    }
}
?>
