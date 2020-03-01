<?php
header("Content-type: text/html;charset=utf-8");
include_once("bg.php");
$id=$_POST['id'];
$newstype=$_POST['newstype'];
$newstitle=$_POST['newstitle'];
$newscontent=$_POST['newscontent'];
$content_url=$_POST['content_url'];
$imgurl=$_POST['imgurl'];
$newsfromt=$_POST['newsfrom'];
$date=$_POST['date'];
$sql="UPDATE `danianhua` SET `id`='$id',`newstype`='$newstype',`newstitle`='$newstitle',`newscontent`='$newscontent',`content_url`='$content_url',`imgurl`='$imgurl',`newsfrom`='$newsfrom',`date`='$date' WHERE `id`='$id'";
$query=mysql_query($sql);
echo $query;
?>