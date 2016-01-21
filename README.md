# Gmkt.Ajax.Loader
https://github.com/WangKooN/Gmkt.Ajax.Loader/

## Summary
- 상품코드를 통해 판매상품의 정보를 가져올 수 있습니다.
- 이벤트 상품관리 코드를 통해 그룹내 진열된 상품의 정보를 가져올 수 있습니다.

## Upates

- Version 0.1.160118 : 플러그인 Github 공개


## Usage


#### Step1. index.html `<head></head>` 추가
```html

<!-- Library :: 라이브러리 -->
<script type="text/javascript" src="lib/jquery-1.9.1.min.js"></script>
<!-- Request :: 전달할 데이터 (상품코드 / 이벤트상품관리 코드) -->
<script type="text/javascript" src="js/loader_data.js"></script>
<!-- Plug-in :: 플러그인 -->
<script type="text/javascript" src="js/Gmkt.ajax.loader.js"></script>

```


#### Step2. 상품번호 또는 이벤트 상품관리 코드를 넘겨줄 데이터 작성
- 상품코드를 통한 정보 받기
```javascript
{
	"type" : "GMARKET_GOODS",	// 타입선택 (상품)
	"target" : ".item_list1",	// Wrapper 클래스
	"design" : "type1", 		// 디자인 선택
	"goods" : [
		{
			"pGoods" : 760411039,	// 상품번호 (필수)
			"pItemName" : "",	// 상품명 (선택)
			"pImgLoc" : ""		// 상품이미지경로 (선택)
		},{
			"pGoods" : 668830827,
			"pItemName" : "",
			"pImgLoc" : ""
		}
	]
}

```

- 그룹코드를 통한 정보 받기
```javascript

{
	"type" : "GMARKET_EVENT"	// 타입선택
	"target" : ".item_list2",	// Wrapper 클래스
	"design" : "type1",		// 디자인 선택
	"goods" : "13447"		// 그룹코드
}

```

#### Step3. 플러그인 호출
```javascript

$(document).ready(function(){

	$("#p_wrapper").show().GmktAjaxLoader({
		reqData : gmktGoodsReqData,	// 상품번호(그룹코드)를 담은 변수명
		dataType : 'jsonp'		// Ajax로 받아올 데이터 타입명 ( jsonp / json / xml )
	});	

});

```

## Demos

- http://event.gmarket.co.kr/html/201601/00_brand/plugin/index.html

