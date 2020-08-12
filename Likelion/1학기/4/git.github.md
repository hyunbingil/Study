## Git & Github
: 중간 저장의 불편함 해소, 협업시 합치기 좋음
### Git
: 코드 중간 저장, 변경사항 확인, 코드 전달 및 전송, 코드 합치기 등의 기능을 수행해준다.
> 소프트웨어
### Github
: 코드를 올릴 수도 있고 남의 코드를 훔쳐볼 수도 있다.

### Git 흐름
: 깃허브 repository에 올리는 것이 목적!
1. ```git init```\
: git 기능을 쓸 수 있다.
> 내 코드(파일, 이미지)
2. ```git add```\
: staging area라는 가상 공간에 올라간다.
3. ```git commit```\
: message를 써서 올릴 수 있다.
4. ```git push```\
: 깃허브 repository에 올라간다!

- ```git pull```\
: repository에 있는 파일에서 변경사항을 확인해서 바뀐 것들을 내 컴퓨터에 받아올 수 있다.

### Github 시작하기
1. git과 github 계정연결하기
```
git config --global user.name "me"
git config --global user.email 이메일
```
2. repository 만들기
3. ```git init```\
: git 사용하게 하자!
4. ```git add 추가할 파일```
: 추가할 파일을 staging area에 추가
> git add .은 다 올리기!
5. ```git commit -m "쓰고싶은 커밋 메시지"```
: add 명령어로 커밋이 준비된 파일들을 메시지와 함께 커밋함
6. ```git remote add origin repository주소```
: 레포지토리와 연결시켜주기
7. ```git push origin master```
: 원격 저장소에 커밋한 내용을 전달한다.
> origin은 원격, master는 branch

### 깃허브에서 코드 받아오기
1. ```git pull origin master```\
: git 저장소 전체에 있는 것들 pull 받는다.
2. ```git clone ~~~```\
: ~~~에 넣어준 주소에 있는 것만 pull 받는다.

### 🍯꿀팁
1. git에 등록된 user.name과 user.email바꾸는 법
```
git config --unset --global user.name
git config --unset --global user.email

git config --global user.name "홍길동"
git config --global user.email "support@webisfree.com"
```
2. ```git status```\
: 내 코드에서 변화한 상태 및 add된 항목을 확인할 수 있다.
3. ```git remote -v```\
: 어떤 repository와 연결되어있는지 확인 가능
4. ``` git push -u origin master```\
: -u 뒤에 있는 것을 기억해서 git push만 쳐도 뒤에 것도 같이 친 것처럼 사용가능!
