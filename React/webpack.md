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

### 웹팩 명령어를 실행하면?
: entry를 읽어서 한 파일로 만들어 준다.
### 웹팩 꿀팁 & 명령어
__'webpack'은(는) 내부 또는 외부 명령, 실행할 수 있는 프로그램, 또는 배치 파일이 아닙니다.__
: node 할 때 이 에러 진짜 많이 본다.\
: 명령어로 따로 등록해줘야 한다..
__해결방법__
1) 명령어로 등록해주기\
2) package.json에 "scripts": 에 적는다
``` json
"scripts": {
    "dev": "webpack"
  }
```
그리고 터미널에서
```
npm run dev(스크립트명)
```
> 웹팩 실행
3) 터미널에서 ```npx webpack``` 적기

### 바벨 설치하기
1. babel core\
: 바벨에 기본적인 것 들어있는 거.
```
npm i -D @babel/core
```
2. babel preset-env\
: 우리의 브라우저에 맞게 알아서 최신 문법을 옛날 문법으로 바꿔준다.
```
npm i -D @babel/preset-env
```
3. babel preset-react\
: JSX 같은 것들을 지원할 수 있음.
```
npm i -D @babel/preset-react
```
4. babel loader\
: babel이랑 webpack을 연결해준다.
```
npm i -D babel-loader
```

### 바벨을 웹팩에 적용해보자
1. webpack.config.js에 module 적기
``` js
module: {
    rules: [{
        test: /\.jsx?/, //정규표현식 : js랑 jsx파일에 loader를 적용하겠다.
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
        }, // babel의 옵션
    }],
},
```
> 정규 표현식 따로 공부하기
2. @babel/plugin-proposal-class-properties 깔고 plugins에 넣기\
: state = 이라는 문법 사용을 위해서
``` js
module: {
    rules: [{
        test: /\.jsx?/, //정규표현식 : js랑 jsx파일에 loader를 적용하겠다.
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties'],
        }, // babel의 옵션
    }],
},
```
> preset = plugin들의 모음

### preset의 옵션을 설정하고 싶으면?
: 배열을 만들어서 앞에 설정하고 싶은 친구 두고, 뒤에 옵션 설정해주면된다.
``` js
presets: [
    ['@babel/preset-env', {
        targets: {
            browsers: ['last 2 chrome versions'], // chrome 버전 이번거 저번꺼 두개만
                        },
                    }
    ],
    '@babel/preset-react'
],
```
> 브라우저 리스트 : https://github.com/browserslist/browserslist

### plugins
: module나 rules 말고 다른 것들을 추가 하고 싶을 때 넣어주는 아이.
> plugins이나 rules 같은거는 하도 많아서 뭔지 모를때가 많은데 그럴때 마다 하나씩 빼보면서 어떨때 사용하는 것들인지 알아보는것이 좋다.

### webpack.config 5대장
1. Entry\
: 시작하는 파일 넣기
2. Output\
: 결과가 어떻게 될지
3. Module(loaders)\
: 모듈 적용쓰
4. Plugins
: 추가적으로 하고 싶은 작업
5. Mode
: development/production
> (mode(+나머지 기타 작업들) ->) entry -> module -> plugins -> output 순서로 코드 작성 추천

### 리액트에서 form 다루기
form에 value 값을 받을거면 onChange를 같이 써라!
> value와 onChange는 세트.
>> 그게 없으면 defaultValue를 넣어라.

### js에서 코드 수정할 때 마다 build 해주기(npm run dev)
: 근데 귀찮죠? 자동으로 build 해주는 방법이 있다?
1. ```npm i -D react-hot-loader```
2. ```npm i -D webpack-dev-server```\
: webpack.config.js를 읽어서 build를 해주고 그걸 항상 서버로 유지시켜준다.
> 프론트엔드의 변경점을 감지해서 자동으로 build해주고 변경사항도 봐꿔주는 친구
>> nodemon 같은 거래
3. package.json에서\
``` json
"scripts": {
    "dev": "webpack-dev-server --hot"
  },
```
바꿔주기
4. client.jsx에 가서\
1) ```const { hot } = require('react-hot-loader/root');``` 작성하고\
2) 이름 바꿔주기
``` jsx
ReactDom.render(<WordRelay />, document.querySelector('#root'));
// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓
const Hot = hot(WordRelay);
ReactDom.render(<Hot />, document.querySelector('#root'));
```
5. module안에 rules안에 options안에 있는 plugins에\
```'react-hot-loader/babel'``` 추가하기
6. 다른 폴더에 있는 파일로 웹팩해서 돌리려면
: webpack.config.js 들어가서
``` js
output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/dist/',
        // 지금 있는 곳 안에 들어있는 폴더인 dist안에 있는 파일로 server 돌려서 hot 실행하려면
        // 지정해줘야한다. (대신 적고 나면 새로고침 해주기 : npm run dev)
    },
```

### 꿀팁
1. 콘솔 창 잘 보면
- ```[HMR]``` : HOT MODULE REPLACEMENT\
: 어떤 컴포넌트가 바뀌어서 수정되는지 알려주는 메세지
- ```[WDS]``` : WEBPACK DEV SERVER
: 변경사항 받아서 서버를 재시작해서 업데이트를 해주는 것.
2. HTML 속성 사용 (for, class)
: JS에서 for과 class가 예약어로 되어있어서\
: 따로 htmlfor나 className으로 바꿔줘야한다.