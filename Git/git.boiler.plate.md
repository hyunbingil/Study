## GIT 다운받기
#### 1. 이미 설치 되어있는지 확인
: ```git --version```
#### 2. git 저장소 만들기
: ```git init```
#### 3. git의 상태 보기
: ```git status```\
1)) 아무것도 안한 상태(working directory)\
2)) staging area\
: ```git add```를 하면 이 공간으로 저장이 되는데, 이것은 git에만 있는 개념으로 git repository에 들어가기 전에 대기시켜주는 것.\
3)) Git repository(LOCAL)\
: ```git commit```을 하면 저장소에 올라간다.\
4)) Git repository(REMOTE)\
: ```git push```를 해서 github에 올리기!
<img src = '/img/git_status.PNG'>

### 🍯꿀팁🍯: .gitignore
1. add 전에 무시하는 방법\
: .gitignore을 만들고 안에 무시할 폴더나 파일을 적어주면 끝!
2. add 후 무시하는 방법\
: ```git rm -- cached 무시할것 -r```해서 지워주고 위와 똑같이 해주기!

## GIT VS GIT HUB
### GIT
: 우리의 소스 코드를 관리할 수 있는 툴
### GIT HUB
: GIT으로 관리하고 있는 코드들을 GIT HUB에 올려서, 많은 사람들과 공유하고 수정할 수 있게 해주는 클라우드 서비스
### SSH를 이용해서 GITHUB 연결하기.
: 컴퓨터와 git hub 서버와 안전하게 통신하는 방법이 없어서 error가 발생한다.\
=> 그래서 SSH를 설정하자!
#### 1. SSH 설정되어있는지 확인
: ```ls -a ~/.ssh```
#### 2. SSH 설정하기(만들기)
: https://help.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent

1)) ```$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"```
> 이메일 자신꺼 입력하기

2)) 엔터 마구 눌리기\
#### 3. SSH Agent를 Background에 킨다.
: ```$ eval $(ssh-agent -s)```
> SSH Agent pid가 나온다.
#### 4. SSH private key 추가하기
: ```$ ssh-add ~/.ssh/id_rsa```
#### 5. SSH key를 복사하기
: ```$ clip < ~/.ssh/id_rsa.pub```
- 나처럼 bash: clip: command not found 라는 오류가 뜰 경우?\
: ```cat ~/.ssh/id_rsa.pub```해서 직접 복사하기!
#### 6. github에 넣어주기
: settings에 들어가서 SSH 메뉴 눌러서 NEW에 들어가서 복사한 거 넣어주기!
#### 7. repository랑 연결하기
: ```git init```\
: ```git remote add origin 주소```