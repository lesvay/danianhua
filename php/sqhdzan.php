<?php
header("Content-type: text/html;charset=utf-8");
include_once("bg.php");
$id=$_GET['id'];
$sql = "SELECT * FROM `shequ` WHERE `id`='$id'";
$query=mysql_query($sql);
$row = mysql_fetch_assoc($query);
$zan=$row['zan']+1;
$sqls="UPDATE `shequ` SET `zan`='$zan' WHERE `id`='$id'";
$querys=mysql_query($sqls);
echo $querys;
?>