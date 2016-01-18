
$(document).ready(function(){

	// 
	$("#p_wrapper").show().gmktGoodsInfoLoad({
		reqData : gmktGoodsReqData,
		dataType : 'jsonp'
	});	

})

$.fn.gmktGoodsInfoLoad = function(options) {
	var elements = this;
	var settings = {
		reqData : null,
		dataType : 'jsonp'
	};

	// Generate URL + Query
	var genQuery = function(data){
		
		var result; // Query for Return Value
		var array; // Goodscode

		if ( data.type == 'GMARKET_GOODS' ){

			result = "http://m.gmarket.co.kr/Event/2014/01/0106_specialprice/data.asp?type=searchJson&goodscode=";
			array = data.goods;			

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
						
						jsonData.setUrl( genQuery(settings.reqData[nowTimes]) , "info");

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

		//console.log(loadedData);
		$(loadedData).each(function(e){

			console.debug( $(this)[0].event );

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
            self.dataLoadComplete(self._data)
        }
    });
};

//override
Jsonload.prototype.dataLoadComplete = function(data){};







// function gmkGoodsInfo(){

// }

// Prototype :: Gmarket Goods Info Load
var gmkGoodsInfo = function(array,target){    

    // @@ val : 'GMARKET_GOODS' = 상품 번호로 정보 가져오기
    // @@ val : 'GMARKET_EVENT' = 이벤트상품관리 상품정보 가져오기    
    loadType = 'GMARKET_GOODS';

    // Input Data
    inputData = function(){
        console.log(array);
    }

    // Target DOM    
    targetPos = function(){
        console.log(target);
    }

    // Generate URL + Query
    genQuery = function(){

        var result;
        
        if ( loadType == 'GMARKET_GOODS' ){

            result = "http://m.gmarket.co.kr/Event/2014/01/0106_specialprice/data.asp?type=searchJson&goodscode=";
            
            for ( var i = 0 ; i < array.length ; i++ ){
                ( i === 0 ) ? result += array[i].goodscode : result += "," + array[i].goodscode;
            }   

        }else if( loadType == 'GMARKET_EVENT' ){

            result = "http://event.gmarket.co.kr/html/201401/140102_newYear_sub/newYear_sub1.asp?group_no="+array;

        }else{

            result = "http://m.gmarket.co.kr/Event/2014/01/0106_specialprice/data.asp?type=searchJson&goodscode=000000000";

        }

        return result;        

    }

    // Fnc :: Image URL Generator
    genImgUrl = function(data){

        return "http://gdimg.gmarket.co.kr/goods_image2/shop_img/"+data.substr(0,3)+"/"+data.substr(3,3)+"/"+data+".jpg";

    }

    // Fnc :: Discount Rate Calculation
    salePercent = function(val,val2){

        var result;

        ( val !== val2 ) ? result = ( 1 -(val / val2) ) * 100 : result = 0;
        
        return parseInt(result,10);

    }

    // Goods Info Design Set
    releaseMarkup = function(data,idx){

        reg = /(\d)(?=(?:\d{3})+(?!\d))/g; // regular expression

        $loc = $(target);

        $loc.append(''
        +'<li>'
        +'    <a href="http://item2.gmarket.co.kr/Item/DetailView/Item.aspx?goodscode='+data.pGoods+'" target="_blank">'
        +'        <span class="sd_img"><img src="'+this.genImgUrl(data.pGoods)+'" alt="'+data.pEventItemName+'"></span>'
        +'        <span class="sd_title">'
        +'        <strong class="subject">'+data.pEventItemName+'</strong>'
        +'        </span>'
        +'        <span class="sd_icons">'
        +'            <span class="icons4">무료배송</span>'
        +'        </span>'
        +'        <span class="sd_money">'
        +'            <span class="sd_icons">'
        +'                <strong class="icon_precent">'+this.salePercent(data.pEventPrice,data.pDiscountPrice)+'<em>%</em></strong>'
        +'            </span>'
        +'            <span class="sd_money_sale">'
        +'                <del>'+data.pDiscountPrice.replace(reg, '$1,')+'</del>'
        +'                <strong>'+data.pEventPrice.replace(reg, '$1,')+'</strong>'
        +'            </span>'
        +'        </span>'
        +'    </a>'
        +'</li>');

        $this_list = $loc.find("li").eq(idx);

        if ( $this.pEventDelivery != '무료' ){
            $this_list.find(".icons4").remove();
        }

        if ( $this.pEventPrice == $this.pDiscountPrice ){
            $this_list.find(".sd_money_sale del").html("");
            $this_list.find(".sd_money .icon_precent").remove();
        }

    }

    // ajax Data Load
    this.load = function(){

    }

}

