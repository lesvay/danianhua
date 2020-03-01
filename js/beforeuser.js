$(document).ready(function() {
	var Request = new Object();
	Request = GetRequest();
	var id= Request['id'];
	showcontent(id);
	function showcontent(id) {
		$.ajax({
			type: "GET",
			url: '../php/sqhduser.php',
			data: {
				froms: id
			},
			datatype: "json",
			success: function(data) {
			$("#lxf-box").html("");
				$.each(data, function(index, value) {				
					var li = $("<li>").appendTo("#lxf-box");
					$("<img>").attr("src", value.imgurl).appendTo(li);
					$("<img>").attr("src", "img/del.png").appendTo(li).click(function(){del(value.id)});
					var url="beforesqdetial.html?&id="+value.id;
					url=encodeURI(encodeURI(url)); 
					var a = $("<a>").appendTo(li).attr("href",url);
					$("<strong>").text(value.title).appendTo(a);
				});
			}
		});

	}
	$("#imgurl").on('change', function() {	
	
			var image_holder = $("#image-holder");
			image_holder.empty();
	
			var reader = new FileReader();
			reader.onload = function(e) {
				$("<img />", {
					"src": e.target.result,
					"class": "thumb-image"
				}).appendTo(image_holder);
			}
			image_holder.show();
			reader.readAsDataURL($(this)[0].files[0]);
	});
	$("#submit").click(function(){	
		var initializationTime = (new Date()).getTime();
		var now = new Date();
		var year = now.getYear();
		var month = now.getMonth();
		var day = now.getDate();
		var hours = now.getHours();
		var minutes = now.getMinutes();
		var seconds = now.getSeconds();
		var bh =""+year+""+month+"" + day+"" + hours+"" + minutes+"" + seconds;
		$.ajax({
				url: './php/sqhdadd.php',
				type: "POST",
				data: {
					id: bh,
					title: $("#title").val(),
					type:"stp",
					content: $("#content").val(),
					imgurl: $("#imgurl").val(),
					froms: id,
				},
				datatype: "text",
				success:function(data){
					alert($("#imgurl").val());
					alert("添加成功");
					window.location.reload(true);
				}
			});
	});
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
function del(id){
	$.ajax({
	url: './php/sqhddelete.php',
	type: "GET",
	data: {
	id: id,
	},
	datatype: "text",
	success: function(data) {
	alert("删除成功");
	window.location.reload(true);
	}
	});
}