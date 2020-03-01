<?php
header("Content-type: text/html;charset=utf-8");
include_once("bg.php");
$id=$_GET["id"];
if ($id=="") {
	die("没有找到符合该条件的新闻");
}else {
	$sql="DELETE FROM `shequ` WHERE `id`='$id'";
    mysql_query($sql);
}
?>