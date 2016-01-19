

$.fn.GmktAjaxLoader = function(options) {
	
	var elements = this;
	var settings = {
		reqData : null,
		dataType : 'jsonp',
		imgType : 'default',
		nameType : 'default'
	};

	// Generate URL + Query
	var genQuery = function(data){
		
		var result; // Query for Return Value
		var array = data.goods;; // Goodscode

		if ( data.type == 'GMARKET_GOODS' ){

			result = "http://m.gmarket.co.kr/Event/2014/01/0106_specialprice/data.asp?type=searchJson&goodscode=";

			for ( var i = 0 ; i < array.length ; i++ ){

				( i === 0 ) ? result += array[i].pGoods : result += "," + array[i].pGoods;

			}

		}else if( data.type == 'GMARKET_EVENT' ){

			result = "http://event.gmarket.co.kr/html/201401/140102_newYear_sub/newYear_sub1.asp?group_no="+array;

		}else{

			result = "http://m.gmarket.co.kr/Event/2014/01/0106_specialprice/data.asp?type=searchJson&goodscode=000000000";

		}
		
		return result;
	}

	var init = function(){

		if ( settings.reqData != null ) {

			dataLoad();

		}else{

			console.log( 'ERROR : Request Data Empty  --> Fnc ::  init() ' );

		}

	}

	var dataLoad = function(){

		this.loadTimes = settings.reqData.length; 
		this.nowTimes = 0;
		this.loadedData = [];

		if  ( this.loadTimes != 0 ) {

			if ( settings.dataType != 'jsonp' ){

				// XML or Json Type

			}else{

				// Jsonp Type
				var jsonData = new Jsonload();
				jsonData.setUrl( genQuery(settings.reqData[nowTimes]) , "info");

				jsonData.dataLoadComplete = function(data){

					loadedData.push(data);
					loadedData[nowTimes].idx = nowTimes;  // ???

					console.debug( 'RESULT : '+nowTimes+' -- > ' , data);

					if ( ++nowTimes < loadTimes ) {
						
						jsonData.setUrl( genQuery(settings.reqData[nowTimes]) , "info" );

					}else{

						releaseGoods(loadedData);

					}
				}

			}

		}else{

			console.log( 'ERROR : Request Data Error  --> Fnc :: dataLoad() ' );

		}

	}

	var releaseGoods = function(data){

		var showGoods = new markupSelector();

		$(data).each(function(e){

			$eventData = $(this)[0].event;

			if ( $eventData != null ){

				showGoods.setdata( settings.reqData[e], $eventData , elements );

			}else{

				console.log (' Goods Data Not Found ');

			}

		});

	}

	$(document).ready(function() {

		if(options) {

			$.extend(settings, options);

		}

		init();

	});

	return this;

};




function Jsonload(){

	this._data = [];
	//this.dataLoadComplete = function(){}

}

//set
Jsonload.prototype.setUrl = function(_url , _callbackname){
	var self = this;
	$.ajax({
		url:_url,
		crossDomain: true,
		dataType: "jsonp",
		jsonpCallback: _callbackname ,
		success: function(xml) {

			self._data = xml

		},
		error: function() {},
		complete: function(){

			self.dataLoadComplete(self._data);

		}
	});
};

//override
Jsonload.prototype.dataLoadComplete = function(data){};



// Markup Type Selector

function markupSelector(){

	this._init.apply( this );

}

markupSelector.prototype = {

	_init : function(){

		var self = this;

	},
	setdata : function(reqData,resData,elem){

		self._reqData = reqData;
		self._resData = resData;

		this.execute(elem);
	},
	genImgUrl : function(data){

		return "http://gdimg.gmarket.co.kr/goods_image2/shop_img/"+data.substr(0,3)+"/"+data.substr(3,3)+"/"+data+".jpg";

	},
	salePercent : function(val,val2){

		// Delete ","
		val = parseInt(val.replace(/,/g,""),10);
		val2 = parseInt(val2.replace(/,/g,""),10);

		var result;

		( val !== val2 ) ? result = ( 1 -(val / val2) ) * 100 : result = 0;

		return parseInt(result,10);

	},
	genPrice : function(data){

		var _reg = /(\d)(?=(?:\d{3})+(?!\d))/g; // regular expression

		if( data.indexOf(",") == -1 ){
			return data.replace(_reg, '$1,');
		}else{
			return data;

		}

	},
	designType : function(type,info){

		var elem;

		if ( type == 'type1' ){

			elem = document.createElement('li');
			$(elem).append(''
			+'<a href="http://item2.gmarket.co.kr/Item/DetailView/Item.aspx?goodscode='+info.pGoods+'" target="_blank">'
			+'	<span class="sd_img"><img src="'+this.genImgUrl(info.pGoods)+'" alt="'+info.pEventItemName+'"></span>'
			+'	<span class="sd_title">'
			+'	<strong class="subject">'+info.pEventItemName+'</strong>'
			+'	</span>'
			+'	<span class="sd_icons">'
			+'		<span class="icons4">무료배송</span>'
			+'	</span>'
			+'	<span class="sd_money">'
			+'		<span class="sd_icons">'
			+'			<strong class="icon_precent">'+this.salePercent(info.pEventPrice,info.pDiscountPrice)+'<em>%</em></strong>'
			+'		</span>'
			+'		<span class="sd_money_sale">'
			+'			<del>'+this.genPrice(info.pDiscountPrice)+'</del>'
			+'			<strong>'+this.genPrice(info.pEventPrice)+'</strong>'
			+'		</span>'
			+'	</span>'
			+'</a>');

			// 무료배송 여부 판단
			if ( info.pEventDelivery != '무료' ){
				$(elem).find(".icons4").remove();
			}

			// 할인율이 있는지 여부 판단
			if ( info.pEventPrice == info.pDiscountPrice ){
				$(elem).find(".sd_money_sale del").html("");
				$(elem).find(".sd_money .icon_precent").remove();
			}

		}else{

			console.debug(' Type is Not Found ');

		}

		return elem;

	},
	execute : function(elem){

		var $this = this;

		$(self._resData).each(function(e){			

			$(elem).find(self._reqData.target).append( $this.designType( self._reqData.design, self._resData[e] ) );

		});

	}

}