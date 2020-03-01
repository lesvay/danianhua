$(document).ready(function() {
	(function() {
		showcontent("nhzb");
	})();

	function showcontent(newstype) {
		$.ajax({
			type: "GET",
			url: '../php/list.php',
			data: {
				newstype: newstype
			},
			datatype: "json",
			success: function(data) {
			$(".col-md-9").html("");
				$.each(data, function(index, value) {
					var div1 = $("<div>").appendTo(".col-md-9").addClass("ct-product");
					var div2 = $("<div>").appendTo(div1).addClass("image");
					$("<img>").attr("src", value.imgurl).appendTo(div2);
					var div3 = $("<div>").appendTo(div1).addClass("inner");
					$("<h2>").text(value.newstitle).appendTo(div3).addClass("ct-product-title");
					$("<h2>").text(value.newscontent).appendTo(div3).addClass("ct-product-price");
					var a = $("<a>").appendTo(div3).addClass("btn btn-motive ct-product-button").attr("href","#");
					$("<i>").addClass("fa fa-shopping-cart").appendTo(a);
				});

			}
		});

	}
});
