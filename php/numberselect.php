<?php
header("Content-type: text/html;charset=utf-8");
include_once ('bg.php');
$id=$_GET['id'];
$imgurl=$_GET['imgurl'];
$sql = "SELECT * FROM `shequ` WHERE `type`='number'";
$query=mysql_query($sql);
 if ($query && mysql_num_rows($query)) {
 	while ($row = mysql_fetch_assoc($query)){
	 	if($row['imgurl']==$imgurl&&$row['id']==$id){
	 		$data=1;
	 	}
	 	else if($row['imgurl']!=$imgurl&&$row['id']==$id||$row['imgurl']==$imgurl&&$row['id']!=$id){
	 		$data=2;
	 	}
 	}
 }
echo $data;
?>
   
 