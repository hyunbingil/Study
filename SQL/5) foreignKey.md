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
