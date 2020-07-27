# 외래키와 참조 무결성
## 외래키(Foreign Key)
: 다른 테이블의 기본키를 참조하는 속성.
> 테이블 사이에 물리적인 연결이 생성되는 것.

## 참조 무결성
: 기본키와 외래키 사이의 관계가 항상 유지되는 것을 뜻하며, 이를 외래키 무결성이라고도 부름.

### 외래키 설정하기
: EMP_ORDER 테이블의 EMP_ID 필드는 EMP 테이블의 EMP_ID 필드를 참조하고 있으면, __EMP_ORDER 테이블의 EMP_ID 필드를 외래키로 설정해주어야 함.__
``` sql
ALTER TABLE <테이블 명> ADD CONSTRAINT <제약 조건 명> FOREIGN KEY (칼럼 명) REFERENCES <부모 테이블> (부모 테이블의 기본키 필드명);
```
- 예시
``` sql
ALTER TABLE EMP_ORDER ADD CONSTRAINT FK_ORDER_EMP_ID FOREIGN KEY(EMP_ID) REFERENCES EMP(EMP_ID);
```

### 외래키 설정 확인하기
: ```INFORMATION_SCHEMA``` 데이터베이스의 ```TABLE_CONSTRAINTS``` 테이블에서 외래키 설정을 확인
- 예시
``` sql
SELECT * FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE TABLE_NAME='EMP_ORDER';
```
> FK_ORDER_EMP_ID라는 제약 이름으로 외래키 제약 조건이 추가되었음. CONSTRAINT_TYPE 필드의 FOREIGN KEY 값을 확인해보자.
### 참조 무결성 확인하기
``` sql
INSERT INTO EMP_ORD(ORD_ID, EMP_ID, ORD_NAME, ORD_DATE) VALUES (2000, 1001, '커피', '2019-08-11');
```
1. EMP, EMP_ORDER 테이블에 아무 레코드가 없는 상태에서 EMP_ORDER 테이블에 레코드를 추가.
2. 외래키 제약 조건을 위배하여 레코드를 삽입할 수 없다는 에러 메시지를 볼 수 있다.
3. EMP 테이블의 EMP_ID가 1001인 레코드를 생성해주면 된다.

### ON 키워드
: ON 키워드를 통해 여러 가지 제약 조건을 부여하여 참조 무결성을 유지하도록 한다.\
: 외래키 설정 방법에서 ```REFERENCES...``` 뒤에 ON을 붙임으로써 제약 조건을 추가할 수 있다.\
=> ```ON UPDATE SET ...``` 와 ```ON DELETE SET ...```를 사용함.\
=> 이 제약 조건에는 NO ACTION, RESTRICT, CASCADE, SET NULL 이 있다.
``` sql
ALTER TABLE <테이블 명> ADD CONSTRAINT <제약 조건 명> FOREIGN KEY (칼럼 명) REFERENCES <부모 테이블> (부모 테이블의 기본키 필드명)
	ON UPDATE SET <UPDATE 제약 조건>
	ON DELETE SET <DELETE 제약 조건>;
```
#### NO ACTION, RESTRICT
: ON 키워드 설정이 생략되었다면 ```ON UPDATE/DELETE SET NO ACTION``` 옵션이 기본 설정된다.\
- NO ACTION\
: 외래키가 참조하는 테이블에서 레코드의 기본키 값을 수정하거나 레코드를 삭제하는 행위를 방지한다.\
=> 참조하는 테이블에서해당 레코드의 기본키를 더 이상 참조하지 않아야 수정 및 삭제가 가능하다.

#### SET NULL
- ON UPDATE와 사용\
: 외래키가 참조하는 기본키 값이 변경되었을 때 해당 외래키 값이 NULL로 변경된다.
- ON DELETE와 사용\
: 외래키가 참조하는 기본키의 값이 삭제되었을 때 해당 외래키 값이 NULL로 변경된다.

__이때, 해당 외래키 값은 반드시 NUL을 허용해야 한다. 허용하지 않으면 오류가 발생함.__
> errno: 150 "Foreign key constraint is incorrectly formed"

### 제약조건 제거하기
: 한 번 추가한 제약 조건은 변경이 불가하며, 제약 조건을 변경하려면 기존에 설정된 제약 조건을 삭제한 뒤 제약 조건을 새로 추가해야 한다.
#### 1. PRIMARY KEY 제약 조건 제거하기
``` sql
ALTER TABLE <테이블명> DROP PRIMARY KEY;
```
#### 2. UNIQUE 제약 조건 제거하기
``` sql
ALTER TABLE <테이블명> DROP INDEX <제약조건명>;
```
#### 3. 외래키 제약 조건 제거하기
``` sql
ALTER TABLE <테이블명> DROP FOREIGN KEY <제약조건명>;
```
