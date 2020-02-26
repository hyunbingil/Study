# .gitignore 하는 방법
## 1. .gitignore 파일을 만든다
1) .git이 있는 폴더경로로 들어가서\
2) vim .gitignore 입력. (git Bash 이용)

## 2. 무시할 파일/폴더를 지정해준다.
1) 입력모드로 들어가서 확장자나 폴더들을 입력하기
> a : 다음 글자, i : 현재 커서, o : 윗줄 하면 입력모드 된다.
>> 리눅스 할 때 했었쥬?
2) 파일 저장하기
ESC 누르고 :wq 입력해서 나간다.
> ESC : 입력모드 나가기, :wq : 저장 후 나가기

- 파일
    - 확장자 모두 무시 : *.apk
    - 특정 파일만 무시 : you.apk
- 폴더
ex) 지금 있는 폴더에 있는 react라는 폴더안에 wow라는 폴더를 지정해주고 싶다면?
``` react/wow/ ```

## 3. 어떤 파일을 Git이 무시하는지 확인해보자.
: cat .gitignore 입력.

## commit된 파일이나 폴더를 무시하고 싶다면?
```
git rm --cached you.apk
git rm --cached *.apk
git rm --cached react/wow/ -r
```