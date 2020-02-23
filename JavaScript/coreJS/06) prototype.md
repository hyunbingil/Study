## Chapter. 06. 프로토타입
: 자바스크립트는 프로토타입 기반 언어.\
-> 어떤 객체를 원형(prototype)으로 삼고 이를 복제(참조)함으로써 상속과 비슷한 효과를 얻는다.
> 클래스 상속 대신 사용.
### 프로토타입의 개념 이해
#### 01. constructor, prototype, instance

    var instance = new Constructor();

- 어떤 생성자 함수(constructor)를 new 연산자와 함께 호출하면
- constructor에서 정의된 내용을 바탕으로 새로운 instance가 생성된다.
- 이때, instance에는 __proto__라는 프로퍼티가 자동으로 부여되는데,
- 이 프로퍼티는 constructor와 prototype이라는 프로퍼티를 참조한다.
> prototype, __proto__라는 프로퍼티의 관계가  프로토타입 개념의 핵심 !

```
constructor · prototype
-------------------
|                    /
|                   /
| new            /
|                 /
instance · __proto__
```

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

##### 설명 ON
: Person이라는 생성자 함수의 prototype에 getName이라는 메서드를 지정.
``` js
var Person = function(name) {
    this._name = name;
};
Person.prototype.getName = function() {
    return this._name;
};
```
> Person의 인스턴스는 __proto__ 프로퍼티를 통해 getName을 호출할 수 있음.
>> Because instance의 __proto__가 Constructor의 prototype 프로퍼티를 참조해서 결국 둘은 같은 객체를 바라본다.
``` js
var suzi = new Person('Suzi');
suzi.__proto__.getName(); // undefined

Person.prototype === suzi.__proto__ // true
```
- 메서드 호출 결과로 undefined가 왜 나왔나?
~> 'Suzi'라는 값이 나오지 않은 것보다는 '에러가 발생하지 않았다'는 점이 우선.\
: undefined가 나왔다는건 이 변수가 '호출할 수 있는 함수'에 해당한다는 것을 의미.
> 함수가 아닌 다른 데이터 타입이면 TypeError가 발생했을 것.

==> 값이 에러가 아닌 다른 값이 나왔으므로 getName이 실제로 실행됐음을 알 수 있고, 함수라는 것이 입증 되었음.

##### 설명 ON 2 : 함수 내부에서 어떤 값을 반환하는가.
: this.name 값을 리턴하는 내용으로 구성.
> 하지만, 지금 this에 바인딩된 대상이 잘못 지정되었다는 것.

: 메서드로서 호출할 때는 메서드명 바로 앞의 객체가 곧 this가 된다고 했는데, 그렇다면 this는 suzi.__proto__라는 객체가 되는 것이다. but 이 객체 내부에는 name 프로퍼티가 없으니(찾고자 하는 식별자 정의X) error 대신 undefined를 반환함.

- 만약에 __proto__ 객체에 name 프로퍼티가 있다면?
``` js
var suzi = new Person('Suzi');
suzi.__proto__._name = 'SUZI__proto__';
suzi.__proto__.getName(); // SUZI__proto__
```
> 잘 출력된다.
>> 관건은 this이다!

- this를 인스턴스로 할 수 있는 방법은 없나..?
: __proto__ 없이 인스턴스에서 곧바로 메서드를 쓰면 된다.
``` js
var suzi = new Person('Suzi', 28);
suzi.getName(); // Suzi
var iu = new Person('Jieun', 28);
iu.getName(); // Jieun
```
> __proto__를 빼면 this는 instance가 되는 게 맞지만, 이대로 메서드가 호출되고 원하는 값이 나오는 거, 이상하지 않니?
>> 그건 바로 __proto__가 생략 가능한 프로퍼티이기 때문임.

```
constructor · prototype
------------
|            /
|           /
| new    /
|         /
instance · (__proto__)
```
> __proto__ 생략 X : this는 suzi.__proto__
> __proto__ 생략 O : this는 suzi
>> suzi.__proto__에 있는 메서드인 getName을 실행하지만 this는 suzi를 바라보게 할 수 있게 된 것.

### "new 연산자로 Constructor를 호출하면 instance가 만들어지는데, 이 instance의 생략 가능한 프로퍼티인 __proto__는 Constructor의 prototype을 참조한다!" 

#### 프로토 타입의 상세한 개념
1. 함수에 자동으로 객체인 prototype 프로퍼티를 생성
2. 해당 함수를 생성자 함수로 사용(new 연산자와 함께 호출)하면
3. 그로부터 생성된 인스턴스에는 숨겨진 프로퍼티인 __proto__가 자동으로 생성되며
4. 이 프로퍼티는 생성자 함수의 prototype 프로퍼티를 참조.
5. __proto__ 프로퍼티는 생략 가능하도록 구현되어 있어
> 생성자 함수의 prototype에 어떤 메서드나 프로퍼티가 있다면 인스턴스에서도 마치 자신의 것처럼 해당 메서드나 프로퍼티에 접근 O.

##### 프로토 타입의 출력 색상 차이
1. 짙은색
: enumerable, 열거 가능한 프로퍼티
2. 옅은색
: innumerable, 열거할 수 없는 프로퍼티.
> for in 등으로 객체의 프로퍼티 전체에 접근하고자 할 때 접근 가능 여부를 색상으로 구분지어 표현.

##### 예시) 대표적인 내장 생성자 함수 Array를 바탕으로 이해하면 easy.
Array로 새로운 arr만들면 우리가 배열에서 사용하는 메서드들이 거의 모두 arr에 들어가있고 Array 함수의 정석 메서드인 from, isArray, of 같은 것들은 인스턴스가 직접 호출 X. (왜냐면 arr에 없엉)
``` js
var arr = [1, 2];
arr.forEach(function () {});
Array.isArray(arr);
arr.isArray();
```

#### 02. cosntructor 프로퍼티
: 생성자 함수의 프로퍼티인 prototype 객체 내부에는 constructor라는 프로퍼티가 있음. 인스턴스 __proto__ 객체 내부에도 마찬가지.\
: 단어 그래도 원래의 생성자 함수(자기 자신)를 참조.
> 인스턴스로부터 그 원형이 무엇인지 알 수 있는 수단

``` js
var arr = [1, 2];
Array.prototype.constructor === Array //True
arr.__proto__.constructor === Array //True
arr.constructor === Array //True

var arr2 = new arr.constructor(3, 4); // __proto__ 생략 가능해서 인스턴스에서 직접 constructor에 접근할 수 있는 수단이 생겨 오류 없이 동작함.
console.log(arr2); // [3, 4]
```

: 읽기 전용 속성이 부여된 예외적인 경우를 제외하고는 값 바꾸기 가능.
> 기본형 리터럴 변수 - number, string, boolean

=> constructor를 변경하더라도 참조하는 대상이 변경될 뿐 이미 만들어진 인스턴스의 원형이 바뀐다거나 데이터 타입이 변하는 것은 X.

: 어떤 인스턴스로부터 생성자 정보를 알아내는 유일한 수단임.