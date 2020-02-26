### 함수 컴포넌트(Functional Component)
: 원래는 setState랑 ref를 쓰지 않는 컴포넌트에 썼었다.\
: 근데 이제 함수 컴포넌트에서 State와 ref를 사용할 수 있게 해줬다
## 이게 바로 Hooks다 !

### Hooks 사용하기
1. 함수안에 state 넣어주기
``` js
    const GuGuDan = () => {
        const [first, setFirst] = React.useState(Math.ceil(Math.random() * 9));
        const [second, setSecond] = React.useState(Math.ceil(Math.random() * 9));
        const [value, setValue] = React.useState('');
        const [result, setResult] = React.userState('');

        return ();
    }
```    

2. return 값 넣어주기
: class와 같은데 EventListener부분이랑 ref 붙이는 부분이 다르다.
> class가 없기 때문에 class method는 사용할 수 X.
``` js
setFirst(Math.ceil(Math.random() * 9));
setSecond(Math.ceil(Math.random() * 9));
```
> 이런식으로 따로따로 해주기

3. ref 사용하기
- 선언해주고
``` js
const inputRef = React.useRef();
```
> 초기값 넣어줘도 된다. ```const inputRef = React.useRef(null);```
- inputRef.current.focus();
: 이렇게 사용하기!-!
> Dom에 접근한다.! current 붙이기 확인!
>> 클래스랑 다른 점 짚고 넘어가기

4. 단점
- state를 바꾸면 GuGuDan 함수 자체가 통째로 다시 시작되기때문에 조금 더 느릴 수 있음.
- 함수안에 또 다른 함수 선언되는건 어쩔 수 없음.
> class에서는 render만 실행.

- state를 객체형으로 하나로 만들면?
: this.setState와는 다르게 일일이 다 바꿔줘야한다.
~> 하나라도 안적으면 사라진다..!
```js
const [state, setState] = React.userState({
    first: Math.ceil(Math.random() * 9),
    second: Math.ceil(Math.random() * 9),
    value: '',
    result: '',
});
```
> 쓰지마 귀찮아...
>> 다 쪼개서 사용하기

- 옛날 state로 새로운 state를 만들어 내는 경우에는 함수 넣기 가능
``` js
setCounter((C) => c + 1)
```
> 비동기 문제 발생 X.

#### 리액트에서 못쓰는 HTML 속성 다루기
1. class
: HTML 속성 중에 Class 라는게 있는데 리액트에서는 class 랑 헷갈리기 때문에 사용 X.\
: 그래서 __className__ 사용하기!
2. for
: 반복문의 for 이랑 헷갈리기 때문에!
: __htmlFor__ 로 사용하기
``` js
<button className = "button" htmlfor = "click me">
```