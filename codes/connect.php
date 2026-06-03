<?php
$host = 'localhost';
$db = 'coffie';
$user = 'root';
$pass = '';

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