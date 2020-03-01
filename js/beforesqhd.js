setTimeout(function() {
var margin = 10;
var li=$("li");
var	li_W = li[0].offsetWidth+margin;
	var h=[];
	var n = 4
	for(var i = 0;i < li.length;i++) {
		li_H = li[i].offsetHeight;
		if(i < n) {
			h[i]=li_H;
			li.eq(i).css("top",0);
			li.eq(i).css("left",i * li_W);
			}
		else{
			min_H =Math.min.apply(null,h) ;
			minKey = getarraykey(h, min_H);
			h[minKey] += li_H+margin ;
			li.eq(i).css("top",min_H+margin);
			li.eq(i).css("left",minKey * li_W);
		}
		
	}
function getarraykey(s, v) {for(k in s) {if(s[k] == v) {return k;}}}
},2000);