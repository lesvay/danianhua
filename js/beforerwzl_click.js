$(document).ready(function() {
	(function() {
		showcontent("rwzl");
	})();

	function showcontent(newstype) {
		$.ajax({
			type: "GET",
			url: './php/list.php',
			data: {
				newstype: newstype
			},
			datatype: "json",
			success: function(data) {
			$(".page_container").html("");
				$.each(data, function(index, value) {
					var div = $("<div>").appendTo(".page_container").addClass("jumpto-block");
					$("<h2>").text(value.newstitle).appendTo(div);
					var div1 = $("<div>").appendTo(div);
					$("<img>").attr("src", value.imgurl).appendTo(div1).addClass("img");
					$("<p>").text(value.newscontent).appendTo(div1);
				});

			}
		});

	}

});
