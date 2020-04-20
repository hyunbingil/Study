## GIT 다운받기
#### 1. 이미 설치 되어있는지 확인\
: ```git --version```
#### 2. git 저장소 만들기\
: ```git init```
#### 3. git의 상태 보기\
: ```git status```
1)) 아무것도 안한 상태(working directory)\
2)) staging area\
: ```git add``를 하면 이 공간으로 저장이 되는데, 이것은 git에만 있는 개념으로 git repository에 들어가기 전에 대기시켜주는 것.\
3)) Git repository(LOCAL)\
: ```git commit```을 하면 저장소에 올라간다.\
4)) Git repository(REMOTE)\
: ```git push```를 해서 github에 올리기!
<img src = './git_status.PNG'>

### 🍯꿀팁🍯: .gitignore
1. add 전에 무시하는 방법\
: .gitignore을 만들고 안에 무시할 폴더나 파일을 적어주면 끝!
2. add 후 무시하는 방법\
: ```git rm -- cached 무시할것 -r```해서 지워주고 위와 똑같이 해주기!
3. ```touch test.html```
: 뒤에 있는 파일을 만들어달라!
4. README.md 파일 만들고 push 안되는 경우 pull을 써도 안되는 경우\
=> ```git pull origin 브런치명 --allow-unrelated-histories``` 쓰면 된다. 크!


## GIT VS GIT HUB
### GIT
: 우리의 소스 코드를 관리할 수 있는 툴
### GIT HUB
: GIT으로 관리하고 있는 코드들을 GIT HUB에 올려서, 많은 사람들과 공유하고 수정할 수 있게 해주는 클라우드 서비스
### SSH를 이용해서 GITHUB 연결하기.