## 키(key)
: 각각의 레코드를 식별할 수 있는 고유 속성 또는 속성 집합.\
ex) 학번, 주민등록번호 등
: 모든 테이블을 키를 가지고 있다.
> DDL로 키 지정을 생략할 수 있지만, 이 경우 데이터 베이스 내부에서 자동으로 키를 생성함.

### 키(key)의 특징
#### 1. 유일성
: 중복된 값을 허용하지 않음.
> 모든 레코드는 키에 대해 서로 다른 값을 가져야 함.
#### 2. 최소성
: 주민등록번호 없이 학번 하나만으로 키를 구성해도 학생 개개인을 식별할 수 있는데, 이때 최소성을 만족한다고 얘기함.

### 키(key)의 종류
#### 1. 후보키(Candidate Key)
: 테이블을 구성하는 필드 중 각각의 레코드를 식별할 수 있는 __고유 속성의 집합__ 으로, __유일성과 최소성을 모두 만족__ 해야 함.\
: 후보키가 항상 단일 필드로 이루어지지는 않음을 주의.
> ex) ```[EMP_ID]```, ```[EMP_JUMIN]```이 후보키에 해당한다.\
후보키는 최소성을 만족해야 하므로 ```[EMP_ID, EMP_JUMIN]```은 후보키가 될 수 없다.
#### 2. 기본키(Primary Key)
: 후보키 중에서 선택하는 주 키로 __오직 1개만 지정__ 할 수 있다.\
: 해당 필드의 값은 NULL로 지정될 수 없고 중복 값 또한 저장할 수 없다.
> 기본키로 지정된 필드는 테이블에서 특정 레코드를 유일하게 구별할 수 있는 필드가 되기 때문.
#### 3. 대체키(Alternate Key)
: 후보키가 둘 이상일 경우 __기본키를 제외한 나머지 후보키는 대체키__
#### 4. 슈퍼키(Super Key)
: 테이블에서 각각의 레코드를 식별할 수 있는 하나 또는 여러 개 속성의 집합.\
: 유일성만 만족하면 모두 슈퍼키가 가능하다.
> 후보키로 선별했던 ```[EMP_ID]```, ```[EMP_JUMIN]```은 당연히 슈퍼키,\
```[EMP_ID, EMP_JUMIN]```도 슈퍼키가 될 수 O,\
```[EMP_ID, EMP_NAME]```과 같이 고유하지 않을 수 있는 필드(EMP_NAME)도 고유한 필드(EMP_ID)와 조합하여 슈퍼키로 사용O

## 제약조건이란?
: 테이블에 잘못된 레코드가 입력되는 것을 막기 위해 설정한 여러가지 규칙.\
: 데이터의 무결성, 즉 데이터베이스에서 정확하고 유효한 데이터를 일관적으로 관리하려면 제약 조건이 올바르게 설정되어야만 한다.\
### 특징
: 테이블을 생성하거나 필드를 추가할 때 설정할 수 있으며, 한 번 추가한 제약 조건은 수정할 수 없다.\
: 제약 조건을 수정하고 싶다면 기존에 설정된 제약 조건을 삭제한 다음 다시 제약 조건을 추가해야 한다.
> 바로 수정이 안된다는 소리^^

### NOT NULL
: 해당 필드에 입력되는 값이 NULL이 될 수 없음.\
=> 값이 필수로 입력되어야 한다.
``` sql
CREATE TABLE CON1(
NAME	VARCHAR(10),
AGE		INT					NOT NULL
);
```
- 테이블에 새로운 레코드를 추가
``` sql
INSERT INTO CON1(NAME, AGE) VALUES('KIM', NULL);
```
> ```Column 'AGE' cannot be null```이라는 에러 메시지가 출력된다.

### UNIQUE
: 해당 칼럼에 입력될 값 각각이 모두 고유값이어야 하며 중복을 허락하지 않음을 의미한다.
> 키로 지정되는 칼럼은 유일성을 지녀야 하기 때문에 ```UNIQUE```를 유용하게 사용이 가능하다.
``` sql
CREATE TABLE CON2(
NAME	VARCHAR(10),
AGE 	INT					UNIQUE
);
```
- 테이블에 새로운 레코드 추가
``` sql
INSERT INTO CON2(NAME, AGE) VALUES('Tim', 20);
```
``` sql
INSERT INTO CON2(NAME, AGE) VALUES('James', 20);
```
> AGE에 20이라는 값이 입력되었기 때문에, 같은 값을 가지는 레코드는 삽입 X.

### 이 외 중요 제약 조건
#### PRIMARY KEY
: 해당 필드를 기본키로 설정한다. 간략하게 PK라고도 적음.
#### FOREIGN KEY
: 해당 필드를 외래키로 설정한다. 간단하게 FK라고도 적음.
#### DEFAULT
: 값을 입력하지 않은 경우 기본으로 넣을 값을 지정함.
#### AUTO_INCREMENT
: 정수 혹은 부동 소수점 자료형인 필드에만 설정 가능한 제약 조건이다. 이 조건을 설정하면 레코드를 추가할 때 시작 값에서 1씩 증가하는 고유 번호를 자동으로 생성한다. __```AUTO_INCREMENT``` 제약 조건을 설정할 필드는 반드시 키로 지정되어 있어야 한다는 것__ 을 주의하자.

## 제약 조건 설정
: 제약 조건은 테이블을 생성할 때 ```CREATE```문과 함께 설정하거나, 기존 테이블에 ```ALTER```문을 통해 추가할 수 있음.
## CREATE문
### 새 테이블에 PRIMARY KEY로 제약 조건 걸기
: 기본키로 설정할 필드는 반드시 NOT NULL이어야 한다.\
: PK 제약 조건은 한 테이블에서 딱 한 번 설정할 수 있다.
1. PRIMARY KEY 키워드를 필드에 직접 지정
``` sql
CREATE TABLE CON1(
ID		INT					NOT NULL	PRIMARY KEY,
NAME	VARCHAR(10),
AGE		INT
);
```
2. CREATE TABLE 명령문 마지막에 적어 지정할 수 있음.
``` sql
CREATE TABLE CON1(
ID		INT					NOT NULL,
NAME	VARCHAR(10),
AGE		INT,
PRIMARY KEY(ID)
);
```
#### 복합 필드를 기본키로 지정할 수 있다.
``` sql
CREATE TABLE CON1(
ID		INT					NOT NULL,
NAME	VARCHAR(10)	NOT NULL,
AGE		INT,
PRIMARY KEY(ID, NAME)
);
```
#### ```CONSTRAINT``` 키워드 사용
: 제약 조건에 별도의 이름 지정.\
> ex) ```ID``` 필드의 키 항목에 ```PRI```가 작성되어 해당 필드가 PK임을 알 수 있음.
``` sql
CREATE TABLE CON1(
ID		INT					NOT NULL,
NAME	VARCHAR(10),
AGE		INT,
CONSTRAINT PK_TEST PRIMARY KEY (ID)
);

DESC CON1;
```
> ID 필드를 기본키로 설정하며 제약 조건 이름을 PK_TEST로 지정하는 예시

### 새 테이블에 UNIQUE로 제약 조건 걸기
: UNIQUE 제약 조건 또한 PK와 비슷하게 지정할 수 있음.\
: 여러 필드에 설정 가능하다는 점이 PK와 다름.\
: NOT NULL이 아닌 필드에도 설정할 수 있음.
> 단, NULL 값에 대해서는 UNIQUE 제약이 적용되지 않으니 주의
1. UNIQUE 키워드를 필드에 직접 지정.
``` sql
CREATE TABLE CON2(
ID		INT					UNIQUE,
NAME	VARCHAR(10)	UNIQUE,
AGE	INT
);
```
2. CREATE TABLE 명령문 마지막에 적어 지정할 수 있음.
``` sql
CREATE TABLE CON2(
ID		INT,
NAME	VARCHAR(10),
AGE		INT,
UNIQUE(ID),
UNIQUE(NAME)
);
```
#### UNIQUE 제약 조건을 필드별로 설정할 때와 복합적으로 설정할 때 차이점을 지님.
- 필드 각각 UNIQUE 제약 조건을 설정.\
: 필드별로 고유값이 적용되어 중복을 허용하지 않음.
``` sql
CREATE TABLE CON3(
ID		INT					UNIQUE,
NAME	VARCHAR(10),
AGE		INT					UNIQUE
);

INSERT INTO CON3(ID, NAME, AGE) VALUES (1001, 'Han', 22); # 실행 확인 후 지워주세요
INSERT INTO CON3(ID, NAME, AGE) VALUES (1002, 'Kang', 22); # 실행 확인 후 지워주세요
```
> ERROR 1062 (23000) at line 8: Duplicate entry '22' for key 'AGE'

- CREATE TABLE 명령문 마지막에 적어 지정할 때.
``` sql
CREATE TABLE CON4(
ID		INT,
NAME	VARCHAR(10),
AGE		INT,
UNIQUE(ID, AGE)
);

INSERT INTO CON4(ID, NAME, AGE) VALUES (1001, 'Han', 22); # 실행 확인 후 지워주세요
INSERT INTO CON4(ID, NAME, AGE) VALUES (1002, 'Kang', 22); # 실행 확인 후 지워주세요
```
> 중복 허용이 되지 않는다고 했는데 특정 필드가 중복되어도 값이 삽입된다.

- CREATE TABLE 명령문 마지막에 적어 지정할 때 오류?\
: 두 개의 값이 함께 중복될 때만 제약 조건 오류가 발생함.
``` sql
CREATE TABLE CON4(
ID		INT,
NAME	VARCHAR(10),
AGE		INT,
UNIQUE(ID, AGE)
);

INSERT INTO CON4(ID, NAME, AGE) VALUES (1001, 'Han', 22); # 실행 확인 후 지워주세요
INSERT INTO CON4(ID, NAME, AGE) VALUES (1002, 'Kang', 22); # 실행 확인 후 지워주세요
INSERT INTO CON4(ID, NAME, AGE) VALUES (1002, 'Kang', 22); # 실행 확인 후 지워주세요
```
> ERROR 1062 (23000) at line 10: Duplicate entry '1002-22' for key 'ID'

### 그 외 제약 조건 걸기
: ```NOT NULL```, ```DEFAULT```, ```AUTO_INCREMENT```를 통해 제약 조건을 걸어보자.
``` sql
CREATE TABLE CON5(
ID			INT(10)		NOT NULL	AUTO_INCREMENT	PRIMARY KEY,
NAME		CHAR(15),
GENDER	    CHAR(1)		DEFAULT 'M',
CNT			INT(10)		NOT NULL
);
```
1. ID 필드는 NOT NULL 필드이니 NULL을 허용하지 않고, 유일성 및 최소성을 만족하여 기본키로 설정(PK). AUTO_INCREMENT 설정으로 인해 새로운 레코드가 추가될 때마다 해당 필드의 값이 1씩 증가함.
2. NAME 필드는 제약 조건을 갖고 있지 않음. 레코드를 추가할 때 해당 필드를 생략하는 경우 기본 값으로 NULL이 지정된다.
3. GENDER 필드는 DEFAULT 제약 조건이 있기 때문에 해당 필드를 생략하고 레코드를 추가하면 기본 값으로 'M'이 지정된다.
4. CNT 필드는 NOT NULL 필드이기 때문에 NULL을 허용하지 않으며, DEFAULT 제약 조건을 생략했기 때문에 레코드를 삽입할 경우 반드시 값을 입력해야 한다.