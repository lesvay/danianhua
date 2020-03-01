$(document).ready(function(){
	$(".fanhui").hide();
	$(".fanhui").click(function(){
		list();
	});
	show($("#zhi").val());
});
function show(type){
	if(type=="stp"){
		$.ajax({
	        type: "GET",
	        url: './php/sqhdlist.php',
	        data: {
	            type: type
	        },
	        datatype: "json",
	       	success: function(data) {
	            $("tbody").html("");
	            $.each(data, function(index, value) {
	                var id = value.id;
	                var tr = $("<tr>").appendTo("tbody");
	                $("<td>").appendTo(tr).text(value.title);
	                $("<td>").appendTo(tr).text(value.from);
	                var button = $("<td>").appendTo(tr);
	                $("<button>").appendTo(button).text("删除").addClass("shanchu").addClass("box1").click(function(){
	                	shanchu(id);
	                });
	                $("<button>").appendTo(button).text("上传").addClass("xiugai").addClass("box1").click(function(){
	                	fahuo(id);
	                });
	                $("<button>").appendTo(button).text("详情").addClass("xiangqing").addClass("box1").click(function(){
	                	xiugai(id);
	                });
	            });
	        }
	   });
	}
	else if(type=="spl"){
		$.ajax({
	        type: "GET",
	        url: './php/sqhdlist.php',
	        data: {
	            type: type
	        },
	        datatype: "json",
	       	success: function(data) {
	            $("tbody").html("");
	            $.each(data, function(index, value) {
	                var id = value.id;
	                var tr = $("<tr>").appendTo("tbody");
	                $("<td>").appendTo(tr).text(value.title);
	                $("<td>").appendTo(tr).text(value.goto);
	                var button = $("<td>").appendTo(tr);
	                $("<button>").appendTo(button).text("删除").addClass("shanchu").addClass("box1").click(function(){
	                	shanchu(id);
	                });
	                $("<button>").appendTo(button).text("上传").addClass("xiugai").addClass("box1").click(function(){
	                	plfah(id);
	                });
	            });
	        }
	   });
	}
}
function xiugai(id){
	$.ajax({
		type: "POST",
		url: './php/sqhdcx.php',
		data: {
			id: id
		},
		datatype: "json",
		success: function(data) {
			// 显示旧信息
			addlist();
			$("#title").val(data[0].title);
			$("#content").val(data[0].content);
			$("#imgurl").val(data[0].imgurl);
			$("#froms").val(data[0].from);
		}
	});
}
function shanchu(id){
	$.ajax({
        type: "GET",
        url: './php/sqhddelete.php',
        data: {
            id: id
        },
        datatype: "text",
		success:function(data){
			alert("删除成功");
			window.location.reload(true);
			}
   	});
}
function addlist(){
	$(".addlist").show();
	$(".fanhui").show();
	$(".add").hide();
	$("table").hide();
}
function list(){
	$(".addlist").hide();
	$(".fanhui").hide();
	$(".add").show();
	$("table").show();
}
function fahuo(id){
	$.ajax({
		url: './php/sqhdfahuo.php',
		type: "POST",
		data: {
			id:id,
			type: "tp",
		},
		datatype: "text",
		success: function(data) {
			alert("上传成功");
			window.location.reload(true);
		}
	});
}
function plfah(id){
	$.ajax({
		url: './php/sqhdfahuo.php',
		type: "POST",
		data: {
			id:id,
			type: "pl",
		},
		datatype: "text",
		success: function(data) {
			alert("上传成功");
			window.location.reload(true);
		}
	});
}