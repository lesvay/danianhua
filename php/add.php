<?php
header("Content-type: text/html;charset=utf-8");
include_once("bg.php");
$id=$_POST['id'];
$newstype=$_POST['newstype'];
$newstitle=$_POST['newstitle'];
$newscontent=$_POST['newscontent'];
$content_url=$_POST['content_url'];
$imgurl=$_POST['imgurl'];
$newsfrom=$_POST['newsfrom'];
$date=$_POST['date'];
$sql="insert into danianhua (`id`,`newstype`,`newstitle`,`newscontent`,`content_url`,`imgurl`,`newsfrom`,`date`) values ('$id','$newstype','$newstitle','$newscontent','$content_url','$imgurl','$newsfrom','$date')";
$query=mysql_query($sql);
echo $query;
?>