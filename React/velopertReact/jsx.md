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