<?php 
$host = 'localhost';
$db = 'coffie';
$user = 'root';
$pass = '';

try {
    $con = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connection successful!";
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>
