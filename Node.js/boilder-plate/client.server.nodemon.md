## Client와 Server가 통신하는 법
> Chrome 브라우저가 Client, Server 부분은 우리가 index.js로 만들고 있는 부분!

: Client를 이용해서 정보를 작성해서 전송하면, 서버에서 그 정보를 받아야하는데, 그 때 필요한 것이 있다.
#### 1. Body-parser Dependency 설치
```
npm install body-parser --save
```
#### 2. POST MAN 설치
: 로그인을 하거나, 회원가입을 할 때 Client를 만들어둔 것이 없으니, 데이터를 Client에 보내줄 수 없으니까 그것을 대처하기 위해서 다운받는다.

#### 3. Register Route 만들기
``` js
const bodyParser = require('body-parser');

// bodyParser가 client에서 오는 정보를 서버에서 분석해서 가져올 수 있게 하는 것이라고 했는데,
// 이 부분은 appliation/x-www-form-urlencoded 으로 되어있는 데이터를 분석해서 가져올 수 있게 하주기 위한 조건
app.use(bodyParser.urlencoded({extended: true}));
// 이 부분은 appliation/json 으로 되어있는 데이터를 분석해서 가져올 수 있게 하주기 위한 조건
app.use(bodyParser.json());

// ...

app.post('/register', (req, res) => {
  // 회원 가입 할 때 필요한 정보들을 client에서 가져오면, 그것들을 데이터 베이스에 넣어준다.

    const user = new User(req.body)
    // request body안에 정보들이 들어있는 것.
    // bodyParser가 있기 때문에 여기 들어 있을 수 있음.
    
    user.save((err, doc) => {
      if(err) return res.json({success: false, err}) // json 형식으로 에러 전달.
      return res.status(200).json({
        success: true
      }) // 성공했다는 뜻
    } // mongo DB 메소드
    )}
) // callback function인 req, res
```
#### 4. npm run start로 실행시켜주고, POSTMAN을 이용해 회원가입해보기
- 설정 후 실행
<img src='/img/postman_settings.PNG'>

## NODE MON
: 서버를 내리고 오리지 않아도 소스를 변경할 때 그것을 감지해서 자동으로 서버를 재시작해주는 tool
> react-hot-loader랑 비슷한듯
#### 1. Node Mon 다운로드
: ```npm install nodemon --save-dev```
> dev 구분해주기
#### 2. 시작 시 nodemon으로 시작하기위해 script 하나 더 만들기
``` json
"scripts": {
    "start": "node index.js",
    "backend": "nodemon index.js", // nodemon을 이용해서 index.js를 실행하겠다는 것을 넣어주기
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

## 개발할 때 두가지 환경에서 할 수 있음
### Local 환경
: development 모드\
=> mongoDB uri를 dev.js에서 가져오게 한다.
### Deploy(배포) 한 후
: heeroku나 클라우드 서비스를 이용해서 배포한 후, production 모드\
=> heroku 사이트 자체에서 mongoDB uri를 넣어서 가져오게 해야한다.