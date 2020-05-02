## Node JS와 Express JS 다운로드
### Node JS?
: Node JS가 나오기 전까지는 JS를 브라우저에서만 사용했었는데, 나오면서 JS를 브라우저가 아닌 서버사이드에서도 사용이 가능해졌다. JAVA, PHP, PYTHON같이 JS를 서버사이드에서도 사용이 가능하다.
### Express JS?
: 웹사이트나 어플리케이션을 쉽게 만들 수 있도록 도와주는 프레임워크!
> node.js를 쉽게 사용할 수 있도록 하는 프레임워크.
### Node JS 다운로드
#### 1. 노드가 이미 다운되어 있는지 확인하기\
: ```node -v``` 터미널 창에 입력해서 버전이 나오면 있는 것!
#### 2. node js 검색해서 다운받기
#### 3. 폴더안에 npm package 만들기
: ```npm init```
#### 4. index.js 파일 만들기

### Express JS 다운로드
: ``` npm install express --save ``` 터미널 창에 입력

#### index.js에서 기본적인 express js 앱 만들기
1. https://expressjs.com/en/starter/hello-world.html 에서 코드 복붙
2. package.json에서
``` js
"scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
> start 넣어주기
3. ```npm run start```

## 몽고 DB 연결하기
: 사이트에서 회원가입 먼저하기!
#### 1. Clusters 만들기
: 클라우드상에 몽고 DB를 만드는 것.
#### 2. 몽고DB 유저 생성
: 만든 Cluster에 connect 버튼을 누르고 username과 password 입력하기.
#### 3. Mongoose 다운받기
: 몽고 DB를 편하게 쓸수 있는 Tool이다.
``` npm install mongoose --save ```
#### 4. 몽고DB랑 연결하기
: 복사, 붙여넣기
``` js
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://hyunbingil:<password>@hyunbingil-cveab.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
```

## MongoDB Model & Schema
: 유저랑 관련된 데이터들을 보관하기 위해서 유저 모델, 스키마를 만들어보자!
### Model?
: Schema를 감싸주는 역할
### Schema?
: 작성한 사람은 누구인지? 제품 명이 무엇이고? 몇글자까지 들어가는지? 뭐 그런 하나하나를 지정해줄 수 있는 것.
``` js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String
    }
}, {timestamps: true}) // 이 부분이 스키마
// ...
```