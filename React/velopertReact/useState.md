## useState를 통해 컴포넌트에서 바뀌는 값 관리
: 컴포넌트에서 보여주어야 하는 내용이 사용자 인터랙션에 따라 바뀌어야 할 때 어떻게 구현할 수 있는가?\
: useState라는 함수는 리액트의 Hooks 중 하나이다.

### 이벤트 설정하기
: Counter에서 버튼이 클릭되는 이벤트가 발생 했을 때, 특정 함수가 호출되도록 설정해보자.
``` js
import React from 'react';

function Counter() {
  const onIncrease = () => {
    console.log('+1')
  }
  const onDecrease = () => {
    console.log('-1');
  }
  return (
    <div>
      <h1>0</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;
```

### 동적인 값 끼얹기(useState)
: 동적인 값을 컴포넌트에서는 상태라고 부른다.\
: useState라는 함수를 이용해 컴포넌트에서 상태를 관리할 수 있다.
- 리액트 패키지에서 useState 함수 불러오기
``` js
import React, { useState } from 'react';
```
- useState 사용 시, 상태의 기본값을 파라미터로 넣어서 호출해줌.\
: 이때, 첫번째 원소는 현재상태, 두번째 원소는 Setter 함수.
``` js
const [number, setNumber] = useState(0);
```
- Counter.js
``` js
import React, { useState } from 'react';

function Counter() {
  const [number, setNumber] = useState(0);

  const onIncrease = () => {
    setNumber(number + 1);
  }

  const onDecrease = () => {
    setNumber(number - 1);
  }

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;
```
### 함수형 업데이트
: Setter함수를 이용할 때, 업데이트 하고 싶은 새로운 값을 파라미터로 넣어주고 있는데, 그 대신 기존 값을 어떻게 업데이트 할 지에 대한 함수를 등록하는 방식으로도 가능하다.
> 주로 나중에 컴포넌트를 최적화 하게 될 때 사용하게 된다.
``` js
import React, { useState } from 'react';

function Counter() {
  const [number, setNumber] = useState(0);

  const onIncrease = () => {
    setNumber(prevNumber => prevNumber + 1);
  }

  const onDecrease = () => {
    setNumber(prevNumber => prevNumber - 1);
  }

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;
```

## input 상태 관리하기
