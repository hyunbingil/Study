## Bcrypt로 비밀번호 암호화 하기
: 암호화를 한 다음에 데이터베이스에 저장해야한다!
> 안전하지 않으니..!

https://www.npmjs.com/package/bcrypt
### 1. Register Route로 가기
: save 전에 비밀번호 암호화 시켜야한다.
#### salt를 생성하고 salt를 이용해서 암호화시킨다.
``` js
const saltRounds = 10; //10자리

serSchema.pre('save', function(next){
    // 비밀번호를 암호화 시킨다.
    var user = this; 
    bcrypt.genSalt(saltRounds, function(err, salt) {
        // salt 만들기
        if(err) return next(err)
        bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
            // Store hash in your password DB.
        });
    });
    
    next()
}) // 'save'하기 전에 무언가를 한다. mongoose에서 가져온 method인 pre
```

## 로그인 기능 만들기
### login route 만들기
1. 데이터 베이스에서 요청한 E-mail 찾기
2. 데이터 베이스에서 요청한 E-mail이 있다면 비밀번호가 같은지 확인
3. 비밀번호까지 같다면 Token 생성\
: JSONWEBTOKEN이라는 라이브러리를 다운로드해서 만들자.
```
npm install jsonwebtoken --save
```
https://www.npmjs.com/package/jsonwebtoken
4. token을 쿠키에 저장하기\
: 라이브러리 다운하자.
```
npm install cookie-parser --save
```


