### 가운데 정렬
``` css
margin: 0 auto;
/* 상하 : 0, 좌우 : auto */
/* 가운데 정렬 */ 
```
: 많이 사용한다!

### display 속성
: div로 나누어줬을 경우, display 속성이 block이기 때문에 한줄을 꽉꽉차지한다.\
: block 속성일 경우, 크기 조정하기 편하기 때문에 div 사용을 권장한다.
> span을 사용하면, inline이 되므로 옆에 다른 것들이 올 수 있음.

### padding을 줄 때 개발자 도구 사용하기
: padding을 개발자 도구를 이용해 넣어주면서 어느정도 넣으면 될지 감을 잡고 코드를 작성하는게 좋다!\
=> 하나하나 해보면서 확인 안해도 되니깐
> content와 border 사이에 padding이라는 여유가 있으면 좋기때문에 넣어주자.
>> padding 말고도, 다른 것들도 개발자 도구를 이용하면 좀 수월하게 코드 작성이 가능하다


### 안에 요소를 쉽게 정렬해주자
: 비례식느낌처럼 몇대몇대몇 이런식으로 설정이 가능하기 때문에 정렬할 때 사용하기 좋다
``` css
display: inline-flex;
/* inline-block 처럼 flex가 한 줄에 여러개 올 수 있는 것 */
display: flex;
/* block처럼 한 줄에 하나밖에 못오는 것! */
```

### flex를 이용해 가로 세로 가운데 정렬
``` css
justify-content: center;
align-items: center;
```

### ```margin: 0```이 안먹을 경우
: ```margin-right: 5px``` 이런것 처럼 어디에서 margin이 먹는지 찾아내서 조절해주면 된다.!

### position
: position-relative를 이용해서 겉테두리를 둘러싸고 그 안에 있는 요소를 absolute, 절대적으로 내가 원하는 곳에 배치시킬 수 있다.

## 완성본
<img src="/Likelion/img/insta.PNG">