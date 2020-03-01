$(document).ready(function() {
	var Request = new Object();
	Request = GetRequest();
	var id= Request['id'];
	showcontent(id);
	function showcontent(id) {
		$.ajax({
			type: "GET",
			url: '../php/sqhddetaillist.php',
			data: {
				id: id
			},
			datatype: "json",
			success: function(data) {
			$(".zhanshi").html("");
			$("<div>").appendTo(".zhanshi").addClass("detailtital").text(data[0].title);
			$("<div>").appendTo(".zhanshi").addClass("detailauthor").text("作者："+data[0].from+" "+"赞("+data[0].zan+")");
			$("<div>").appendTo(".zhanshi").addClass("detailindu").text(data[0].content);
			$("<img>").attr("src",data[0].imgurl).appendTo(".zhanshi").addClass("detailimg");
			}
		});

	}
});
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