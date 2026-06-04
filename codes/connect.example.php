<?php
$db_host = "localhost";
$db_name = "your_database";
$db_user = "your_username";
$db_pass = "your_password";

try {
    $con = new PDO(
        "mysql:host=$host;dbname=$db;charset=utf8",
        $user,
        $pass
    );

    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {

    header("Location: index.html?msg=db_error");
    exit();

}
?>