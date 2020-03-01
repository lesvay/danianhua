$(document).ready(function() {
	(function() {
		showcontent("tpzl");
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
			$(".gr-main").html("");
				$.each(data, function(index, value) {
					var figure = $("<figure>").appendTo(".gr-main");
					var div = $("<div>").appendTo(figure);
					$("<img>").attr("src", value.imgurl).appendTo(div);
					var figcaption = $("<figcaption>").appendTo(figure);
					$("<h2>").text(value.newstitle).appendTo(figcaption);
					var div1 = $("<div>").appendTo(figcaption);
					$("<p>").text(value.newscontent).appendTo(div1);
				});

			}
		});

	}

});