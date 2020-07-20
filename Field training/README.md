# 1. HTML -> PDF
## 첫 번째 방법
: HTML -> CANVAS -> PDF\
: 화질이 좋지 않음.
### HTML2CANVAS
: https://html2canvas.hertzen.com/documentation

### JSPDF
: https://rawgit.com/MrRio/jsPDF/master/docs/jsPDF.html

## 두 번째 방법 (Increase the quality of the image)
: .from() -> .toContainer() -> .toCanvas() -> .toImg() -> .toPdf() -> .save()\
: 화질 개선 가능.\
: scale: 2로 해주고 jpeg로 저장하고 1.0 품질로 높이기\
### 문제점
: ~~but dom 단위라서 바뀐 것들이 나오지 않음.~~\
~~=> 큰일남.~~\
: dom 단위라서 안나오는게 아니라 자바스크립트 구동 방법(?) 때문에\
: 투명으로 만들고 나서 다시 돌아오는 부분이 저장하는 것보다 더 빨리 되기 때문에 생기는 문제.
### 해결방법
: querySelector로 밑에 친구들도 다 받아오게 만들고\
: setTimeout으로 지연시간을 넣어주어서 다운 받고 나서 확인 후 다시 돌아왔을 때 그대로인 것 처럼 보여주기.

### HTML2PDF
: https://www.npmjs.com/package/html2pdf.js#image-type-and-quality

# 2. 비밀번호 조건 달기
: 정규표현식과 .length를 이용해서 조건을 달 수 있다.
- 숫자와 문자를 포함해서 만들어라.
``` js
var pattern1 = /[0-9]/;
var pattern2 = /[a-zA-Z]/;
```
- 비밀번호는 8자리 이상.
``` js
if(!pattern1.test(pw)||!pattern2.test(pw)||pw.length<8||pwlength>50){
    alert("영문+숫자 8자리 이상으로 구성하여야 합니다.");
    return false;
}   
```

# 3. STS 환경 설정
### 문제점
: 메인 페이지에서 다른 페이지로 넘어가지않음.\
=> Tomcat의 문제일 것으로 추측중.
### 시도(1)
: 새로운 workspace를 만들었다.\
: 하지만, 설정을 저번에 내가 하지 않아서 하는 방법을 모른다...\
```
1. workspace 생성(경로 설정 후 launch)
2. fix automatically
3. import projects from file system or archive
4. create new server
	a. apache>tomcat v.8.0
	b. tomcat installation directory: apache-tomcat-8.0.30
	c. resource add all
5. edit server.xml
	<Context docBase="EcoProductionManagerWeb_ITP" path="" reloadable="true" source="org.eclipse.jst.jee.server:EcoProductionManagerWeb_ITP"/>
      <Context crossContext="true" debug="0" docBase="C:/EcoPM_Server/upload/signature" path="/signature" privileged="true" reloadable="true"/>

6. (project file)>Maven>Update project
7. (project file)>run as>Maven Install
8. server clean
```
: 하는 방법 보내주셨는데.. 해도 안된다...... 사실 5번이 안되는데 이거 안했던 것 같음.\
: 서버 연결하고 데베 연결을 해야하는데.....\
=> 미친 이거 쓰면서 데베 연결안되서 지금 오류 나는거같은데 도랏네\
=> 아 아닌가....\
__결론 : HTTP 404 에러 나면서 안되는 중... 살려줘......__
