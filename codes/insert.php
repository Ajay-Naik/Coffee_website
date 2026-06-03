<?php
include 'connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = isset($_POST['name']) && !empty($_POST['name'])
        ? trim($_POST['name'])
        : 'Anonymous';

    $email = isset($_POST['email'])
        ? trim($_POST['email'])
        : '';

    $number = isset($_POST['number']) && !empty($_POST['number'])
        ? trim($_POST['number'])
        : 'N/A';

    $message = !empty($_POST['message'])
        ? trim($_POST['message'])
        : 'No message provided';

    if (empty($email)) {
        header("Location: contact.html?msg=email_required");
        exit();
    }

    try {
        $stmt = $con->prepare(
            "INSERT INTO contact (name, email, number, message)
             VALUES (?, ?, ?, ?)"
        );

        $stmt->execute([
            $name,
            $email,
            $number,
            $message
        ]);

        header("Location: contact.html?msg=success");
        exit();

    } catch (PDOException $e) {
        header("Location: contact.html?msg=db_error");
        exit();
    }

} else {
    header("Location: contact.html?msg=invalid_request");
    exit();
}
?>