## 미디어 쿼리
: width와 height에 따라서 구조(?)가 바뀌게 하는것
> 반응형 웹

### 🍯꿀팁
1. 개발자 도구 사용하기\
: 핸드폰 아이콘(?) 클릭하면 위에 띠가 생기는데 그 띠에 태블릿, 핸드폰 등 여러가지 사이즈 선택이 가능하다.
> 폰 기종 설정도 가능
2. 개발자 도구를 이용해서 스와이프 효과 테스트하기\
: 핸드폰 아이콘(?) 클릭하면 마우스가 동그라미로 바뀌는데 그게 손가락이라고 생각하면 된다.
3. bootstrap 등 도움받기\
: https://getbootstrap.com/docs/4.4/content/reboot/
: https://material-ui.com/

4. class명을 유의미하게 정하기!

### bootstrap 사용하기
: class를 기반으로 컴포넌트들을 디자인 했기 때문에, class 뒤에 이름을 설정해서 css에서 설정을 바꿔주기
``` html
<button type="button" class="btn btn-info bin-btn" data-toggle="modal" data-target="#exampleModalLong">
    배고파
</button>
```
> 만약 안된다면, id를 직접 넣어주기
 