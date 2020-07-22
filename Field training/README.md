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

### 해결완료
: clone을 받았는데 .gitignore이 있다는건..... 내가 다 안받았다는거...\
=> 그러니까 오류가 나지...\
~~=> 예전 파일 어디갔는지 모르겠음....ㅠ~~\
~~=> USB로 아예 파일 통으로 받자!~~\
~~__다들 너무 열정적으로 일하셔서 못물어보겠다..ㅠㅠㅠㅠㅠ__~~

: 진짜 어이없는데 갑자기 되더라 왜되는거지......\
: 너무 억울해요 안되서 계속 못하고 있었는데..................

# 4. git merge 충돌
: git에 올리려고 했는데 예전에 멋사에서 git으로 협업할 때 충돌때문에 데인적이 있어서 merge하는게 너무 두려웠다..\
: 하지만 clone 받아도 환경설정을 따로 해줘야했는데 그 부분이 익숙하지 않아서(STS 싫어 VSCODE 좋아) 그냥 해보기로 했다..\
: git add 와 commit을 하고 pull을 받는데 merge 충돌이 일어났다.\
: 예전에 충돌난거 고쳐주신게 생각나서 vscode로 충돌된 부분을 찾아서 수정해주었더니 해결 ><!!

# 5. 서버가 죽었다.....
: 왜 그래...?\
: 같은 데베를 쓰는 다른 컴퓨터들은 멀쩡했다...\
: 저번에 이 오류때문에 낑낑대서 이번에는 그냥 여쭤봤다.\
=> .dll이라는 파일이 달라서 오류가 났던 것.
> <a link="https://goddaehee.tistory.com/185">dll이란?</a>

=> usb로 다른 분 dll을 넣어주니까 해결!
> 영어 공부 해야겠다........^^ 구글링 뭐라는지 모르게따.
```
#
# A fatal error has been detected by the Java Runtime Environment:
#
#  EXCEPTION_UNCAUGHT_CXX_EXCEPTION (0xe06d7363) at pc=0x764cc5af, pid=4796, tid=0x00001a10
#
# JRE version: OpenJDK Runtime Environment (8.0_252-b09) (build 1.8.0_252-b09)
# Java VM: OpenJDK Server VM (25.252-b09 mixed mode windows-x86 )
# Problematic frame:
# C  [KERNELBASE.dll+0xc5af]
#
# Failed to write core dump. Minidumps are not enabled by default on client versions of Windows
#
# An error report file with more information is saved as:
# C:\Users\Administrator\Desktop\a\sts-3.9.3.RELEASE\hs_err_pid4796.log
#
# If you would like to submit a bug report, please visit:
#   http://bugreport.java.com/bugreport/crash.jsp
# The crash happened outside the Java Virtual Machine in native code.
# See problematic frame for where to report the bug.
#
```
> 난 jsp가 싫다. django랑 node.js가 짱이다. 꽃이 지고야 봄인줄 알았읍니다..^^

# 6. textarea 등 여러가지 input들 투명화
: 두 달동안 pdf한다고 생각하랬는데 진짜였따 ....^^ 아무도 알려주지 않는다! 혼자서 해내보자!!!!!!!
> 성장하는 내가 있길... D-38
----
## 는 무슨 너무 힘들다.
: 잘해낼 줄 알았고 잘할거라고 생각했다. 그리고 그렇게까지 힘들지 않을 것이라 생각했다.\
: 그런데 아니었다. 자바스크립트 공부안한지도 좀 된 상황에서 코드를 보기에는 역시 어려움이 있었다.\
: 그래서 따로 자바스크립트 공부를 하면서 조금이나마 더 잘보고자 했다.\
=> 하지만 나는 바닐라js와 react 조금 정도 밖에 안해봤고.. jquery는 아예 찾아보지도 한 번도 본적없었다.

### 그런데 코드가 jquery로 적혀있고.. 어이쿠 java spring이네?
: 난 자바를 싫어한다. 학교 수업때 진짜 열심히했는데 성적을 너무 좋지 않게 받기도 했고, 난잡한게 싫었다.\
: 그런데 spring에 jquery인 코드를 보고 이해해야한다니.......\
: 거기다가 여러명이서 짠 코드면 더 멘붕이다.\
: 처음으로 남의 코드 분석을 시도해보았는데, 당연히 잘 안되고 모르겠다.\
: 그러면 질문을 해!! 하겠지?\
=> 그런데 질문하는게 두렵고 은근하게 부담을 줬던 말이 생각난다.\
__=> 구글에 다나오는데.. 이런말 ㅈㅔ일 듣기 싫다.__

### 거기다가 거의 3주째 같은 것만 계속한다면?
: 진짜 토나올거같다.\
=> 못하겠다고 몇 번 어필했지만 한 번 맡긴 일은 거의 안바꿔주신다고 하셨다. (다른 분 말로는)\
: 그래도 저번주에 요청하셨던 사항을 해내서 기분이 좋았고 심지어 다른 일도 했다.\
: 드디어 끝나나했는데.....\
: 그 모달 창 뿐만 아니라 다른 모달 창에도 모두 그 기능을 넣어야한다고 하셨고, 설상 가상으로 신경 안쓰고 있던 투명화에서 막혔다.
### 코드 이렇게 짜는거 아닌데..^^
: 솔직히 코드 분석을 못하겠어서 대충 이렇게 하면 되겠지? 하면서 했었는데 투명화 작업이 된거라 별 생각을 안했다.\
: 그런데 내 코드를 보셨다면서 그렇게 짜면 안된다고 하셨다.\
=> 그러면 어떻게 짜나요?\
```"일단 이렇게 짜면 안되고 찾아보세요."```
> 힌트라도 좀 주시지

### 그 기능은 내 담당이었니..?
: 거기다가 나는 그 기능 정도만 찾아서 넣으면 나머지는 다른 분들이 마무리 하는 줄 알았는데 그냥 그 기능 관련은 전부 내가 하는 것이었다.\

__확실히 학교랑 너무 다르다.__

: 학교에서는 그 과제만 하면 끝나는데, 여긴 피드백도 있고 확장시켜서 다른 부분에도 적용시켜야한다.\
: 처음에 못하겠으면 안해도 된다고 부담갖지말라고 하셔서 좀 편하게 하고 있었는데 지금은 부담스러워서 속이 답답하다.

### 힘의 차이가 느껴지십니까?
: 난 개발자로서의 머리는 있는 것이며, 나름 재밌다고 생각했던건 맞을까.\
: 이 길이 내 길이 아닌 것 같다는 생각까지 들었다.
> 벽 너무 세게 느끼는 중...

: 솔직히 나는 여기 인턴으로 온게 아니라 실습생으로, 엄연히 학생으로 온거라서 이렇게 큰 부담을 안고 온것이 아니었다.\
=> 지금은 다 때려치고 어디로 도피하고 싶다.\
__이러다가 영영 개발이 하기 싫어질까봐 무섭다.__

### 될 거 같은데 안되는거면 하겠는데...
: 그냥 계속봐도 못 할거 같고 못 해낼거 같다.\
: 못해먹겠다. 의욕도 없다. 정신나갈거같다.\
: 너무 스트레스 받는다. 나도 잘하고싶은데 못하겠다니깐..\
: 물어보기도 무섭다. 너무 바빠서 물어봐도 잘 못알려준다고 했던게 계속 생각나고, 구글에 치면 다 나오는데 이런식으로 ... 나오면 난 어케해야하니?\
: 왜 두달했을까 한달만 했으면 담주면 끝인데 진짜....

### 내 생일... 내 하루 어디갔어?
: __심지어 생일에도 출근해서 8시간을 박혀있어야한다.__\
=> 이게 제일 싫다.

## 내 멘탈..............
<img src="https://pbs.twimg.com/media/CZd_Gi9UUAAf7b8.jpg">