

$.fn.extend({
	_deal : function(option){ 
		var _data = option.data,
			_this = this;
			_this.nowNum = 0;
			_this.data = _data;
			_this._priceArea(option.data);
			_this._createDiv(_this.data);
			_this._sort(_this.data);
			_this._turnpage(_this.data);
			
	},
	//生成页面
	_createDiv : function(data){
		var _this=this, 
			_data = data,
			//当前页数
			nowNum = _this.nowNum;
		var $divItem=$("<div class='item clearfloat'></div>");
			if(parseInt((data.length-nowNum*10)/10)>0){
				var y=10;
			}else(y=(data.length-nowNum*10)%10)
		for(var i=0+nowNum*10 ;i<y+nowNum*10;i++){
			$divItem.append("<div class='product'> <div class='product-top'> <img class='product-img' src='http:" + _data[i].image +"'>" +
							" <div class='product-note'> <span class='notel'>找同款</span> <span class='noter'>找相似</span> </div> </div>" + 
							"<div class='product-body'><div class='product-price clearfloat'> <em class='price'>¥" + _data[i].price + "</em><span class='mail'>包邮</span></div> " + 
							"<a class='text'>"+ _data[i].name +"</a> " + "<div class='sold'>交易量 : " + _data[i].sold + "</div>" +
							"<div class='customer-message'><span class='customer-name'> <span class='nameicon'><div></div><div></div><div></div></span><a>"+ _data[i].owner +"</a></span> " + 
							"<span class='customer-place'>"+ _data[i].location +"</span> </div> <div class='icon'><img src='./image/jin.png'><img src='./image/fu.png'></div><div></div>");
		}
		$(this).html($divItem);
	},
	//换页
	_turnpage : function(data){
		var dataPage = parseInt(data.length/10),
			_this = this;
		var $pageToL = $(".pageToL"),
			$pageToR = $(".pageToR"),
			$nowpage = $(".nowpage"),
			$totalpage = $(".totalpage"),
			nowtext = $nowpage.text();
			if(parseInt(data.length%10)>0){
				$totalpage.text(dataPage+1);
			}else{
				$totalpage.text(dataPage);
			}
			nowtext == "1"? $pageToL.attr("disabled","true"):$pageToL.removeAttr("disabled");

		$pageToL.click(function(){
			nowtext <= 2? $pageToL.attr("disabled","true"):$pageToL.removeAttr("disabled");
			$nowpage.text(--nowtext);
			$pageToR.removeAttr("disabled");
			_this.nowNum = nowtext-1;
			_this._createDiv(_this.data);
		})
		$pageToR.click(function(){
			nowtext >= dataPage-1? $pageToR.prop("disabled","true"):$pageToR.removeAttr("disabled");
			$nowpage.text(++nowtext);
			$pageToL.removeAttr("disabled");
			_this.nowNum = nowtext-1;
			_this._createDiv(_this.data);
		})
		
	},
	//排序
	_sort : function(data){
		var _this=this,
			changedata = data;
		$(".priceAsc").click(function(){
			var changedata = _this.data;
			for (var j = 0; j< changedata.length-1; j++) {
				for(var i=0;i<changedata.length-1;i++){
					var datamin;
					if(parseInt(changedata[i].price)>parseInt(changedata[i+1].price)){
						datamin=changedata[i+1];
						changedata[i+1]=changedata[i];
						changedata[i]=datamin;
					}
				}
			}
			var _data=changedata;
			_this.data=_data;
			_this._createDiv(_this.data);
			_this._turnpage(_this.data);
			$(this).addClass("current").siblings().removeClass("current");
		});
		$(".priceDesc").click(function(){
			var changedata = _this.data;
			for (var j = 0; j< changedata.length-1; j++) {
				for(var i=0;i<changedata.length-1;i++){
					var datamin;
					if(parseInt(changedata[i].price)<parseInt(changedata[i+1].price)){
						datamin=changedata[i+1];
						changedata[i+1]=changedata[i];
						changedata[i]=datamin;
					}
				}
			}
			var _data=changedata;
			_this.data=_data;
			_this._createDiv(_this.data);
			_this._turnpage(_this.data);
			$(this).addClass("current").siblings().removeClass("current");
		});
		$(".numAsc").click(function(){
			var changedata = _this.data;
			for (var j = 0; j< changedata.length-1; j++) {
				for(var i=0;i<changedata.length-1;i++){
					var datamin;
					if(parseInt(changedata[i].sold)>parseInt(changedata[i+1].sold)){
						datamin=changedata[i+1];
						changedata[i+1]=changedata[i];
						changedata[i]=datamin;
					}
				}
			}
			var _data=changedata;
			_this.data=_data;
			_this._createDiv(_this.data);
			_this._turnpage(_this.data);
			$(this).addClass("current").siblings().removeClass("current");
		});
		$(".numDesc").click(function(){
			var changedata = _this.data;
			for (var j = 0; j< changedata.length-1; j++) {
				for(var i=0;i<changedata.length-1;i++){
					var datamin;
					if(parseInt(changedata[i].sold)<parseInt(changedata[i+1].sold)){
						datamin=changedata[i+1];
						changedata[i+1]=changedata[i];
						changedata[i]=datamin;
					}
				}
			}
			var _data=changedata;
			_this.data=_data;
			_this._createDiv(_this.data);
			_this._turnpage(_this.data);
			$(this).addClass("current").siblings().removeClass("current");
		});
	},
	_priceArea : function(data){
		var _this=this,
			min=0,
			max=999999;
		$(".submit").click(function(){
			var yuandata = data,
				dataArea=[];
			var $numLeft = $(".numLeft").val()/* =="¥"?0:$(".numLeft").val() */,
				$numRight = $(".numRight").val() /*=="¥"?999999:$(".numRight").val()*/;
			if(parseInt($numLeft)<=parseInt($numRight)){
				min=$numLeft;
				max=$numRight;
			}else{
				min=$numRight;
				max=$numLeft;
			};
			var x=0;
			for(var i=0;i<yuandata.length;i++){
				if(parseInt(yuandata[i].price)>=min&&parseInt(yuandata[i].price)<=max){
					dataArea[x]=yuandata[i];
					x++;
				}
			}
			_this.data = dataArea;
			console.log(_this.data);
			_this._createDiv(_this.data);
			_this._turnpage(_this.data);
		})
	}
});



$.ajax({
	url:"http://www.ikindness.cn/api/test/getProduct"
}).done(function(data){
	console.log(data);
	$(".itemA")._deal({
		data:data.data
	});
	/*$(".itemA")._priceArea({
		data:data.data
	});*/
})