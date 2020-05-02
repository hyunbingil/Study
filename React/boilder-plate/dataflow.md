## Data Request, Response Flow 그리고 AXIOS
<img src="./img/data_flow.PNG">

> client : React, Server : node.js, Database : Mongo DB
: 데이터를 보낼 때 AXIOS를 사용한다!
```
npm install axios --save
```

## CORS 이슈, Proxy 설정
: sever와 client의 포트가 다를 때, request와 response가 불가능하다.\
=> CORS(Cross-Origin Resource Sharing) 정책 때문에 막혀버린다.
> 보안적인 이슈 때문에..
### 해결방법?
: 여러가지 방법이 있는데, 그 중 Proxy를 사용하자!
> 개발자 도구, 프론트부분만 한다면 json p(?) 방법 이용할 수 있지만 제한적이다.
: https://create-react-app.dev/docs/proxying-api-requests-in-development/

=> Configuring the Proxy Manually 이용할 것!
1. ```npm install http-proxy-middleware --save```
2. setupProxy.js 만들어서 적혀있는 내용 넣기

### Proxy server?
: 유저와 인터넷 사이에 존재할 수 있는 서버
1. 아이피를 임의로 바꿔 버릴 수 있다.
> 그래서 인터넷에서는 접근하는 사람의 IP를 모르게 된다.
2. 보내는 데이터도 임의로 바꿀 수 있다.
- 기능?
1. 방화벽 기능
2. 웹 필터 기능
3. 캐쉬 데이터, 공유 데이터 제공 기능
- 사용 이유?
1. 회사에서 직원들이나 집안에서 아이들 인터넷 사용 제어
2. 캐쉬를 이용해 더 빠른 인터넷 이용 제공
3. 더 나은 보안 제공
4. 이용 제한된 사이트 접근 가능.

## Concurrently
: 여러개의 commands를 동시에 작동 시킬 수 있게 해주는 Tool이다.\
: 이것을 이용해서 프론트, 백 서버 한번에 켜자!
```
npm install concurrently --save
```
### 사용방법
: package.json에 script 넣어주기\
: 실행하고 싶은 것들을 차례대로 적어주자!
```
"start": "concurrently \"command1 arg\" \"command2 arg\""
```
- script에 넣지 않고 실행?
```
concurrently "command1 arg" "command2 arg"
```