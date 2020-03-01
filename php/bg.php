<?php
$con=mysql_connect("localhost","root","root");
$my_db=mysql_select_db("danianhua",$con) or die("error");
mysql_query("set names 'utf8'");
?>
