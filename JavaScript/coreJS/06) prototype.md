## Chapter. 06. 프로토타입
: 자바스크립트는 프로토타입 기반 언어.\
-> 어떤 객체를 원형(prototype)으로 삼고 이를 복제(참조)함으로써 상속과 비슷한 효과를 얻는다.
> 클래스 상속 대신 사용.
### 01. 프로토타입의 개념 이해
#### constructor, prototype, instance

    var instance = new Constructor();

- 어떤 생성자 함수(constructor)를 new 연산자와 함께 호출하면
- constructor에서 정의된 내용을 바탕으로 새로운 instance가 생성된다.
- 이때, instance에는 __proto__라는 프로퍼티가 자동으로 부여되는데,
- 이 프로퍼티는 constructor와 prototype이라는 프로퍼티를 참조한다.
> prototype, __proto__라는 프로퍼티의 관계가  프로토타입 개념의 핵심 !

##### prototype과 __proto__
- prototype
: 객체\
: prototype 객체 내부에는 인스턴스가 사용할 메서드를 저장

- __proto__
: 객체\
: 인스턴스에서도 숨겨진 프로퍼티\
: prototype에 저장한 메서드들에 접근할 수 있게 해줌.
> dunder proto라고 발음하면 된다.
>> 실무에서는 가급적 __proto__를 사용 X. 대신 Object.getPrototypeOf() / Object.create() 등을 이용하자.

내일의 나야. 잘부탁해.\
p.149 부터 공부하기^-^