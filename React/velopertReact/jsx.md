## 04. JSX의 기본 규칙
### JSX?
: 리액트에서 생김새를 정의할 때, 사용하는 문법이다.
> HTML과 같이 생겼지만, 실제로는 JS이다.

: 리액트 컴포넌트 파일에서 XML 형태로 코드를 작성하면, babel이 JSX를 JS로 변환해준다.

### Babel?
: JS의 문법을 확장해주는 도구이다. 아직 지원되지 않는 최신 문법이나, 편의상 사용하거나 실험적인 JS 문법들을 정식 JS 형태로 변환해주어 구형 브라우저같은 환경에서도 제대로 실행 할 수 있게 해주는 역할.

### JSX 사용시 지켜야 할 몇가지 규칙
: JS로 제대로 변환하려면 지켜야한다.
#### 1. 태그는 꼭 닫혀있어야한다.
: html에서는 ```input```이나 ```br``` 태그를 사용 할 때 닫지 않고 사용하기도 하지만, 리액트에서는 불가능.
- Self Closing 태그\
: 태그와 태그 사이에 내용이 들어가지 않을 경우에 사용한다.
``` jsx
return (
    <div>
        <Hello />
    </div>
)
```
#### 2. 꼭 감싸져야하는 태그
: 두개 이상의 태그는 무조건 하나의 태그로 감싸져 있어야 한다.\
: 하지만, 단순히 감싸기 위해 불필요한 div로 감싸는게 좋지 않을 수 있다.\
=> 이때, 리액트의 Fragment를 사용하자.
``` jsx
return (
    <>
        <Hello />
        <div>안녕</div>
    </>    
)
```
- Fragement\
: 브라우저 상에서 따로 별도의 엘리먼트로 나타나지 않는다.
#### 3. JSX 안에 자바스크립트 값 사용하기
: ```{}```로 감싸서 보여준다.
``` jsx
return (
    <>
      <Hello />
      <div>{name}</div>
    </>
  );
```
#### 4. style과 className
: HTML에서 설정하는 방법과는 다르다.
1. 인라인 스타일\
: 객체 형태로 작성\
: camelCase 형태로 네이밍
> ex) background-color => backgroundColor
2. CSS class\
: ```class= ```가 아니라 ```className= ```으로 설정해주기
``` jsx
function App() {
  const name = 'react';
  const style = {
    backgroundColor: 'black', //camelCase
    color: 'aqua',
    fontSize: 24, // 기본 단위 px
    padding: '1rem' // 다른 단위 사용 시 문자열로 설정
  }

  return (
    <>
      <Hello />
      <div style={style}>{name}</div>
      <div className="gray-box"></div>
    </>
  );
}
```
``` css
.gray-box {
  background: gray;
  width: 64px;
  height: 64px;
}
```
#### 5. 주석
: ```{/* */}```\
: 열리는 태그 내부에서는 ```//``` 주석 사용 가능.
``` jsx
<Hello //열리는 태그 내부에서
/>
```

## 05. props를 통해 컴포넌트에게 값 전달하기
### Props란?
: properties의 줄임말로, 우리가 어떠한 값을 컴포넌트에게 전달해주어야 할 때, props를 사용한다.
### Props의 기본 사용법
: App 컴포넌트에서 Hello 컴포넌트를 사용할 때 name이라는 값을 전달해주고 싶다면?
- App.js
``` js
import React from 'react';
import Hello from './Hello';

function App() {
  return (
    <Hello name="react" />
  );
}

export default App;
```
- Hello.js
``` js
import React from 'react';

function Hello(props) {
  return <div>안녕하세요 {props.name}</div>
}

export default Hello;
```
> 컴포넌트에게 전달되는 props 는 파라미터를 통하여 조회 할 수 있다

__props 는 객체 형태로 전달되며, 만약 name 값을 조회하고 싶다면 props.name 을 조회하면 된다.__

### 여러개의 props, 비구조화 할당
``` js
import React from 'react';

function Hello(props) {
  return <div style={{ color: props.color }}>안녕하세요 {props.name}</div>
}

export default Hello;
```
#### 비구조화 할당
: props 내부의 값을 조회 할 때마다 ```props.```를 입력하고 있는데, 함수의 파라미터에서 비구조화 할당(구조 분해)을 사용하면 간결하게 작성이 가능.
``` js
import React from 'react';

function Hello({ color, name }) {
  return <div style={{ color }}>안녕하세요 {name}</div>
}

export default Hello;
```

### defaultProps로 기본값 설정
: 컴포넌트에 props를 지정하지 않았을 때 기본적으로 사용할 값으 설정하고 싶으면 ```defaultProps```라는 값을 설정하면 된다.
- Hello.js
``` js
import React from 'react';

function Hello({ color, name }) {
  return <div style={{ color }}>안녕하세요 {name}</div>
}

Hello.defaultProps = {
  name: '이름없음'
}

export default Hello;
```
- App.js
``` js
import React from 'react';
import Hello from './Hello';

function App() {
  return (
    <>
      <Hello name="react" color="red"/>
      <Hello color="pink"/>
    </>
  );
}

export default App;
```

### Props.children
: 컴포넌트 태그 사이에 넣은 값을 조회할 때 사용.
- wrapper.js
``` js
import React from 'react';

// props.children 렌더링해주어야 실행했을 때 Hello가 보인다.
function Wrapper({ children }) {
  const style = {
    border: '2px solid black',
    padding: '16px',
  };
  return (
    <div style={style}>
      {children}
    </div>
  )
}

export default Wrapper;
```
- App.js
``` js
import React from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';

function App() {
  return (
    <Wrapper>
      <Hello name="react" color="red"/>
      <Hello color="pink"/>
    </Wrapper>
  );
}

export default App;
```

## 06. 조건부 렌더링
: 특정 조건에 따라 다른 결과물을 렌더링하는 것.
#### App 컴포넌트
: App컴포넌트에서 Hello컴포넌트를 사용할 때, isSpecial이라는 props 설정해보자.
``` js
import React from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';


function App() {
  return (
    <Wrapper>
      <Hello name="react" color="red" isSpecial={true}/>
      <Hello color="pink" />
    </Wrapper>
  )
}

export default App;
```
: isSpecial이 true이냐 false이냐에 따라서 컴포넌트의 좌측에 *표시를 보여줄것이다.
#### Hello 컴포넌트
``` jsx
import React from 'react';

function Hello({ color, name, isSpecial }) {
  return (
    <div style={{ color }}>
      { isSpecial ? <b>*</b> : null }
      안녕하세요 {name}
    </div>
  ); // {isSpecial && <b>*</b>} 과 같다.
}

Hello.defaultProps = {
  name: '이름없음'
}

export default Hello;
```
#### props 값 설정을 생략하면?
: true로 설정한 것으로 간주한다.
> isSpecial = {true}와 같다.
``` js
import React from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';

function App() {
  return (
    <Wrapper>
      <Hello name="react" color="red" isSpecial />
      <Hello color="pink"/>
    </Wrapper>
  );
}

export default App;
```