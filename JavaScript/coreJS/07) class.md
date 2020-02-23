## Chapter. 07. 클래스
: 자바스크립트는 프로토타입 기반 언어이기 때문에 '상속'개념이 존재하지 않는다.
> 클래스와 비슷하게 동작하게끔 흉내 내는 여러 기법들이 탄생했고, 클래스 문법이 추가되었다.
>> 하지만 클래스에서도 일정 부분은 프로토타입을 활용하고 있고, 클래스를 흉내내기 위한 구현 방식을 학습하는 것은 여전히 큰 의미가 있다.

### 01. 클래스와 인스턴스의 개념 이해
- 상위 클래스 (superclass) / 하위 클래스 (subclass)
: 하위 클래스는 상위 개념을 포함하면서 더 구체적인 개념이 추가된다.
> 상위의 (superior) / 하위의 (subordinate)
>> super-superclass, sub-subclass 가능 !

- 인스턴스(instance)
: 어떤 클래스의 속성을 지니는 실존하는 개체
> 클래스는 붕어빵틀, 인스턴스는 붕어빵이겠지 ㅋ.ㅋ

: 사용자가 직접 여러 가지 클래스를 정의해야하고, 클래스를 바탕으로 인스턴스를 만들 때 비로소 어떤 개체가 클래스의 속성을 지니게 된다.

: 한 인스턴스는 하나의 클래스만을 바탕으로 만들어짐
> 한 인스턴스가 여러개의 클래스에 속할 수는 있지만 인스턴스 입장에서는 이 클래스들이 '직계존속'이다.
>> 호출할 수 있는 클래스는 오직 하나.

### 02. 자바스크립트의 클래스
ex) 생성자 함수 Array를 new 연산자와 함께 호출하면 인스턴스가 생성된다. 이때 Array의 prototype 객체 내부 요소들이 인스턴스에 상속된다고 볼 수 있음.
> 엄밀히는 프로토타입 체이닝에 의한 참조.
>> but 결과적으로는 동일하게 동작.
>>> Array 내부 프로퍼티들 중 prototype 프로퍼티를 제외한 나머지는 인스턴스에 상속 X.

#### 스태틱 멤버 (static member) / 인스턴스 멤버(instance member)
: 인스턴스에 상속되는지(인스턴스가 참조하는지) 여부에 따라 나뉨.
> 클래스 입장 : 사용 대상에 따라 구분한 것.
- 프로토타입 메서드 : 인스턴스에서 직접 호출할 수 있는 메서드
- 스태틱 메서드 : 인스턴스에서 직접 접근할 수 없는 메서드

#### 프로토타입에 클래스 개념을 적용
- Class
    - Array
        - from(), isArray(), of() : static methods
        - arguments, length, name : static properties
        - prototype
            - push(), pop(), forEach(), map(), concat(), .... : prototype(instance) methods
- instance
    - [1, 2]            
> 프로토타입 메서드
>> 자바스크립트에서는 인스턴스에서도 직접 메서드를 정의할 수 있기 때문에 '인스턴스 메서드'라는 명칭은 프로토타입에 정의한 메서드를 지칭하는 것인지 인스턴스에 정의한 메서드를 지칭하는 것인지에 대해 혼란을 야기하기 때문에 이렇게 부르는 편이 더 좋음.

``` js
var Rectangle = function (width, height) {
    this.width = width;
    this.height = height;
}; // 생성자
Rectangle.prototype.getArea = fucntion () {
    return this.width * this.height;
}; // 프로토타입 메서드 : 인스턴스에서 직접 호출할 수 있는 메서드
Rectangle.isRectangle = function (instance) {
    return instance instanceof Rectangle && instance.width > 0 && instance.height > 0;
}; // 스태틱 메서드 : 인스턴스에서 직접 접근할 수 없는 메서드

var rect1 = new Rectangle(3, 4)
console.log(rect1.getArea()); // 12
console.log(rect1.isRectangle(rect1)); // Error
console.log(Rectangle.isRectangle(rect1)); // true
```
> 스태틱 메서드는 이렇게 생성자 함수를 this로 해야만 호출할 수 있음.

#### 클래스의 취급
- 추상적인 개념
: 구체적인 인스턴스가 사용할 메서드를 정의한 '틀'의 역할을 담당하는 목적을 가질 때
- 개체로서 취급
: 클래스 자체를 this로 해서 직접 접근해야만 하는 스태틱 메서드를 호출할 때

### 03. 클래스 상속
: 04.에 클래스 문법 소개나오니까 이건 가볍게! 예전에 그랬다..! 정도로 보고 넘어가라
> 아니면 허무감 느낀다9...!
#### 1) 기본 구현
: 프로토타입 체인을 활용해 클래스 상속을 구현
