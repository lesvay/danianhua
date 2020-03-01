$(document).ready(function(){
	$(".signups").click(function(){
		signups();
	});
	$(".register").click(function(){
		register();
	});
});
function signups(){
	$.ajax({
			type: "GET",
			url: '../php/numberselect.php',
			data: {
				id: $(".username").val(),
				imgurl: $(".mima").val(),
			},
			datatype: "text",
			success: function(data) {
				if(data==1){
					var url="beforeuser.html?&id="+$(".username").val();
					url=encodeURI(encodeURI(url)); 
					window.location.href=url;
				}
				else if(data==2){
					alert("用户名或密码错误");
				}
				else{
					alert("请注册");
				}
				
			}
	});
}
function register(){
	$.ajax({
		url: './php/sqhdsingup.php',
		type: "POST",
		data: {
		id: $(".username").val(),
		type: "number",
		imgurl: $(".mima").val(),
		},
		datatype: "text",
		success:function(data){
			if(data==1){
				alert("用户名已被使用");
			}
			else if(data==2){
				alert("注册成功");
				var url="beforeuser.html?&id="+$(".username").val();
				url=encodeURI(encodeURI(url)); 
				window.location.href=url;
			}
			else{
				alert("系统错误");
			}
		}
	});
}
