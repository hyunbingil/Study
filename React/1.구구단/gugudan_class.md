## 구구단을 만들어보자.
- state를 바꿀 때 무엇을 사용한다고?
: setState
> 직접 변경해줘야 할 것만 넣어야 한다. (수동으로)
``` js
onChange = {(e) => this.setState({ value: e.target.value })
// ↓ 원래는 이렇게 사용
input.onchange = (e) => {console.log(e.target.value)}
```
> 상태를 이렇게 컨트롤해줘야 바뀌기 때문에 안해주면 input 같은 경우에는 값 입력이 보이질 않음.
>> onclick, onchange, onsubmit, onload, oninput, onfocus, onblur 등 상황에 따라 골라서 사용하기
>>> js에서 사용하려면 onClick 이렇게 바꿔줘야한다.

- JSX와 JS 섞어 쓰지 말기
: render 안에는 태그들만 남겨두고 JS 로직들은 class의 method들로 들어가게 해주기 !

- 컴포넌트를 여러개 렌더링(?)하면?
: 같은 컴포넌트지만 다른 state를 가진다.

### <> 빈태그
: render 안에 ```<div>```로 감싸주지 않으면 에러가 났았다.
> 제일 상단에 root를 하나 둔 것 처럼 컴포넌트도 항상 ```<div>```로 감싸줬어야 했다.
>> CSS 적용시나 굉장히 거슬리는 친구였는데 개선이 되었다!

: 빈태그를 이용해서 한번 감싸주면 된다구!
``` <> </> ```
> 에러가 날때는 ```<React.Fragment></React.Fragment>``` 사용

### this.setState를 사용할 때 함수를 return해 준다!
: onSubmit 할 때 새로운 객체로 받지말고 함수를 return 해주면 예전 상태값(prevState)를 this.state.value 뭐 이런식으로 안받아도 된다.
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

### 포커스를 주고 싶다!
: 구구단 입력 후 바로 입력가능할 수 있게 포커스를 주고 싶다면?\
: __ref__ 사용하기
``` js
// class안에 input을 선언하고,
// render안에 적어 주고
// focus 줄 부분에 this.input.focus(); 넣어주면 dom이 선택 된다.
render(){
<input ref = {(c)=>{ this.input = c; }}>
}
```
> 꼭 input, c 일 필요없음 본인이 원하는 대로 하시면 됩니다.
>> 그냥 외우세요.

### setState를 할 때는 render 함수가 다시 실행된다.
: this.setState 하는게 render 함수가 다시 실행된다.\
: 그래서 함수 같은거 따로 밖에 빼는 이유다!\
> render를 많이 하면 느려진다.
>> 성능 최적화할 때 중요하기 때문에 알아두기.

