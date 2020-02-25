## 구구단을 만들어보자.
- state를 바꿀 때 무엇을 사용한다고?
: setState
> 수동으로 변경해줘야 할 것만 넣어야 한다.
``` js
onChange = {(e) => this.setState({ value: e.target.value })
// ↓ 원래는 이렇게 사용
input.onchange = (e) => {console.log(e.target.value)}
```
> 상태를 이렇게 컨트롤해줘야 바뀌기 때문에 안해주면 input 같은 경우에는 값 입력이 보이질 않음.

- 값 입력했는데 왜 결과가 안보이지?
: 