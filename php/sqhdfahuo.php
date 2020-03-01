<?php
header("Content-type: text/html;charset=utf-8");
include_once("bg.php");
$id=$_POST['id'];
$type=$_POST['type'];
$sql="UPDATE `shequ` SET `id`='$id',`type`='$type' WHERE `id`='$id'";
$query=mysql_query($sql);
echo $query;
?>