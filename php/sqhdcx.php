<?php
header("Content-type: application/json;charset=utf-8");
include_once ('bg.php');
$id=$_POST['id'];
 $sql = "SELECT * FROM `shequ` WHERE `id`='$id'";
 $query=mysql_query($sql);
 if ($query && mysql_num_rows($query)) {
 	while ($row = mysql_fetch_assoc($query))
   {
   	$data[]=$row;
   }  

 }else if(mysql_num_rows($query)==0){
     $data='{content:"blank"}';
     echo $data;
     return;
 }
 
    $jsondata=json_encode($data,JSON_UNESCAPED_UNICODE);
   	echo $jsondata;
?>
   
 