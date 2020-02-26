### 웹팩이란?
: 여러개의 자바스크립트 파일을 한 방에 합쳐서 하나의 자바스크립트 파일로 만들어 주는 것\

: 웹팩을 하려면 __노드__ 를 알아야한다.
> study repository에 node.js 참고

## 리액트 기본 설치 방법
### 웹팩설치하기
1. 프로젝트를 할 폴더로 들어간다
```
cd React
cd 2.끝말잇기
```
2. npm init
```
author에 자기자신이름
license에 isc나 mit 넣고
yes 치고 끝.
```
3. package.json이 생긴다.
: 리액트 개발에 필요한 모든 패키지를 넣어주면 된다.
> react, react-dom 등
4. 패키지를 넣어보자
- 리액트와 리액트dom
```
npm i react react-dom
```
> npm i 가 react나 react-dom을 설치하겠다! 라는 뜻.
- 웹팩과 webpack-cli
```
npm i -D webpack webpack-cli
```
> -D : 나는 개발용으로만 웹팩쓸거야
>> 실제 서비스할때는 웹팩 필요없대요...

: 실제 서비스에서 쓰이는 것들은 "dependencies": 에 기록되고\
: 개발에만 쓰이는 것들은 "devDependencies": 에만 기록된다.

### html 파일에 들어가서
``` html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>끝말잇기</title>
<body>
<div id="root"></div>
<script src="./dist/app.js"></script>
</body>
</html>
```
> 리액트 기본 설치 방법.
>> create react app 사용하면 기본 세팅 와르르 가능.\

### 파일을 나눠 줄 경우
``` jsx
const React = require('react');
const {Component} = React;
// npm에서 리액트를 불러와줘야한다.
// 분리할 때 쓰이는 애들을 꼭 다시 불러와야한다.
// ...
module.exports = WordRelay;
// 내가 쪼개놓은 이 컴포넌트들을 바깥에서도 사용할 수 있도록 하주는 것.
// 노드의 모듈 시스템
```
> 나누면서 이 3개는 꼭 적어주기!

### webpack.config.js
: 웹팩은 webpack.config.js에서 모든게 돌아간다.

### 경로 지정하기
``` js
const path = require('path');
// 맨 위에 작성해주고

path: path.join(__dirname, 'dist')
// __dirname : 지금있는 폴더! 안에 dist라는 폴더로 경로 변경

```

### 이 파일에서 이미 저 파일을 불러오는데?
: 그러면 굳이 안적어도 괜찮다.
> 리액트가 알아서 파악해서 이 파일에서 불러오는 저 파일까지 가져온다

ex) goldenchild.jsx 라는 파일이 jangjun.jsx라는 파일을 불러오면 goldenchild.jsx 파일만 불러오면 된다는 뜻!

``` js
entry: {
        app: ['./goldenchild.jsx'],
    }
```

: 확장자도 붙일 필요 없음 ^.^
``` js
module.exports = {
    //...
    resolve: {
        extensions: ['.js', '.jsx']
    },
    //...
};
```
> 웹팩이 위에 확장자를 가진 파일들 중에 맞는 파일이 있는지 찾아준다.
