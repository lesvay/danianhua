var ref = new Wilddog("http://sc.chinaz.com/");
var words = ref.child("words");
    var word; //用来存储输入框中的值
    var arr = []; //用来存储野狗云已有数据
    var Request = new Object();
	Request = GetRequest();
	var id= Request['id'];//获取id
	var idd=id;
$(document).ready(function () {

	showcontent(id);
	function showcontent(id) {
		ref.child("words").remove(); //删除野狗云 words 子节点下的数据
        $("#showWords").empty(); //删除显示面板的子元素
        arr = [];
		$.ajax({
			type: "GET",
			url: '../php/sqhdconment.php',
			data: {
				id: id
			},
			datatype: "json",
			success: function(data) {
			$.each(data, function(index, value) {
	                word = value.title;
	                //当输入的值不为空时，执行以下代码
	                if(word != "") {
	                	ref.child('words').push(word); //将word的值写入野狗云
	                	var obj = $("<span class='moveWord'>" + word + "</span>"); //为word值生成对象
	                	$("#showWords").append(obj); //将生成的对象附加到面板上
	                	moveObj(obj); //调用 moveObj 函数使生成的对象动起来
	                }
				});
			}
		});

	}

    //监听 当野狗云中新增数据时，将新增的值存入 arr 中
    //刷新页面时 arr 将获得存储在野狗云的所有数据
    words.on("child_added", function (snap) {
        arr.push(snap.val());
    });

    //监听： 野狗云的 words 节点，当该节点被删除时清空数组arr 并将面板置空
    ref.on("child_removed", function () {
        arr = [];
        $("#showWords").empty(); //删除显示面板的子元素
    });

    //监听： 当野狗云 words下的直接子节点被删除时删除数组 arr 中对应的值
    words.on("child_removed", function (snap) {
        var deletedWord = snap.val();
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == deletedWord) {
                arr.splice(i, 1);
                break;
            }
        }

    });

    //每3秒随机在面板上弹出野狗云上的数据
    var getAndRun = function () {
        var i = arr.length;
        if (i > 0) {
            var y = Math.floor(i * Math.random());
            var obj = $("<span class='moveWord'>" + arr[y] + "</span>");
            $("#showWords").append(obj);
            moveObj(obj);
        }

        setTimeout(getAndRun, 3000); //每3秒调用一下自身
    }

    //设置显示面板的高度为浏览器显示窗口高度的60%
    var setHeight = function () {
        //浏览器显示窗口的宽度
        var w = window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;

        //浏览器显示窗口的高度
        var h = window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight;

        $("#showWords").css({
            "height": h * 0.85
        });
    };
    setHeight();
    //让发射的消息动起来
    var moveObj = function (obj) {
        var topMax = $("#showWords").height();
        var _top = Math.floor(topMax * (Math.random())); //设置top初始位置为面板高度内的随机数
        if (_top + obj.height() >= topMax) {
            _top -= obj.height();
        }

        var _left = $("#showWords").width() - obj.width(); //设置left初始位置位于显示面板最右侧

        //初始化消息位置
        obj.css({
            "top": _top,
            "left": _left,
            "color": "rgb(64 , 52 ,49 )" //调用 setColor 函数设置随机颜色
        });

        var time = 10000 + 10000 * Math.random();

        //进行动画，动画结束后通过回调函数把消息从面板中删除
        obj.animate({
            left: -$("#showWords").offset().left - obj.width()
        }, time, function () {
            obj.remove();
        });
    }


    //单击【发送】按钮时执行以下代码
    $("#addWords").click(function () {
    	var initializationTime = (new Date()).getTime();
		var now = new Date();
		var year = now.getYear();
		var month = now.getMonth();
		var day = now.getDate();
		var hours = now.getHours();
		var minutes = now.getMinutes();
		var seconds = now.getSeconds();
		var id=""+year+""+month+"" + day+"" + hours+"" + minutes+"" + seconds;
		$.ajax({
			url: './php/sqhdadd.php',
			type: "POST",
			data: {
			id: id,
			title: $("#word").val(),
			type: "spl",
			goto:idd
			},
			datatype: "text",
			success:function(data){
				alert("评论成功，等待审核");
				$("#word").val("");
				$("#word").focus();
			}
		});
        
    });

    getAndRun();

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