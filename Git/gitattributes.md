### react나 node 프로젝트가 html로 뜰 때
: .gitattributes라는 파일에 이 코드 넣기\
: js 파일만 보도록 지시한다.
```
* linguist-vendored
*.js linguist-vendored=false
```