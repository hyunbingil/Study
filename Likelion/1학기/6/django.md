## Django
: 파이썬으로 만들어진 오픈소스 웹프레임워크\
: 자주쓰이는 기능을 제공한다.
> 로그인 같은 것들...?

### MVT(MVC) 패턴
: 웹을 만들때 패턴들이 있는데, 그 중 MVT 패턴을 사용한다.
- DB\
: 독립적인 공간, 데이터베이스!
- Model\
: 데이터를 정의하는 공간\
> 틀을 정의해준다고 생각하면 된다.

: ORM 지원
> SQL 쓸 필요 X.
- View\
: 요청을 받고 요청받은 내용을 어떻게 수행해줄 것인지 정의해주는 공간
> 기능을 정리해주는 공간이라고 생각하면 된다.
- Template\
: 사용자에게 보여지는 화면\
: html, css 등
<img src="/Likelion/img/mvt.PNG">

### 기본 환경 구성
1. 가상 환경 만들기\
: 여기에 Django 및 여러가지 패키지들을 다운받아 사용한다.
> 아무것도 없는 컴퓨터를 하나 만든다고 생각하면 된다.
```
python -m venv [가상환경이름]
```
2. 가상 환경 실행하기
```
. myvenv/Scripts/activate
```
3. 가상 환경 종료하기
```
deactivate
```
4. django 다운로드 하기
```
pip install django
```
> ```pip install django === [버전]``` 쓰면 쓰고 싶은 버전을 다운받을 수 있다.

5. 프로젝트 만들기\
: 하나의 프로젝트만 있어도 된다!
```
django-admin startproject [프로젝트이름]
```
6. 프로젝트에 App 생성하기\
: 프로젝트의 구성단위인 App을 생서아하자.
```
python manage.py startapp [앱이름]
```
7. Setting.py에 App 등록하기\
: 앱을 생성한 후 프로젝트 내 setting.py 파일 안에 INSTALLED_APP안에 앱이름을 등록해주어야한다!\
> 이거 안해서 계속 에러났었음 ㅠㅡㅠ

8. App안에 template 관리 폴더 만들기\
: ```templates```라는 이름을 가진 폴더여야한다.

9. templates 폴더 안에 html 넣기

10. views.py 내부에 html을 화면에 띄워주는 로직 쓰기.
``` py
from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, 'home.html')
```

11. urls.js에서 url을 설정해준다.\
: app폴더 보다 ../에 있음.
``` py
# 확장자 생략
from myapp.views import home

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name="home"), # main 화면
]
```

12. Django 서버를 구동해서 html을 띄운다.
```
python manage.py runserver
```

13. Django 서버 종료\
: ctrl^c 두번

### 🍯꿀팁(명령어)
#### 관리자 계정 만들기
```
python manage.py createsuperuser
```
> sudo 느낌인가..?
#### migrations 파일 생성
: ORM을 DB에 적용시키기 위해 필요한 번역파일이다.
```
python manage.py makemigrations
```
#### DB에 migrations 파일 적용
: migrations 파일을 기반으로 DB에 적용
```
python manage.py migrate
```
#### 깔려있는것들 확인하기
```
pip list
```
#### App은 여러개 생성이 가능하다.
: 기능 단위 별로 앱을 나눠서 프로젝트당 여러개의 앱을 가질 수 있다!
> 컴포넌트별로 js파일 나눠서 만드는 거랑 같은 건가?
#### import하기
: 확장자 생략이 가능하다.
``` py
from django.shortcuts import render
```
> 리액트랑 다르니까 헷갈 조심.