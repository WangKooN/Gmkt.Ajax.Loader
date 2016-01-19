# Gmkt.Ajax.Loader v0.1.160118
https://github.com/WangKooN/Gmkt.Ajax.Loader/

## Summary
- 상품코드를 통해 판매상품의 정보를 가져올 수 있습니다.
- 이벤트 상품관리 코드를 통해 그룹내 진열된 상품의 정보를 가져올 수 있습니다.
- 디자인을 원하는 대로 입힐 수 있습니다.
- 웹 / 모바일 모두 사용 가능합니다.

## Upates

## Using

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
```java
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
```java

{
	"type" : "GMARKET_EVENT"	// 타입선택
	"target" : ".item_list2",	// Wrapper 클래스
	"design" : "type1",		// 디자인 선택
	"goods" : "13447"		// 그룹코드
}

```

## Demos



