## Model
## Model 생성과 Model의 내용을 template에 띄워주자!
: model을 통해 사용자로 부터 받는 데이터나 우리가 보여주고 싶은 데이터를 저장하고 보여주자!
### 💌models.py
``` py
from django.db import models
from django.utils import timezone
# create_at이라는 요소의 default값을 설정해주려고 한다.
# 이때, 장고가 제공해주는 util 프로그램을 가져와 timezone.now를 통해 default값을 추가해주는 것.

# Create your models here.

class Test(models.Model):
    # Test라는 우리가 사용할 model을 생성한다.
    # (models.Model)은 Test라는 class가 Model의 역할을 할 수있게 model의 피를 이어 받았다고 생각해주기
    title = models.TextField()
    created = models.DateTimeField( default = timezone.now )
    # title, created 등은 우리가 어떤 data를 받을지 정해주는 작업
    # Test라는 data꾸러미에 title이라는 정보를 담고, 이것은 text의 속성을 가지고 잇기 때문에 TextField이다.

    def __str__(self):
        return self.title
    # Model안에 미리 __str__이라는 이름으로 정의되어있는 친구를 덮어쓰는 코드.
    # 대표적으로 보여지는 값을 self(우리가 쓴 글 하나하나)의 title로 설정해주겠다는 코드.
```        
### 💌 model을 컴퓨터에게 알려준다.
: data 저장이 가능한 model을 작성했으니 알려주자!
- makemigrations
: 우리가만든 모델의 구조를 어느시점에 어떻게 변했는지 기록하는 과정.
```
python manage.py makemigrations
```
- migrate
: 우리가 만든 모델의 구조도(migrations)를 컴퓨터에게 진짜로 적용시켜 주는 과정.
```
python manage.py migrate
```
