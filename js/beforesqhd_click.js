$(document).ready(function() {
	(function() {
		showcontent("tp");
	})();
	function showcontent(type) {
		$.ajax({
			type: "GET",
			url: '../php/sqhdlist.php',
			data: {
				type: type
			},
			datatype: "json",
			success: function(data) {
			$("#lxf-box").html("");
				$.each(data, function(index, value) {
					var li = $("<li>").appendTo("#lxf-box");
					$("<img>").attr("src", value.imgurl).appendTo(li);
					$("<img>").attr("src", "img/zan.png").appendTo(li).click(function(){zan(value.id)});
					var url="beforesqdetial.html?&id="+value.id;
					url=encodeURI(encodeURI(url)); 
					var a = $("<a>").appendTo(li).attr("href",url);
					$("<strong>").text(value.title).appendTo(a);
				});
			}
		});

	}
});
function zan(id){
	$.ajax({
	url: './php/sqhdzan.php',
	type: "GET",
	data: {
	id: id,
	},
	datatype: "text",
	success: function(data) {
	alert("点赞成功");
	}
	});
}