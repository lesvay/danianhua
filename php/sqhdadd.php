<?php
header("Content-type: text/html;charset=utf-8");
include_once("bg.php");
$id=$_POST['id'];
$type=$_POST['type'];
$from=$_POST['froms'];
$content=$_POST['content'];
$title=$_POST['title'];
$imgurl=$_POST['imgurl'];
$goto=$_POST['goto'];
$zan=$_POST['zan'];
$pinglun=$_POST['pinglun'];
$date=$_POST['date'];
$outputDir="../img/$id.jpg";
$sql="insert into shequ (`id`,`type`,`from`,`content`,`title`,`imgurl`,`goto`,`zan`) values ('$id','$type','$from','$content','$title','$outputDir','$goto','$zan')";
$query=mysql_query($sql);
echo $query;
$inputDir=$imgurl;  
$content="";  
$handle=fopen($inputDir,'r');  
$content=fread($handle,filesize($inputDir));
$outResouse=fopen($outputDir,'w');  
fwrite($outResouse,$content);   
fclose($handle);  
fclose($outResouse);  
?>