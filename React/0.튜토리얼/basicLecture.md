React.createClass ~> Class ~> Hooks
## 1. 왜 리액트를 쓰는가?
1. 사용자 경험이 좋아진다.\
: 웹보다는 앱이 사용자 경험이 좋은데, 앱같은 경험을 웹에서 구현한다고 보면 된다.
> 웹 열때 깜빡거리는게 웹 특징인데 이걸 사용하면 부드럽게 잘 넘어가진다.
2. 재사용 컴포넌트\
: 웹사이트 만들 때 중복되는게 정말 많은데, __컴포넌트화__ 해서 안에 컨텐츠만 바꿔줘서 중복을 피할 수 있게 한다.
> 중복되면 유지 보수가 어렵다.
3. 데이터-화면 일치\
: 데이터랑 화면이랑 일치시키는게 어려운데 이걸 리액트가 자동으로 해준다. 
> 웹팩 : 쪼개진 자바스크립트 파일을 html이 실행할 수 있는 자바스크립트로 합쳐준다.
>> ```<script src="index.js"></script>```

## 2. HTML에서 리액트를 사용하려면 
: like.html 참고! (like button 만드는 실습)
``` html
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<!--리액트가 동작하는 핵심적인 코드가 리액트라는 자바스크립트 파일 안에 들어가 있음-->
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<!--리액트 코드를 웹에다가 붙여주는 역할-->
<!--실제 배포시에는 마지막에 react.production, react-dom.production이라고 바꿔주면 된다.-->
```

## 3. HTML 속성과 상태(state)를 리액트에서 표현하기
: 기본적으로 react는 컴포넌트들을 렌더링 할 root가 하나 필요하다.
1. 속성\
: HTML 속성을 넣을 때는 객체 형식으로 표현.
- js에서
``` js
render() {
    return e('button', { onClick: () => { console.log('clicked')}, type: 'submit' }, 'Like');
            }
```
- html에서
``` html
<button onclick="() => { console.log('clicked')}" type="submit">Like</button>
```

2. 상태(state)\
: 바뀔 여지가 있는 부분
> 좋아요 버튼을 누르면 좋아요를 눌렀음으로 바뀌면 좋아요 버튼이 상태인거쥬!
>> 웹 사이트 들어가서 상태 찾는 연습하는 것도 좋다!
- 상태를 바꾸고 싶으면?\
: setState 사용, 먼저 기본 값 주기!\
``` js
this.state = {
    liked = false,
};
```
- 상태가 바뀌면?\
: 화면이 저절로 바뀐다!
> 원래라면 ex) `$('button').text('Liked');` 라고 바꿔줘야하는데.. 이걸 안해도된다! 와우!
#### 그래서 state가 데이터고 render안에 있는 것들이 화면이라고 생각하면 리액트가 알아서 일치시켜준다!

## 4. 바벨(babel)
: 자바스크립트에서 html 태그 사용이 가능하다는게 문법적으로 말이 안된다구..!
> 여기서부터 복잡한 문제가 발생함,,,

: 그래서 바벨이라는 걸 사용해줘야한다!

### 그래서 바벨이 뭔데?
: 최신 문법이나 실험적인 문법을 JS에서 사용할 수 있게 해주는 것.
- HTML head안에 추가하기
``` html
<script src = "https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```

### JSX
: 바벨 덕분에 사용할 수 있다!\
: 바벨이 JSX 문법을 createElement로 바꿔주기때문!\
: JS + XML
``` js
return <button type="submit" onClick = {() => { this.setState({ liked: true}) } }>Like</button>;
```
> HTML이라기 보다는 XML과 더 가깝다.
- 닫는 괄호 꼭 해주기! 문법 엄격.
``` js
<LikeButton />
```

## 5. 컴포넌트의 장점
: 원하는 개수만큼 쉽게 늘릴 수 있음\
: __재사용성 짱짱__
- 하나하나 일일이 해줄필요 없이 그냥 뚜둥 해주면 끝.
``` js
<button onClick = {onclick}>좋아요</button>
<button onClick = {onclick}>좋아요</button>
// ↓
<LikeButton />
<LikeButton />
```

## 꿀팁
```<button>``` 소문자로 시작하면 html태그\
```<LikedButton />``` 대문자로 시작하면 리액트 컴포넌트