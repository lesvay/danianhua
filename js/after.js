$(document).ready(function(){
	var initializationTime = (new Date()).getTime();
	var now = new Date();
	var year = now.getYear();
	var month = now.getMonth();
	var day = now.getDate();
	var hours = now.getHours();
	var minutes = now.getMinutes();
	var seconds = now.getSeconds();
	var bh =""+year+""+month+"" + day+"" + hours+"" + minutes+"" + seconds;
	var flag=0;
	$(".fanhui").hide();
	$(".add").click(function(){
		flag=1;
		addlist();
	});
	$(".fanhui").click(function(){
		list();
	});
	show($("#zhi").val());
	$("#submit").click(function(){
		if(flag==1){
			$.ajax({
				url: './php/add.php',
				type: "POST",
				data: {
					id: bh,
					newstitle: $("#newstitle").val(),
					newstype: $("#zhi").val(),
					newscontent: $("#newscontent").val(),
					imgurl: $("#imgurl").val(),
				},
				datatype: "text",
				success:function(data){
					alert("添加成功");
					window.location.reload(true);
				}
			});
		} 
		else if (code == 2){
			$.ajax({
				url: './php/modify.php',
				type: "POST",
				data: {
					id: $("#id").val(),
					newstitle: $("#newstitle").val(),
					newstype: $("#zhi").val(),
					newscontent: $("#newscontent").val(),
					imgurl: $("#imgurl").val(),
				},
				datatype: "text",
				success: function(data) {
					alert("修改成功");
					window.location.reload(true);
				}
			});
		}
	});
});
function show(type){
	if(type=="rwzl"||type=="tpzl"){
		$.ajax({
	        type: "GET",
	        url: './php/list.php',
	        data: {
	            newstype: type
	        },
	        datatype: "json",
	       	success: function(data) {
	            $("tbody").html("");
	            $.each(data, function(index, value) {
	                var id = value.id;
	                var tr = $("<tr>").appendTo("tbody");
	                $("<td>").appendTo(tr).text(value.newstitle);
	                var button = $("<td>").appendTo(tr);
	                $("<button>").appendTo(button).text("删除").addClass("shanchu").addClass("box1").click(function(){
	                	shanchu(id);
	                });
	                $("<button>").appendTo(button).text("修改").addClass("xiugai").addClass("box1").click(function(){
	                	xiugai(id);
	                });
	            });
	        }
	    });
	}
	else if(type=="nhzb"){
		$.ajax({
	        type: "GET",
	        url: './php/list.php',
	        data: {
	            newstype: type
	        },
	        datatype: "json",
	       	success: function(data) {
	            $("tbody").html("");
	            $.each(data, function(index, value) {
	                var id = value.id;
	                var tr = $("<tr>").appendTo("tbody");
	                $("<td>").appendTo(tr).text(value.newstitle);
	                $("<td>").appendTo(tr).text(value.newscontent);
	                var button = $("<td>").appendTo(tr);
	                $("<button>").appendTo(button).text("删除").addClass("shanchu").addClass("box1").click(function(){
	                	shanchu(id);
	                });
	                $("<button>").appendTo(button).text("修改").addClass("xiugai").addClass("box1").click(function(){
	                	xiugai(id);
	                });
	            });
	        }
	    });
		
	}
	else if(type=="ddgl"){
		$.ajax({
	        type: "GET",
	        url: './php/list.php',
	        data: {
	            newstype: type
	        },
	        datatype: "json",
	       	success: function(data) {
	            $("tbody").html("");
	            $.each(data, function(index, value) {
	                var id = value.id;
	                var tr = $("<tr>").appendTo("tbody");
	                $("<td>").appendTo(tr).text(value.id);
	                $("<td>").appendTo(tr).text(value.newstitle);
	                $("<td>").appendTo(tr).text(value.imgurl);
	                $("<td>").appendTo(tr).text(value.newsfrom);
	                $("<td>").appendTo(tr).text(value.date);
	                var button = $("<td>").appendTo(tr);
	                $("<button>").appendTo(button).text("详情").addClass("shanchu").addClass("box1").click(function(){
	                	xiugai(id);
	                });
	                $("<button>").appendTo(button).text("发货").addClass("xiugai").addClass("box1").click(function(){
	                	fahuo(id);
	                });
	            });
	        }
	    });
		
	}
	else if(type=="lsdd"){
		$.ajax({
	        type: "GET",
	        url: './php/list.php',
	        data: {
	            newstype: type
	        },
	        datatype: "json",
	       	success: function(data) {
	            $("tbody").html("");
	            $.each(data, function(index, value) {
	                var id = value.id;
	                var tr = $("<tr>").appendTo("tbody");
	                $("<td>").appendTo(tr).text(value.id);
	                $("<td>").appendTo(tr).text(value.newstitle);
	                $("<td>").appendTo(tr).text(value.imgurl);
	                $("<td>").appendTo(tr).text(value.newsfrom);
	                $("<td>").appendTo(tr).text(value.date);
	                var button = $("<td>").appendTo(tr);
	                $("<button>").appendTo(button).text("详情").addClass("shanchu").addClass("box1").click(function(){
	                	xiugai(id);
	                });
	            });
	        }
	    });
		
	}
}
function xiugai(id){
	$.ajax({
		type: "POST",
		url: './php/chaxu.php',
		data: {
			id: id
		},
		datatype: "json",
		success: function(data) {
			// 显示旧信息
			addlist();
			$("#newstitle").val(data[0].newstitle);
			$("#id").val(data[0].id);
			$("#newscontent").val(data[0].newscontent);
			$("#imgurl").val(data[0].imgurl);
			$("#date").val(data[0].date),
			$("#newsfrom").val(data[0].newsfrom),
			code = 2;
		}
	});
}
function shanchu(id){
	$.ajax({
        type: "GET",
        url: './php/delete.php',
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
		url: './php/fahuo.php',
		type: "POST",
		data: {
			id:id,
			newstype: "lsdd",
		},
		datatype: "text",
		success: function(data) {
			alert("已发货，请到【历史订单】查看");
			window.location.reload(true);
		}
	});
}