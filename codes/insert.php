<?php
// Database connection (assuming $con is your PDO connection)
include 'connect.php';

// var_dump($_POST); // Debugging

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = isset($_POST['email']) ? trim($_POST['email']) : null;
    $number = isset($_POST['number']) && !empty($_POST['number']) ? trim($_POST['number']) : "N/A";
    $message = !empty($_POST['message']) ? trim($_POST['message']) : "No message provided";


    try {
        $insertQuery = $con->prepare("INSERT INTO contact (email, number, message) VALUES (?, ?, ?)");
        $insertQuery->bindParam(1, $email);
        $insertQuery->bindParam(2, $number);
        $insertQuery->bindParam(3, $message);

        if ($insertQuery->execute()) {
            header("Location:contact.html");
            exit();
        } else {
            $errorInfo = $insertQuery->errorInfo();
            echo "Error: " . $errorInfo[2];
        }
    } catch (PDOException $e) {
        echo "Database Error: " . $e->getMessage();
    }
} else {
    die("Invalid request.");
}
?>
