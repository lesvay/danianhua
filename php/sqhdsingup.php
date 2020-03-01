<?php
header("Content-type: text/html;charset=utf-8");
include_once('bg.php');
$id=$_POST['id'];
$type=$_POST['type'];
$imgurl=$_POST['imgurl'];
$sqls = "SELECT * FROM `shequ` WHERE `id`='$id'";
$querys=mysql_query($sqls);
if ($querys && mysql_num_rows($querys)) {
	$data=1;
	echo $data;
}
else{
	$data=2;
	$sql="insert into shequ (`id`,`type`,`imgurl`) values ('$id','$type','$imgurl')";
	$query=mysql_query($sql);
	echo $data;
}

?>