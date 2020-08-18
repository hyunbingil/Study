## 폰트 종류와 웹 폰트
### 폰트
: 폰트와 관련된 프로퍼티는 폰트 크기(font-size), 폰트 종류(font-family), 폰트 형태(font-style, font-weight)가 있다.
### font-family
: 원하는 폰트의 종류를 지정할 수 있다.\
: 한 단어로 구성된 폰트명은 따옴표 없이 사용이 가능.\
=> but 띄어쓰기나 하이픈이 들어갔을 경우 따옴표 사용하기
``` css
/* ✅ 올바른 한 단어 폰트 이름 */
font-family : Arial;
/* ✅ 올바른 한 단어 폰트 이름 */
font-family : 'Arial';

/* ❌ 잘못된 두 단어 이상 폰트 이름 */
font-family : Cute Font;
/* ✅ 올바른 두 단어 이상 폰트 이름 */
font-family : 'Cute Font';

/* ❌ 잘못된 하이픈(-)이 들어간 폰트 이름 */
font-family : Noto-sans;
/* ✅ 올바른 하이픈(-)이 들어간 폰트 이름 */
font-family : 'Noto-sans';
```

: 폰트 종류 정의 시 여러 개를 동시에 지정하는 경우가 많다.\
=> 모든 이용자 기기에 동일한 폰트가 없을 수도 있기 때문\
=> 앞 순서에 위치한 폰트부터 차례로 적용함.
> 보편적으로 사용하는 일반 글꼴은 Sans-serif, Serif, Cursive, Fantasy, Monospace 등이 있다.
``` css
/* Cute Font가 없는 경우 Arial 적용 */
font-family : 'Cute Font', Arial, cursive;
/*                 ❌       ✅          */
```
#### 웹 폰트(Web Font)
: 링크를 통해 폰트를 불러오는 방식이다.\
: 내 컴퓨터의 저장소가 아닌 다른 곳에서 손 쉽게 가져올 수 있다.
1. ```<link>``` 방식\
: HTML에 CSS 파일을 연결할 떄와 동일하게 ```<link>```태그 이용해 가져옴
2. ```@import``` 방식\
: CSS 파일에 ```<style>``` 태그를 제거하고 ```@import```를 바로 작성하거나, HTML 파일에 ```<style>``` 태그를 이용해 추가할 수 있다.
``` css
@import url('https://fonts.googleapis.com/css?family=Nanum+Pen+Script&display=swap');

h1, p {
	font-family: 'Nanum Pen Script', cursive;
}
```

### font-style
1. normal\
: 기본 값
2. italic\
: 기울인 스타일(이텔릭체가 디자인되어 있는 폰트에서 사용)
3. oblique\
: 기울인 스타일(이텔릭체 디자인이 없더라도 무조건 표현)
``` css
@import url('https://fonts.googleapis.com/css?family=Nanum+Pen+Script&display=swap');

h1, p {
	font-family: 'Nanum Pen Script', cursive;
}
h1{
	font-style: italic;
}
```

### font-weight
: 폰트 굵기를 지정할 때 사용
1. bold\
: normal은 400, bold는 700의 값을 가짐.
2. 100 단위의 숫자값 사용
``` css
/* 아래의 두 결과는 동일 */
font-weight: 400;
font-weight: normal;

/* 아래의 두 결과는 동일 */
font-weight: 700;
font-weight: bold;
```
- 하나하나 굳이 안해줘도 font를 사용해 순서대로 띄어쓰기 구분하여 작성하면 된다.
``` css
/* ✅ font: font-style font-weight size font-family */
font: italic bold 24px 'Nanum Pen Script', cursive;

/* ✅ font: size font-family */
font: 24px 'Nanum Pen Script', cursive;
```