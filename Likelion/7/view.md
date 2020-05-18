## Django 기본 셋팅
1. 프로젝트(집)를 시작해야하니까 가상환경(땅)을 만들자.
2. 가상환경안에 프로젝트를 만들어주고 startapp으로 우리가 해당 집에서 할 일을 채워넣어주자.
```
우리의 집이 쿠팡이 되었습니다. 쿠팡이 되었으니 settings.py에 installed APP에 신고 고고링.
```
3. 우리의 배송이라는 서비스(== 웹 서비스를 보여주는 것)를 하기 위해 상품(template)을 준비해야한다.
4. 상품(template)이 다 준비되었으면 운송장을 등록하고 어떤 방식으로 배송(views)을 할지 결정해야한다.
5. 상품의 배송준비가 완료되었으면, 주소지(URL)을 입력하고 사용자에게로 배송을 시작하자.

### 예시
- DB = 냉장고
- Model = 식자재(두고두고 쓰는 것.)
- View = 요리도구
- Template = 음식

## View
## 단어 계산기 만들기(Wordcount)
### 💌 index.html
``` html
<body>
<h1>메인페이지</h1>
<form method="GET" action="{%url 'result'%}">
<textarea name="target" cols="30" rows="20">    <!--cols 와 rows는 textarea 의 크기를 조정-->
<!-- 우리가 보내는 data에 이름표를 붙여준다(target) 그렇게 되면 나중에 request로 보내지는 data들 속에서 우리가 작성한 textarea의 text를 식별하고 꺼내올 수 있게 된다. -->
</textarea>
<input type="submit" value="세어줘요!">
</form>
</body>
```
### 1. method(GET VS POST)
: 폼 태그 속성 중 하나, 서버에 요청을 보낼 때 사용하는 방법들
``` html
<form method="GET" action="{%url 'result'%}">
```
#### GET
: 주소창 뒤에 검색한 내용이 온다.\
: 외부에 노출이 되므로 보안상으로 취약하고, 크기가 큰 data의 경우 GET 방식으로 요청 X.
- URL 입력상자에서 URL 입력시
- 하이퍼링크 클릭시
- 폼 데이터의 submit
> get의 경우 ?querystring 형태
#### POST
: 로그인, 외부로 노출되기 싫은 data를 전송할 때 사용.\
: 크기가 큰 data의 전송 등에 사용할 수 있다.
- 폼 데이터의 submit

### 2. action
: 우리가 form으로 보낸 data가 어디서 처리되었으면 좋겟는지 경로를 정해주는 것.\
: ```action="{%url 'result'%}```에서 ```result```라는 친구는, ```urls.py```에서 지어준 이름으로, 이것을 이용해 간단하게 사용이 가능하다.

### 3. Django의 템플릿 태그와 템플릿 변수
#### 템플릿 태그
: ```{% %}```, 장고에서 쓰이는 문법으로, HTML에서 사용하면 장고로 처리한다.
```html
<form action="{% url 'result' %}"> 
```
> action도 따옴표로 감싼 형태를 사용하고, url로 불러오는 애칭도 문자열이기 때문에 두 개의 따옴표를 사용해 구분해야한다.
#### 템플릿 변수
: ```{{ }}```, 장고에서 사용하는 변수로, HTML에서 사용하면 그냥 문자가 아닌 것으로 인식하면서 그 변수를 보여준다.
> 어떤 값을 보여줄 때 사용한다.
``` html
<h5>글자수는 : {{display_value}}</h5>
```

### 💌 urls.py
: 우리가 지어준 애칭 ```result```에 해당하는 path를 추가해준다.
``` py
from myapp import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name="index"),
    path('result/', views.result, name="result"),
]
```

### 💌 views.py
``` py
def result(request):
temp_target = request.GET['target'] # get방식으로 받는다.
result_len = len(temp_target) # len이라는 내장함수!(글자수 계산)
context =  {'display_value': result_len,}
return render(request, 'result.html', context)   
```

### 💌 result.html
: __index.html의 textarea를 통해 submit한 data가 view에서 가공되고 그 가공된 data들이 result.html로 와서 rendering 된다.__
``` html
<body>
    <h3>계산결과</h3>
    <h5>글자수는 : {{display_value}}</h5>
</body>
```
> ```{{}}```가 없으면 렌더링 X, but 에러도 발생 X.

## index.html에서 결과값 보여주기
### 💌 views.py
: 이해 완료
``` py
def count(request):
    a = request.GET['target']
    #아까 우리가 form을 제출하며 전송되는 data들 중에서 'target'이라는
    #이름을 가진 data를 가져와서 a라는 변수에 저장.
    b = a.split(" ")
    #a라는 변수에는 지금 우리가 index.html에서 textarea에 적은 내용이 있는데,
    #그 문자열을 띄어쓰기 하나를 기준으로 나누어 list의 형태로 b라는 변수에 저장해준다..! (split)
    c = {}
    #단어를 세어주기위해 { 단어1 : 단어1갯수 , 단어2 : 단어2갯수 , 단어3 : 단어3갯수 }이런 형태가 가장 적합하니, 빈 dictionary 하나를 선언.
    for i in b:         #지금 b에는 ['안녕하세요','제','이름은','안녕하세요','입니다'] 라는 애가 들어와있..  i는 list의 원소를 차례대로 돌아갑니다.
        if i in c:       #만약 i가 c안에 key값으로 이미 있다.(==단어를 센적이 있다)
            c[i] += 1    #{'안녕' : 1} 이렇게 있을 단어의 value값에 +1을 해준다.

        else:              #i가 dict안에 없다 ==> 단어를 처음 세었다
            c[i] = 1        #{'안녕' : 1, '제이름은' : !} 이렇게 단어와 함께 단어의 갯수가 1이라고 key와 value를 추가해준다.

    context = {'sendtext' : a, 'splittext': b , 'countdict': c , 'count_item': c.items}
    #context는 page간에 이동하는 data를 context라고 부른다    
    #그리고 django에서 context는 dictionary의 형태로 사용을 해준다

    #위의 context는 우리가 views의 사용에 대해 이해하기 위해 모든 변수들을 각기 다른 key값으로 context에 담아줬다.

    #그리고 c.items 라는 것은 dictionary의 items라는 함수를 사용한것인데 

    #{'안녕' : 1, '해피' : 2} 이런 dictionary를  [('안녕' : 1 ), ('해피' : 2)] 이런식으로 tuple의 형태로 잘라주는 역할을 한다(아하!!!!)

    #이렇게 사용해주는 이유는 HTMl에서 Django문법으로 mydict[key] 이런식으로 value값을 불러올수 없기때문에

    #애당초 key와 value를 쌍으로 묶어서 보내버리는 것이다.     (사용의 편의성을 위해)

    return render(request,'index.html',context)   #그리고 넘겨줄 데이터 뭉치 context를 render함수의 세번째 인자로 넣어줘 index.html에 넘겨준다

    #이부분에 다른 HTML파일을 입력하면 해당 HTML파일로 context가 넘어간다.
```

### 💌 index.html
: 이해 완료
``` html
<body>

<h1>메인페이지&단어계산기</h1>

<form method="GET" action="{%url 'count'%}">

<textarea name="mydata" cols="30" rows="30">
</textarea>

<input type="submit" value="세어줘요!">

</form>

{{sendtext}}       <!--우리가 views.py에서 보낸 context안에 sendtext라는 key값으로 text원문을 불러온다-->
{{splittext}}      <!--context안의 splittext라는 key로 단어별로 분리된 list를 보여준다-->
{{countdict}}      <!--count한 dictionary를 그대로 보여준다.-->

{%for k,v in count_item%}   <!-- count_item은 지금 [(단어,횟수) , (단어2,횟수)] 이런식으로 되어있는데 for문을 통해서 전부다 출력-->

<!-- 그리고 k,v는 마음대로 지어준 변수(정확히 변수는 아니지만)이름인데 k는 단어, v는 횟수를 가리킨다-->

단어 : {{k}} --- 횟수 : {{v}}<br>   <!--그리고 그 k와 v라는 변수들을 템플릿 변수로 출력해준다. <br>은 좀더 이쁘게 보여주기 위한 줄바꿈-->

{%endfor%}                 <!--endfor가 오는 이유는 HTML아 여기까지 for문이 끝났다라고 알려주는것, 안알려주면 멍청한 HTML이 for문 끝난줄 모름(ㅋㅋㅋㅋㅋㅋㅋㅋ)-->
</body>
```

## POST를 이용해 넘겨주기
### 💌 index.html
- CSRF TOKEN
: 악의적인 목적을 가진 사용자가 csrf 공격을 하는것을 방지하기위해
암호화된 token을 우리가 작성한 form과 함께 숨겨주는 것\
: 이를 받는 서버는 이게 암호화된 form이라는 것을 확인하고 안전하게 사용\
__=> POST방식으로 보내게 될때는 항상 csrf_token을 같이 보내줘야한다는 것을 잊지말자.__
``` html
<!--<templates - index.html수정>-->
<form method="POST" action="{%url 'count'%}">

{%csrf_token%}
```
### 💌 views.py
: request.GET에서 GET이 POST로 바꿔주자.
``` py
#<views.py - result 함수 수정>

def result(request):
    a = request.POST['target']
```