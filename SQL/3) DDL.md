## DDL (데이터 정의 언어)
: 레코드를 담기 위한 테이블을 정의하고, 여러 테이블에 대한 관계를 설정할 때 사용하는 SQL 문법.\
: 테이블뿐만 아니라 함수나 프로시져, 뷰 등을 정의할 때도 사용함.\
=> 어떤 객체를 정의할 때 사용한다고 생각하기.\
: 크게 CREATE, ALTER, DROP, TRUNCATE 문으로 구성되어 있다.

## CREATE
: 객체를 생성하는데 사용하는 명령어.
### 데이터 베이스 생성하기
: 데이터 베이스는 여러 객체(테이블, 함수, 프로시져)를 담고 있는 상위 객체이다.\
=> 데이터베이스를 실행한 뒤 가장 먼저 사용할 데이터베이스를 선택해주어야 테이블 또는 레코드를 조작할 수 있다.
- __데이터 베이스 목록 불러오기__
``` sql
SHOW DATABASES;
```
> nformation_schema, mysql, performance_schema, sys 데이터베이스는 MariaDB나 MySQL을 설치할 때 생성되는 기본 데이터베이스로, 데이터베이스 설정과 관련된 자료들을 포함한다.

- __데이터 베이스 추가하기__
``` sql
CREATE DATABASE NANNY;
SHOW DATABASES;
```

### 테이블 생성하기
: 데이터베이스에 객체(테이블 등)를 생성하려면 먼저 해당 데이터베이스를 사용하겠다고 '선택'해야 함.
- __사용할 데이터 베이스 선택하기__
``` sql
USE NANNY;
```
> 데이터 베이스 선택 성공? ```Database changed``` 메시지 확인 가능함.
- __데이터 베이스 선택하기__
``` sql
SELECT DATABASE();
```
- __레코드를 담을 테이블 생성하기__
``` sql
CREATE TABLE 테이블명(
  "필드1 이름"  "필드1 자료형" "필드1 설정 옵션",
  "필드2 이름"  "필드2 자료형" "필드2 설정 옵션",
  ...
  "필드n 이름"  "필드n 자료형" "필드n 설정 옵션",
);
```
1. __테이블명__\
: 필수 구성 요소.\
: 문자로 시작, 중복 이름 X, SQL 키워드는 테이블명으로 사용 X.
2. __필드명__\
: 해당 테이블에서 사용할 필드의 이름.\
: 필수 구성 요소.
3. __자료형__\
: 해당 필드에 입력할 레코드의 자료형.\
: 필수 구성 요소.
4. 필드 속성\
: 필드마다 개별 속성을 지정할 수 있음.
    - NOT NULL\
: NOT NULL을 사용하면 해당 필드는 NULL 레코드를 허용하지 않음.\
=> 해당 칼럼에 NULL로 INSERT나 UPDATE를 시도하면 오류가 발생함.\
~> 반대로 이 키워드를 사용하지 않는 경우 해당 필드는 NULL을 허용한다.
    - AUTO_INCREMENT\
: 레코드가 추가되면 자동으로 값이 증가하는 필드임을 의미하는 필드 속성.
    - DEFAULT\
: 레코드를 생성 및 수정할 때 해당 필드에 값 입력이 생략될 경우 기본으로 입력될 값을 지정할 수 있는 필드 속성.

``` SQL
CREATE TABLE DWELLERS(
NO				INT(10)			NOT NULL,
SECTION		INT(10) 		NOT NULL,
NAME			VARCHAR(20)	NOT NULL,
MOVE_IN		DATE				NOT NULL,
MOVE_NOTI	DATE,
HAVE_CAR	CHAR(1)			NOT NULL	DEFAULT 'N'
);
```
> 성공? ```Query OK``` 메시지 확인 가능함.

- __생성된 테이블 확인하기__
``` sql
SHOW TABLES;
```
``` SQL
CREATE TABLE DWELLERS(
NO				INT(10)			NOT NULL,
SECTION		INT(10) 		NOT NULL,
NAME			VARCHAR(20)	NOT NULL,
MOVE_IN		DATE				NOT NULL,
MOVE_NOTI	DATE,
HAVE_CAR	CHAR(1)			NOT NULL	DEFAULT 'N'
);

SHOW TABLES;
```

## ALTER
: 객체를 수정할 때 사용하는 명령어.
### 테이블에 필드 추가하기.
``` sql
ALTER TABLE DWELLERS ADD PHONE VARCHAR(20);
```
> DWELLERS 테이블에 PHONE을 ADD한다.
- __특정 테이블의 필드 목록 확인__
``` sql
DESC 테이블명
```
- __특정 필드의 다음 위치에 새로운 필드 추가__\
: ```ALTER```문과 ```ADD```, ```AFTER``` 키워드를 조합하면 된다.
``` SQL
ALTER TABLE DWELLERS ADD GENDER CHAR(1) NOT NULL AFTER NAME;
DESC DWELLERS; #테이블 확인하기
```
- __가장 맨 앞에 새로운 필드 추가__\
: ```FIRST``` 키워드 사용하기.
``` sql
ALTER TABLE DWELLERS ADD BIRTH DATE FIRST;
DESC DWELLERS; #테이블 확인하기
```
### 필드 수정하기
: 이미 존재하는 필드의 요소 수정.\
: ```ALTER```문과 ```CHANGE``` 키워드 조합해 사용.
``` sql
ALTER TABLE DWELLERS CHANGE PHONE TEL VARCHAR(20);
DESC DWELLERS; #테이블 확인하기
```
> 이 때, 필드명만 쓰면 에러가 난다. 꼭 자료형도 같이 써주기!
>> 바꾸지 않을 거면 그 전의 자료형 써주기.

### 자료형 수정하기
: 특정 필드의 자료형 또한 ```MODIFY``` 키워드를 통해 간단히 변경 가능.
> 자료형을 변경할 테이블에 레코드가 존재하는지, 자료형을 바꿨을 때 이미 존재하는 레코드는 어떤 영향을 받는지 충분히 검토!
``` sql
ALTER TABLE DWELLERS MODIFY TEL INT(11);
DESC DWELLERS; #테이블 확인하기
```

### 필드 삭제하기
: ```DROP``` 키워드를 사용하면 특정 필드를 삭제할 수 있다.
> 레코드가 존재하는 테이블에서 필드를 삭제하면 해당 필드의 데이터도 함께 삭제되니 조심하기.
``` sql
ALTER TABLE DWELLERS DROP TEL;
DESC DWELLERS; #테이블 확인하기
```

### 테이블 명 변경하기
: ```RENAME``` 키워드를 이용하면 쉽게 테이블 명을 변경할 수 있다.
``` sql
ALTER TABLE DWELLERS RENAME PERSONS;
SHOW TABLES;

ALTER TABLE PERSONS RENAME DWELLERS;
SHOW TABLES;
```

## DROP
: 객체를 삭제할 때 사용하는 명령어.\
: ALTER와 함께 키워드로 사용했었지만, __DROP을 명령어 단독으로 또한 사용할 수 있음.__\
: ```DROP TABLE 명령문```으로 테이블을 삭제.
- 테이블을 만들었다가 삭제 해보자.
``` sql
CREATE TABLE TEMP(
ID		INT(10)			NOT NULL,
NAME	VARCHAR(20)	NOT NULL
);

SHOW TABLES;
```
``` sql
DROP TABLE TEMP;
SHOW TABLES;
```

## TRUNCATE
: 특정 테이블의 모든 데이터를 깨끗하게 청소하는 명령어.\
: 기존 필드들은 그대로 유지한 상태에서 내부에 저장된 레코드만 삭제한다.
> 복구 불가능하니까 꼭 확인하기
- __데이터 베이스 불러오기__
: 테이블 내용을 토대로 필드와 레코드가 입력된 데이터 베이스.
``` sql
DESC EMP;
SELECT * FROM EMP; #레코드를 불러오는 코드입니다
```
- __레코드 삭제하자__
``` sql
TRUNCATE TABLE EMP;
SELECT * FROM EMP;
```
> 결과 : empty set