$(document).ready(function(){
	var initializationTime = (new Date()).getTime();
	var now = new Date();
	var year = now.getYear();
	var month = now.getMonth();
	var day = now.getDate();
	var hours = now.getHours();
	var minutes = now.getMinutes();
	var seconds = now.getSeconds();
	$("#id").val(""+year+""+month+"" + day+"" + hours+"" + minutes+"" + seconds);
	function GetRequest() {
		var url = location.search; //获取url中"?"符后的字串 
		var theRequest = new Object();
		url=decodeURI(decodeURI(url));
		if(url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for(var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
			}
		}
		return theRequest;
	}
	var Request = new Object();
	Request = GetRequest();
	var price,pructed;
	price = Request['price'];
	pructed = Request['pructed'];
	$("#price").val(price);
	$("#list").val(pructed);
	$("#submit").click(function(){
	$.ajax({
		url: './php/add.php',
		type: "POST",
		data: {
			id: $("#id").val(),
			newstitle: $("#name").val(),
			newstype: "ddgl",
			newscontent: $("#list").val(),
			date: $("#price").val(),
			imgurl: $("#phone").val(),
			newsfrom: $("#address").val(),
		},
		datatype: "text",
		success: function(data) {
			alert("提交成功，请付款");
			window.location.reload(true);
		}
	});
});
});




