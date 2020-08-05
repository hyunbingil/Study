### ref 오류
: pull 받을 때 생긴 오류
```
error: cannot lock ref 'refs/remotes/origin/master': 
```
- 해결방법
```
rm .git/refs/remotes/origin/master
git fetch
```