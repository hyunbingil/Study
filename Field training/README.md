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

=> usb로 다른 dll을 넣어주니까 해결!
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
> django랑 node.js가 짱이다. 꽃이 지고야 봄인줄 알았읍니다..^^

# 6. textarea 등 여러가지 input들 투명화
## 2020.07.21
: 두 달동안 pdf한다고 생각하랬는데 진짜였따 ....^^ 아무도 알려주지 않는다! 혼자서 해내보자!!!!!!!
> 성장하는 내가 있길... D-38
## 2020.07.22
: 현타 온 하루에 적은 글을 바로 삭제 . . .\
: 치킨먹고 위로받으니까 기분 괜찮아진거 실화냐ㅠ
> 기록은 남아는 있겠지만 ㅎㅎ..

<img src="https://pbs.twimg.com/media/CZd_Gi9UUAAf7b8.jpg">

## 2020.07.23
: 다시 마음을 고쳐먹고 제대로 빡집중해서 pdf랑 싸워보기로 했다.\
: 코드 분석을 하다가 모르는 부분을 여쭤보니 이때까지 막혔던 부분들이 뚫렸다..
> 역시 물어봐야해...

1. id 값들을 이용해서 투명화를 시켜보자.\
: id 값들이 여러가지가 순서대로 들어가는데 거기에 규칙이 있지 않을까 하면서 하나씩 찾아보았다.\
: 대충 같은 애들끼리는 같이 묶여있고 이런식으로 되어있었는데, 하나하나 넣어주기에는 무리가 있었다.\
: 그래서 찾아본 후손까지 싸그리 지정하는 방법...\
: 후손까지 가기가 힘들어서 react로 어떻게 해주면 된다고 했던게 기억나서 jquery에도 있나 싶어 찾아보니까 있었다.\
``` js
$('div#1190 *').css({'background-color':'transparent', 'border' : '0px',});
$('div#1191 *').css({'background-color':'transparent', 'border' : '0px',});
$('div#1192 *').css({'background-color':'transparent', 'border' : '0px',});
$('div#1193 *').css({'background-color':'transparent', 'border' : '0px',});
```
2. 역시 나만 생각못해 . . .\
: id로 묶으면 저런식으로 하나하나 다 찾아줘야한다는 번거로움이 생긴다.\
: 심지어 저렇게 아이디 지정해주는데에는 규칙은 없고 그냥 +1씩 된다는 사실..\
: 그래서 사수님께서 그럼 그냥 그 전체를 묶은 div id 가져와서 후손들 선택하면 되지 않냐고 하셨다......
``` js
$('div#itpFormList *').css({'background-color':'transparent', 'border' : '0px',});
```
> 네줄이 한줄로 바뀌는 매직...
>> 진짜 왜 생각을 못했을까..

### 하지만 여기서 끝이 아니였다... pdf로 넘어가면 비율이 안맞아서 배경과 input 버튼들이 크기가 맞지 않았다.
### +) 내일까지 마무리해야한다...... 처음으로 마감일이 생겼다... 할 수 이써!!!!
## 2020.07.24
__역시 세상에는 해낼 수 없는 일이 없는 걸까.__\
: ....해냈다.......... ㄴ눈물이 날거같다.......\
: 수학 문제 어려운거 풀고나면 그 짜릿함 한 번도 느껴본적없는데... 그게 이거였군..
1. 왜 저번에 했던 방법은 잘되고 이번 방법은 안되는가?\
: 저번 방법은 선택한 dom 부분을 canvas로 전체를 통으로 옮기고 사진 자체에서 pdf로 옮겼기 때문에 자식들이 통으로 묶여있었다.\
__=> 하지만 이번에 사용한 방식은 통으로 가져오는게 아니라 각각을 가져오는 것이었다.__\
2. 비율의 문제\
: 사진만 a4사이즈에 맞춰서 바뀌고 나머지 textarea나 radio 버튼들은 원래 비율 그대로 남아있어서 깨지는 것!\
: 비율을 바꿔주니 성공!!!!!!!

# 7. print 버튼 수정 및 투명 수정
: 비율 때문에 2장 생겨서 마지막장이 아무것도 없이 계속 포함된다.\
=> 문제 해결 필요
## 1) Print 버튼 위치
: 임의로 버튼을 넣어둬서 버튼 위치가 certi부분과 rfi 부분이 달랐다.
### 해결방법
: button 위치를 바꿔서 넣어주면 해결된다.
## 2) Print 버튼 Print 하는 부분에만 보이기
: Print 버튼이 paper view 부분 말고도 modal footer 부분에 계속 보이는 것 수정하기.
### 해결방법
: 메뉴의 text가 FIN일 때를 제외하고 나머지는 .hide()로 ```display: none;``` 해주었다.\
: 또한 FIN 메뉴에서도 mobile view 와 paper view 중에서 paper view에서만 보여야했는데, 이 부분은 click 이벤트를 이용해서 .hide(), .show() 해주었다.
## 3) Print 하고 나서 투명화 없애고 다시 되돌리기
: 투명화하고 나서 창을 닫고 다시 들어가면 원래상태지만, 프린트 후에도 다시 원래 상태로 돌아가게 만들라고 하셨다.
### 해결방법
: css 요소 안에다가 ```''```라고 넣어주면 되돌아감.\
: setTimeout 안해주면 함수가 먼저 실행되서 pdf 저장 시에도 문제가 생겼다. 그래서 pdf 저장 후 2초정도 delay를 주었다.
``` js
setTimeout(function() {
	    	$('div#itpFormList *').css({'background-color':'', 'border' : '',});
	    }, 2000);
```
## 4) PDF 페이지 1개 추가되는 문제
: 해결 못하는 중.. 1개로 만들면 또 비율이 안맞아서 깨지고 비율 맞추면 1개가 추가되는게 강제로 된다.\
=> deletePage()가 있는데 이게 html2pdf에서는 안먹는거같음.\
==> 찾아보는중 ....... html2pdf와 jspdf 코드 분석중인데 어렵다 ㅠ

# 8. 서버가 열리지않는 현상 발생
: pull 받고 나서 왜......... 열리지 않는 거냐
```
8월 05, 2020 1:07:44 오후 org.apache.catalina.core.StandardContext listenerStart
심각: Exception sending context initialized event to listener instance of class org.springframework.web.context.ContextLoaderListener
org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'commonController': Injection of autowired dependencies failed; nested exception is org.springframework.beans.factory.BeanCreationException: Could not autowire field: private org.springframework.mail.javamail.JavaMailSender com.epr.common.controller.CommonController.javaMailSender; nested exception is org.springframework.beans.factory.NoSuchBeanDefinitionException: No qualifying bean of type [org.springframework.mail.javamail.JavaMailSender] found for dependency: expected at least 1 bean which qualifies as autowire candidate for this dependency. Dependency annotations: {@org.springframework.beans.factory.annotation.Autowired(required=true)}
	at org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor.postProcessPropertyValues(AutowiredAnnotationBeanPostProcessor.java:334)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.populateBean(AbstractAutowireCapableBeanFactory.java:1214)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:543)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:482)
	at org.springframework.beans.factory.support.AbstractBeanFactory$1.getObject(AbstractBeanFactory.java:306)
	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:230)
	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:302)
	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:197)
	at org.springframework.beans.factory.support.DefaultListableBeanFactory.preInstantiateSingletons(DefaultListableBeanFactory.java:772)
	at org.springframework.context.support.AbstractApplicationContext.finishBeanFactoryInitialization(AbstractApplicationContext.java:839)
	at org.springframework.context.support.AbstractApplicationContext.refresh(AbstractApplicationContext.java:538)
	at org.springframework.web.context.ContextLoader.configureAndRefreshWebApplicationContext(ContextLoader.java:444)
	at org.springframework.web.context.ContextLoader.initWebApplicationContext(ContextLoader.java:326)
	at org.springframework.web.context.ContextLoaderListener.contextInitialized(ContextLoaderListener.java:107)
	at org.apache.catalina.core.StandardContext.listenerStart(StandardContext.java:4812)
	at org.apache.catalina.core.StandardContext.startInternal(StandardContext.java:5255)
	at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:150)
	at org.apache.catalina.core.ContainerBase$StartChild.call(ContainerBase.java:1408)
	at org.apache.catalina.core.ContainerBase$StartChild.call(ContainerBase.java:1398)
	at java.util.concurrent.FutureTask.run(FutureTask.java:266)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)
	at java.lang.Thread.run(Thread.java:748)
Caused by: org.springframework.beans.factory.BeanCreationException: Could not autowire field: private org.springframework.mail.javamail.JavaMailSender com.epr.common.controller.CommonController.javaMailSender; nested exception is org.springframework.beans.factory.NoSuchBeanDefinitionException: No qualifying bean of type [org.springframework.mail.javamail.JavaMailSender] found for dependency: expected at least 1 bean which qualifies as autowire candidate for this dependency. Dependency annotations: {@org.springframework.beans.factory.annotation.Autowired(required=true)}
	at org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor$AutowiredFieldElement.inject(AutowiredAnnotationBeanPostProcessor.java:573)
	at org.springframework.beans.factory.annotation.InjectionMetadata.inject(InjectionMetadata.java:88)
	at org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor.postProcessPropertyValues(AutowiredAnnotationBeanPostProcessor.java:331)
	... 22 more
Caused by: org.springframework.beans.factory.NoSuchBeanDefinitionException: No qualifying bean of type [org.springframework.mail.javamail.JavaMailSender] found for dependency: expected at least 1 bean which qualifies as autowire candidate for this dependency. Dependency annotations: {@org.springframework.beans.factory.annotation.Autowired(required=true)}
	at org.springframework.beans.factory.support.DefaultListableBeanFactory.raiseNoSuchBeanDefinitionException(DefaultListableBeanFactory.java:1373)
	at org.springframework.beans.factory.support.DefaultListableBeanFactory.doResolveDependency(DefaultListableBeanFactory.java:1119)
	at org.springframework.beans.factory.support.DefaultListableBeanFactory.resolveDependency(DefaultListableBeanFactory.java:1014)
	at org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor$AutowiredFieldElement.inject(AutowiredAnnotationBeanPostProcessor.java:545)
	... 24 more

8월 05, 2020 1:07:44 오후 org.apache.catalina.core.StandardContext startInternal
심각: One or more listeners failed to start. Full details will be found in the appropriate container log file
8월 05, 2020 1:07:44 오후 org.apache.catalina.core.StandardContext startInternal
심각: Context [] startup failed due to previous errors
8월 05, 2020 1:07:44 오후 org.apache.catalina.core.ApplicationContext log
정보: Closing Spring root WebApplicationContext
8월 05, 2020 1:07:44 오후 org.apache.coyote.AbstractProtocol start
정보: Starting ProtocolHandler ["http-nio-8080"]
8월 05, 2020 1:07:44 오후 org.apache.coyote.AbstractProtocol start
정보: Starting ProtocolHandler ["ajp-nio-8009"]
8월 05, 2020 1:07:44 오후 org.apache.catalina.startup.Catalina start
정보: Server startup in 17445 ms

```

### 해결(?)
: pom.xml이나 아무튼 코드 중 하나가 pull 받으면서 깨진듯\
=> zip 파일로 통째로 받아서 다시 실행하니 됐다...