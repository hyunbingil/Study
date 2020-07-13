## SQL이란?
: Structured Query Language (구조적 질의 언어)의 줄임말로, 관계형 데이터베이스 시스템(RDBMS)에서 자료를 관리 및 처리하기 위해 설계된 언어이다.

### SQL 문법의 종류
#### 1. 데이터 정의 언어 DDL(Data Definition Language)
: 각 릴레이션을 정의하기 위해 사용하는 언어.
> CREATE, ALTER, DROP 등
#### 2. 데이터 조작 언어 DML(Data Manipulation Language)
: 데이터를 추가/수정/삭제하기 위한, 즉 데이터 관리를 위한 언어.
> SELECT, INSERT, UPDATE 등
#### 3. 데이터 제어 언어 DCL(Data Control Language)
: 사용자 관리 및 사용자별로 릴레이션 또는 __데이터를 관리하고 접근하는 권한을 다루기 위한 언어.__
> GRANT, REVOKE 등

### SQL의 언어적 특징
#### 1. SQL은 대소문자를 가리지 않음.
> 단, 서버 환경이나 DBMS 종류에 따라 데이터베이스 또는 필드명에 대해 대소문자를 구분하기도 함.
#### 2. SQL 명령은 반드시 세미콜론(;)으로 끝나야 함.
#### 3. __고유의 값__ 은 따옴표('')로 감싸준다.
```
SELECT * FROM EMP WHERE NAME = 'hyunbin';
```
#### 4. SQL에서 __객체를 나타낼 때__ 는 백틱(``)으로 감싸준다.
```
SELECT `COST`, `TYPE` FROM `INVOICE`;
```
#### 5. 주석
- 한 줄 주석은 문장 앞에 -- 를 붙여서 사용함.
```
-- SELECT * FROM EMP; 이 쿼리는 실행되지 않습니다.
```
- 여러 줄 주석은 /* */ 로 감싸준다.
```
/* 
SELECT * FROM EMP WHERE EMPID=(SELECT * FROM EMP WHERE NAME='홍길동')
*/
```