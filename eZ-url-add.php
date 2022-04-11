<?php 
header("Access-Control-Allow-Origin: *");

session_start();
?>

<?php
//database connectivity
$con=mysqli_connect("hworldfram587.mysql.db", "hworldfram587", "EqyBKA4qr9AY", "hworldfram587") or die(mysqli_error());

$sql = "SELECT * FROM dior_ez WHERE url='" . htmlspecialchars($_GET['url'], ENT_QUOTES) . "' LIMIT 1";

$val = mysqli_query($con, $sql);	
if(!mysqli_num_rows($val)) {
    $sqlInsert = "INSERT INTO `dior_ez` (`id`, `url`) VALUES (NULL, '" . htmlspecialchars($_GET['url'], ENT_QUOTES) . "')";
    echo "ok";
    $valInsert=mysqli_query($con, $sqlInsert);	
}

?>