<?php
 header("Access-Control-Allow-Origin: *");

session_start();
?>

<?php
//database connectivity
$con=mysqli_connect("hworldfram587.mysql.db", "hworldfram587", "EqyBKA4qr9AY", "hworldfram587") or die(mysqli_error());

if ($_GET['y']) {
    $sql = "SELECT * FROM dior_ez WHERE url LIKE '%" . htmlspecialchars($_GET['y'], ENT_QUOTES) . "%' ORDER BY id DESC LIMIT 1";
} else if ($_GET['idmmm']) {
    $sql = "SELECT * FROM dior_ez WHERE url LIKE '%" . htmlspecialchars($_GET['idmmm'], ENT_QUOTES) . "' ORDER BY id DESC LIMIT 1";
}

$val = mysqli_query($con, $sql);	
while($r=mysqli_fetch_array($val))
{
    echo $r['url'];
}

?>