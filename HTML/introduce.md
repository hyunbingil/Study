## HTML(Hyper Text Markup Language)이란?
#### 하이퍼 텍스트
: 하이퍼 링크를 이용해 독자가 원하는 순서에 따라 기존 문서에서 다른 문서로 접근할 수 있는 텍스트.
#### 마크업 언어
: 태그를 이용해 문서나 데이터의 구조를 명시하는 언어.
> 이름 : 이장준 에서 이름 같은 표시가 바로 마크업.

: <> 안에 각 텍스트가 무엇을 의미하는지 '마크업'되어 있는 것.

### HTML의 기초 구성
- 요소(Element)
``` html
: <시작태그>컨텐츠</종료태그>
```
- 태그(Tag)
: 컨텐츠가 어떤 역할을 수행해야 하는지 지정하고, 그 사용 영역을 구분하여 구조를 정의.

- 속성(Attributes)
: 태그의 특징, 필수 X.\
: 시작 태그의 <>사이에서 태그 이름 바로 뒤에 한 칸 공백을 가진 뒤 작성.
``` html
<a 키="값">컨텐츠</a>
```
> 태그에 대한 추가 정보의 모음
>> ex) <a>에서 키 : 링크 주소라는 종류, 값 : 실제 링크 주소

### 기본적인 HTML 문서 구조
: HTML 문서는 요소만으로 완성될 수 X.

1. ```<!DOCTYPE html>```\
: 문서 형식을 정의할 때 사용하는 문장.\
: HTML 문서라고 브라우저에 알려주는 역할.

2. ```<html lang="ko">```\
: 여기부터 본격적으로 HTML 문서가 시작.\
: 전체 HTML 문서를 감싸는 태그, 단 한 번 사용 가능.
> lang = "ko"는 이 페이지의 주 언어가 한국어라는 것.

### Head와 Body
: html 태그 안에는 크게 head 태그와 body 태그가 존재\
: 각 태그 안에 여러 가지 태그를 배치해 문서를 구성 O.
1. ```<head>``` 태그\
: HTML 문서에 대한 정보를 담고 있음\
: 일반 사용자는 웹사이트에서 이 태그에 속한 정보를 볼 수 X.\
: ```<html>``` 태그 바로 아래 위치.
- ```<meta>```\
: 문서와 관련된 정보를 담는 태그.\
> ```<meta charset = "utf-8">``` : HTML 문서에서 한글을 사용할 수 있음을 브라우저에 전달
- ```<title>```\
: 웹 페이지의 제목을 담는 태그

2. ```<body>``` 태그\
: HTML 문서 중 사용자에게 실제로 보여지는 부분.
: ```<html>``` 태그 안에서 ```<head>``` 태그 바로 아래 위치.
- ```<h1>```\
: 제목을 표시하는 태그\
: 1~6까지 있음.
- ```<p>```\
: 단락을 표시하는 태그\
__등등....! body안에 들어가는 태그는 정말 많음 !!!!__
> head와 body는 html 태그 내에서 딱 한 번만 사용

## body 태그 안에 들어가는 여러 가지 태그
### 시맨틱 태그(Semantic tag)
: 많이 선호하는 레이아웃을 아예 태그로 만들어 각 요소의 쓰임을 명확하게 구분하기 위해 만들어진 태그.\
: 의미를 가지는 태그로, 나눠진 구획의 기능을 태그 이름만으로도 이해할 수 O.
- ```<header>```\
: 웹페이지 혹은 ```<section>```의 소개나 제목을 담기 위해 사용하는 요소.
> ```<head>``` 태그와 혼동 X.
- ```<nav>```\
: 페이지 이동을 위한 메뉴를 주로 담음.
> 내비게이션 역할을 수행.
- ```<section>```\
: 기준에 따라 구획을 구분하기 위해 사용하는 요소.\
: 기준에 맞는 ```<article>```들을 담음.
- ```<article>```\
: 주 내용을 담기 위해 사용하는 요소
- ```<aside>```\
: 광고 또는 사이트의 주변 부분에 해당하는 내용을 담기 위해 사용하는 요소.
- ```<footer>```\
: 일반적으로 웹 사이트의 가장 아래에 들어가는 회사 정보나 사이트 정보 등의 추가 정보를 담기 위해 사용하는 요소.

### 제목, 내용 관련 태그
#### 제목과 본문 태그
1. 제목 태그
: ```<h1> ~ <h6>```까지 있음.
2. 본문 태그
- ```<p>```\
: paragraphs의 약자로, 단락 혹은 문단이라는 뜻.\
: 서로 이어지는 내용이라 생각하는 텍스트를 하나로 묶어 감싸면 단락으로 처리.
- ```<br>```\
: break의 약자로, 엔터(enter)와 동일한 역할\
: __줄바꿈__ 수행.
> 종료 태그 X. ~> 이런 요소를 빈 요소라고 부름.
- ```<pre>```\
: preformtted의 약자로, 형식화된 텍스트를 브라우저에 그래도 표시.
: __적은 내용 그대로 브라우저에 표시__
> 기억안나서 못쓰고 있었던 친구...
#### 나누기 위한 태그
- ```<div>```\
: division의 약자로 분할을 뜻함.\
: 아무것도 나타내지 않고 그저 __각각의 태그를 구분 짓기 위해 사용.__
> CSS를 이용해 레이아웃을 배치할 때 효과적으로 적용하기 위해, 묶어서 사용하기 위해 이 태그를 많이 사용한다.
#### 글자와 관련된 태그
1. ```<strong>``` / ```<em>```\
: 볼드체(굵게) / 이탤릭체(기울임꼴)
2. ```<sup>``` / ```<sub>```\
: 일반 위치보다 위로 / 아래로
> a^2 / log에 밑이 2인거..! 표현할때
3. ```<ins>``` / ```<del>```\
: 밑줄 / 취소선

### 링크 태그
#### ```<a>```\
: 하이퍼 링크 역할 수행.
``` html
<a 속성>컨텐츠</a>
<a 키="값">컨텐츠</a>
<a 주소="https://github.com/hyunbingil">컨텐츠</a>
```
- 키 : 링크 주소라는 종류
- 값 : 실제 링크 주소
> ```<a>``` 태그는 속성을 필수로 가짐.
#### ```<a>```의 속성
1. href(Hypertext Reference)
: ```<a>```가 참조하는 웹사이트 주소(경로)를 값으로 가짐.
``` html
<a href = "https://github.com/hyunbingil">깃허브</a>
```
> 주소와 경로가 합쳐진 URL이 입력되어야한다는 소리.
2. target
: 링크를 클릭했을 때 해당 페이지를 어디에서 열지 정하는 속성
- _self
: 현재 탭에서 링크를 연다. (바로 이동)
- _blank
: 새 탭에서 링크를 연다.
``` html
<a href = "https://github.com/hyunbingil" target = "_blank">깃허브</a>
```
##### URL(Uniform Resource Locator)
: 웹 사이트 주소(domain)와 경로(path)를 합친 것.\
: 인터넷에서 자원의 위치를 표현
> 자원? : HTML 페이지, CSS 문서, 이미지 등
- 절대 URL : 접근하는 최초 시작점(주소)부터 경유한 경로를 모두 기록해 리소스의 위치를 나타냄.
- 상대 URL : 현재 위치(기준점)를 기준으로 상대적인 경로를 기록해 리소스의 위치를 나타냄.
> 폴더 ./ 이거 있자나!!! 그거 맞아.. 너가 알고 있는 그거..

### 멀티미디어 관련 태그
#### 이미지 태그 ```<img>```
: 넣고자 하는 이미지에 대한 속성을 필히 작성해야 함.\
: 종료 태그 작성 X.
``` html
<img src="이미지 URL" alt="이미지 대체 문구"/>
```
- src 속성
: source의 약자로 근원.\
: 불러올 이미지의 파일 경로 또는 URL을 속성값으로 가짐.
- alt 속성
: Alternative text의 약자로 대체 문구라는 뜻.\
: 이미지 대신 표시할 문구를 값으로 가짐
> 이미지가 정상 출력 X or 이미지 파일 존재 X 경우 대비.
- width, height 속성
: 이미지의 너비나 높이 지정하는 속성
``` html
<img src="이미지 URL" alt="이사진이뭘까?" width="430px" height="320px"/>
```
> 권장사항 X. CSS로 조정하는게 낫소!

#### 오디오 태그 ```<audio>```
: 오디오 파일이 저장된 경로를 src 값으로 설정하면, 웹 페이지에 해당 오디오 파일을 재생하는 플레이어가 추가된다.
``` html
<audio controls>
	<source src="assets/audio/태양의마테차.mp3" type="audio/mpeg">
</audio>
```

#### 비디오 태그 ```<video>```
: 비디오 파일이 저장된 경로를 src 값으로 설정하면, 해당 비디오 파일을 재생할 수 있는 플레이어가 웹 페이지에 추가된다.
``` html
 <video controls>
	 <source src="assets/video/XX.mp4" type="video/mp4">
</video>
```
> height와 width 속성 지정 가능 (audio는 불가능)

#### 참고) 유튜브 영상 삽입
1. 방법 1
공유 눌리고 공유창 뜨면 <> 퍼가기 클릭.
2. 방법 2
유튜브 링크 복사 후
``` html
<iframe src = "https://www.youtube.com/watch?v=fN-YPbbGUoE"></iframe>
```
> 이거는 다른 곳에서도 가져올 수 있어요...

### 입력 양식 태그
: 값을 입력할 수 있는 공간을 마련하는 양식 태그
### 입력 양식 (form)
: 질문, 선택사항, 답변 작성 공간 등이 배치된다.
> 다양한 input form이 들어간다.
#### form 태그 속성
1. action
: 데이터를 보낼 URL을 지정.
> 해당 데이터를 처리할 웹 서버 URL을 값으로 가짐.
2. method
: 보내는 방식(GET/POST) 지정
> 사용자가 서버로 데이터를 전송할 때 데이터를 HTTP Request Message라는 정해진 메세지에 담겨 보내는데, Header/Body 두 부분으로 나뉜다.
>> Header : 데이터의 목적지가 되는 서버의 URL
- GET
: 사용자가 입력한 데이터를 서버URL 말미에 이어 붙여 __숨김 없이 보냄.__
> 주소와 데이터를 한 페이지에 보이도록 붙이는 것.
>> 주소 + 데이터
>>> 엽서 카드

: 서버에 데이터를 요청하고 데이터를 받아오는 역할 수행.
> 데이터 조회를 목적으로 할 때 사용.
>> 쉽게 전달, 즐겨찾기 가능.
- POST : 데이터를 URL 끝에 붙이지 않고 데이터의 내용을 메세지의 __Body 부분에 숨겨보냄.__
> 편지봉투에 밀봉된 편지지

: 서버에 있는 데이터를 쓰거나 수정, 삭제할 때 사용.
> 로그인이나 게시물 작성, 회원가입 등 데이터에 대한 보안이 필요한 경우 POST 방식 사용.

#### input 태그
: 사용자에게 입력을 받기 위해 사용\
: 빈 태그 (종료 태그 사용 X.)
> 텍스트, 제출 버튼, 파일 업로드, 날짜 등 매우 다양한 값 입력 가능.
#### input 태그 속성 (type)
1. text, email, password
``` html
<input type = "text" name = "myname">
<input type = "email" name = "email">
<input type = "password" name = "pw">
```
2. button, checkbox, search, file, radio
``` html
<input type="button" value="Button">
<input type="search" name="search">
<input type="checkbox" name="python" value="python" checked>Python<br>
<input type="checkbox" name="javascript" value="javascript">Javascript<br>
<input type="file" name="myfile">
<input type="radio" name="gender" value="male" checked> 남자<br>
<input type="radio" name="gender" value="female"> 여자<br>
```
3. color, date, number, range, reset, time,
``` html
<h3>color</h3>
<input type="color" name="color">
<hr>

<h3>date</h3>
<input type="date" name="birthday">
<hr>

<h3>number</h3>
<input type="number" name="quantity" min="1" max="10" step="1" value="1">
<hr>

<h3>range</h3>
<input type="range" name="points" min="0" max="10" step="1" value="5">
<hr>

<h3>reset</h3>
<input type="reset">
<hr>

<h3>time</h3>
<input type="time" name="mytime">
<hr>
```
#### input 태그 속성 (name)
: __입력 받은 데이터를 구분하기 위해__ name 속성을 키(key)로, 입력 받은 데이터를 값(value)로 전송.

#### input 태그 속성(placeholder)
: 가이드 문구 지정\
: 입력 칸 안에 나타나며, 입력 칸 클릭해 값 입력 시 사라짐.
``` html
<h3>회원가입</h3>
<form action="my-app" method="get">
	<input type="text" name="id" placeholder="아이디를 입력하세요.">
</form>
```
> value라는 속성도 있는데, 말 그대로 값을 할당하는 속성이라서 칸을 클릭해도 값이 남아있음.
>> value로 설정해 준 값이 초기값으로 들어가게 되는 것.

#### ```<label>``` 태그
: <input>태그의 id 속성과 함께 입력 양식의 역할이 무엇인지 알려주는 이름표 역할을 수행함.
##### for 속성
: for 속성 값으로 <input> 태그의 id 속성 값을 입력함.
``` html
<label for = "userid">아이디: </label>
<input type = "text" id = "userid" name = "id">
```
> label 태그에 해당하는 이름표 클릭시 입력 칸 활성화.
>> div를 이용해서 예를 들면 아이디랑 비밀번호 칸 나눠주면 깔끔 ^.^

#### select 태그
