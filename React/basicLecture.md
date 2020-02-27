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
### 1) 속성
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

### 2) 상태(state)\
: 바뀔 여지가 있는 부분
> 좋아요 버튼을 누르면 좋아요를 눌렀음으로 바뀌면 좋아요 버튼이 상태인거쥬!
>> 웹 사이트 들어가서 상태 찾는 연습하는 것도 좋다!
``` js
this.state = {
    liked = false,
};
```
- __상태를 바꾸고 싶으면?__\
: setState 사용, 먼저 기본 값 주기!\
: 직접 변경해줘야 할 것만 넣어야 한다. (수동으로)\
: input 같은 경우에는 이렇게 컨트롤하지 않으면 값 입력이 보이질 않음.
``` js
onChange = {(e) => this.setState({ value: e.target.value })
// ↓ 원래는 이렇게 사용했었음.
input.onchange = (e) => {console.log(e.target.value)}
// render 안에는 태그들만 남겨두고
// JS 로직들은 class의 method들로 들어가게 해주기 위해 빼둔 친구
```
> onclick, onchange, onsubmit, onload, oninput, onfocus, onblur 등 상황에 따라 골라서 사용하기
>> js에서 사용하려면 onClick 이렇게 바꿔줘야한다.

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
1. html 태그와 리액트 컴포넌트 구별법
```<button>``` 소문자로 시작하면 html태그\
```<LikedButton />``` 대문자로 시작하면 리액트 컴포넌트

2. JSX와 JS 섞어 쓰지 말기 __(클래스 사용 시)__
: render 안에는 태그들만 남겨두고 JS 로직들은 class의 method들로 들어가게 해주기 !

3. 컴포넌트를 여러개 rendering하면
: 같은 컴포넌트지만 다른 state를 가진다.
``` js
<LikeButton />
<LikeButton />
```

4. __<> 빈태그__
: render 안에 ```<div>```로 감싸주지 않으면 에러가 났았다.
> 제일 상단에 root를 하나 둔 것 처럼 컴포넌트도 항상 ```<div>```로 감싸줬어야 했다.
>> CSS 적용시나 굉장히 거슬리는 친구였는데 개선이 되었다!

: 빈태그를 이용해서 한번 감싸주면 된다구!
``` <> </> ```
> 에러가 날때는 ```<React.Fragment></React.Fragment>``` 사용

# Class 사용하기
## JS 로직에서 this.setState를 사용할 때 함수를 return 
: 새로운 객체로 받지말고 함수를 return 해주면 예전 상태값(prevState)를 this.state.value 뭐 이런식으로 안받아도 된다.
1. 별로 안헷갈린다.
2. 연속으로 사용했을 때 비동기 때문에 발생하는 문제점 해결 가능.
``` js
this.setState({
    value: this.state.value + 1,
});
this.setState({
    value: this.state.value + 1,
});
this.setState({
    value: this.state.value + 1,
}); // 새로운 value가 value+3 이 아니라 value+1일 수 있다.
```
> 비동기때문에 문제가 발생함.
``` js
this.setState((prevState) => {
    return{
        value: prevState.value + 1
    };
});
```
## 상태 변화 후에도 계속 포커스를 주고 싶다!
: __ref__ 사용하기
1. class 안에 input 선언
2. render안에 적어준다.
``` js
render(){
<input ref = {(c)=>{ this.input = c; }}>
}
```
3. class 안 JS 로직 안에
: ```this.input.focus();``` 선언
> ```document.querySelector(input).focus()```랑 같은 역할.

-> 넣어 준 dom이 선택 된다.
> 꼭 input, c 일 필요없음 본인이 원하는 대로.
>> 그냥 외우세요.

## 꿀팁2
1. JS 로직에서 화살표 함수 안쓰면
: this 값 달라지니까 그냥 function 사용 금지.
2. {}안에는 자바스크립트 사용 가능.
3. 최소 script 2개 필요.
    - 안에 내용 넣을 스크립트 (이러이러한 내용을 만들겠다.)
    - div안에 넣어 줄 스크립트 (내용을 보여주겠다.)
        - ```<div id="root"></div>``` 여기안에 앞의 스크립트 내용을 넣겠다 이런 느낌이랄까.
4. 상태가 변할 때 마다 render 함수가 다시 실행.
: (this.)setState 할 때 render 함수가 다시 실행된다.\
: 그래서 함수 같은거 따로 밖에 빼는 이유다!\
> render를 많이 하면 느려진다.
>> 성능 최적화할 때 중요하기 때문에 알아두기.

# Hooks 사용하기
