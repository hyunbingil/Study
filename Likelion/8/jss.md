## CRUD
: Create Read Update Delete
### Model & Database
: 원래 database에 접근할 때 sql문을 이용하는데, django에서는 ORM을 이용해서 sql문을 사용하지 않아도 접근이 가능하다.

### Object
: 개별 객체들...
#### 1. id
: 자동으로 생성되며, 겹치지 않는 고유한 값이다.(pk, primary key)
> id가 2번인 친구를 없애도 뒤에 값들이 앞으로 당겨지지 X
>> 2번 자체가 없어지는 것.
#### 2. title
: 제목
#### 3. content
: 내용
#### 4. created.at
: 언제 만들어졌나?

### 실습: 자소서..사이트...

### 🍯꿀팁
#### CSS 적용이 안되는 경우
: ```shift + F5```하면, 캐시가 삭제되면서 새로고침이 되니 사용하자.