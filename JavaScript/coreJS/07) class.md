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
### 1) 기본 구현
: 프로토타입 체인을 활용해 클래스 상속을 구현

1. 
``` js
var Grade = function () {
    var args = Array.prototype.slice.call(arguments);
    for (var i = 0; i < args.length; i++) {
        this[i] = args[i];
    }
    this.length = args.length;
};
Grade.prototype = [];
var g = new Grade(100, 80);
```
> 문제 : length 프로퍼티가 configurable(삭제 가능)하다는 점과, Grade.prototype에 빈 배열을 참조시켰다는 점.

2. 
``` js
g.push(90);
console.log(g);

delete g.length;
g.push(70);
console.log(g);
```
> length 프로퍼티는 원래 삭제가 불가능하지만, Grade 클래스의 인스턴스는 배열 메서드를 상속하지만 기본적으로는 일반 객체의 성질을 그대로 지녀서 삭제가 가능해진거..
>> 0번째에 70이 들어가게 되는데 Grade.prototype이 빈 배열 가리키고 있어서...\
~> g.length가 없으니 프로토타입 체이닝을 타고 g.__proto__.length를 읽어온 것.

3. 요소가 있는 배열을 prototype에 매칭
``` js
Grade.prototype = ['a', 'b', 'c', 'd'];
var g = new Grade(100, 80);

g.push(90);
console.log(g);

delete g.length;
g.push(70);
console.log(g); // Grade {0: 100, 1: 80, 2: 90, ____ 4: 70, length: 5}
```
> g.length가 없으니 g.__proto__.length를 찾고, 값이 4니까  인덱스 4에 70을 넣고, 다시 g.length에 5를 부여하는 순서로 동작.

#### 클래스에 있는 값이 인스턴스의 동작에 영향을 주면 X.
> 클래스의 추상성을 해치는 것.

### 기본적인 메서드 상속
: 하위 클래스로 삼을 생성자 함수의 prototype에 상위 클래스의 인스턴스를 부여하는 것만으로도 기본적인 메서드 상속은 가능하지만 __다양한 문제가 발생할 여지가 있어 구조적으로 안전성이 떨어짐.__
1. 하위 클래스의 인스턴스임을 표시하고 안의 값들이 잘 들어있음.
2. 하지만 __proto__는 상위 클래스의 인스턴스임을 표시하고 있고, 안의 값들에 모두 undefined가 할당되어있음.
> 하위클래스.prototype에 값이 존재하는 것이 문제.
>> 이후에 임의로 하위클래스.prototype.값 에 값을 부여하고, sq.width의 값을 지워버린다면 프로토타입 체이닝에 의해 엉뚱한 결과가 나오게 될 것.

### 2) 클래스가 구체적인 데이터를 지니지 않게 하는 방법
: 인스턴스와의 관계에서는 구체적인 데이터를 지니지 않고 오직 인스턴스가 사용할 메서드만을 지니는 추상적인 '틀'로서만 작용하게끔 작성하지 않는다면 이러한 오류가 발생할 가능성을 안고 가야 한다.
=> 클래스가 구체적인 데이터를 지니지 않기 위한 방법을 이번 절에서 논할 것.

#### (1) 인스턴스 생성 후 프로퍼티 제거
일단 만들고 나서 프로퍼티들을 일일이 지우고 더는 새로운 프로퍼티를 추가할 수 없게 하는 것.

``` js
delete Square.prototype.width;
delete Square.prototype.height;
Object.freeze(Square.prototype);
```

``` js
var extendClass1 = function (SuperClass, SubClass, subMethods) {
    SubClass.prototype = new SuperClass();
    for (var prop in SubClass.prototype) {
        if (SubClass.prototype.hasOwnProperty(prop)) {
            delete.SubClass.prototype[prop];
        }
    }
    if (subMethods) {
        for (var method in subMethods) {
            SubClass.prototype[method] = subMethods[method];
        }
    }
    Object.freeze(SubClass.prototype);
    return SubClass;
};

var Square = extendClass1(Rectangle, function (width) {
    Rectangle.call(this, width, width);
});
```
> SubClass의 prototype 내용을 정리하고 freeze하는 내용으로 구성.
#### (2) 빈 함수를 활용
: SubClass의 prototype에 직접 SuperClass의 인스턴스를 할당하는 대신 아무런 프로퍼티를 생성하지 않는 빈 생성자 함수(Bridge)를 하나 더 만들어서 그 prototype이 SuperClass의 prototype을 바라보게끔 한 다음, SubClass의 prototypee에는 Bridge의 인스턴스를 할당하게 하는 것.
``` js
var Rectangle = function (width, height) {
    this.width = width;
    this.height = height;
};
Rectangle.prototype.getArea = function () {
    return this.width * this.height;
};
var Square = function (width) {
    Rectangle.call(this, width, width);
};
var Bridge = function () {};
Bridge.prototype = Rectangle.prototype;
Square.prototype = new Bridge();
Object.freeze(Square.prototype);
```
> Bridge라는 빈 함수를 만들고, Bridge.prototype이 Rectangle.prototype을 참조하게 한 다음, Square.prototype에 new Bridge()로 할당하면, Rectangle 자리에 Bridge가 대체하게 될 것.

: 인스턴스를 제외한 프로토타입 체인 경로상에는 더는 구체적인 데이터가 남아있지 않게 된다.
``` js
var extendClass2 = (function () {
    var Bridge = function () {};
    return function (SuperClass, SubClass, subMethods) {
        Bridge.prototype = SuperClass.prototype;
        SubClass.prototype = new Bridge();
        if (subMethods) {
            for (var method in subMethods) {
                SubClass.prototype[method] = subMethods[method];
            }
        }
        Object.freeze(SubClass.prototype);
        return SubClass;
    };
})();
```
> 즉시실행함수 내부에서 Bridge를 선언해서 이를 클로저로 활용함으로써 메모리에 불필요한 함수 선언을 줄였다.
>> subMethods에는 SubClass의 prototype에 담길 메서드들을 객체로 전달하게끔 함.

#### (3) Object.create를 이용한 방법
: SubClass의 prototype의 __proto__가 SuperClass의 prototype을 바라보되, SuperClass의 인스턴스가 되지는 않음
> 앞의 두 방법보다 간단하면서 안전.
``` js
// ...
Object.prototype = Object.create(Rectangle.prototype);
Object.freeze(Square.prototype);
// ...
```

### 결국, SubClass.prototype의 __proto__가 SuperClass.prototype를 참조하고, SubClass.prototypee에는 불필요한 인스턴스 프로퍼티가 남아있지 않으면 된다.

### 3) constructor 복구하기
: 2)에서는 기본적인 상속에는 성공했지만, SubClass 인스턴스의 constructor는 여전히 SuperClass를 가리키는 상태.
> SubClass 인스턴스, SubClass.prototype : constructor가 없음.
>> SuperClass가 출력될 뿐.. (프로토타입 체인상에 가장 먼저 등장하기 때문에)

#### 어떻게 하지?
: SubClass.prototype.constructor가 원래의 SubClass를 바라보도록 해주면 된다.

#### (1) 인스턴스 생성 후 프로퍼티 제거 (완성!)
``` js
var extendClass1 = function (SuperClass, SubClass, subMethods) {
    SubClass.prototype = new SuperClass();
    for (var prop in SubClass.prototype) {
        if (SubClass.prototype.hasOwnProperty(prop)) {
            delete.SubClass.prototype[prop];
        }
    }
    SubClass.prototype.constructor = SubClass; // 요기 추가 되었음 !!
    if (subMethods) {
        for (var method in subMethods) {
            SubClass.prototype[method] = subMethods[method];
        }
    }
    Object.freeze(SubClass.prototype);
    return SubClass;
};
```
#### (2) 빈 함수를 활용
``` js
var extendClass2 = (function () {
    var Bridge = function () {};
    return function (SuperClass, SubClass, subMethods) {
        Bridge.prototype = SuperClass.prototype;
        SubClass.prototype = new Bridge();
        SubClass.prototype.constructor = SubClass; // 추가
        Bridge.prototype.constructor = SueprClass; // 추가
        if (subMethods) {
            for (var method in subMethods) {
                SubClass.prototype[method] = subMethods[method];
            }
        }
        Object.freeze(SubClass.prototype);
        return SubClass;
    };
})();
```
#### (3) Object.create를 이용한 방법
``` js
var extendClass3 = function (SuperClass, SubClass, subMethods) {
    SubClass.prototype = Object.create(SuperClass.prototype);
    SubClass.prototype.constructor = SubClass;
    if (subMethods) {
        for (var method in subMethods) {
            SubClass.prototype[method] = subMethods[method];
        }
    }
    Object.freeze(SubClass.prototype);
    return SubClass;
}
```
> 기본적인 기능인 상속 및 추상화만큼은 성공적으로 달성할 수 있음.

### 04. ES6의 클래스 및 클래스 상속
: ES5 체계에서의 생성자 함수 및 프로토타입, ES6의 클래스 문법을 비교하며 소개

#### 1) 클래스 문법 비교
``` js
var ES5 = function (name) {
    this.name = name;
};
ES5.staticMethod = function () {
    return this.name + ' staticMethod';
};
ES5.prototype.method = function() {
    return this.name + ' method';
};
var es5Instance = new ES5('es5);
console.log(ES5.staticMethod()); //es5 staticMethod
console.log(es5Instance.method()); //es5 method

var ES6 = class {
    constructor (name) {
        this.name = name;
    } /* 클래스 본문에서는 function 키워드를 생략해도 모두 메서드로 인식. 
    이 부분은 ES5의 생성자 함수와 동일한 역할.
    메서드와 다음 메서드 사이에는 콤마로 구분 X. */
    static staticMethod() {
        return this.name + ' staticMethod';
    } /* static 키워드는 static 메서드임을 알림.
    ES5 체계에서 생성자 함수에 바로 할당하는 메서드와 동일하게 생성자 함수(클래스) 자신만이 호출할 수 O. */
    method () {
        return this.name + ' method';
    } /* 자동으로 prototype 객체 내부에 할당되는 메서드.
    ES5.prototype.method와 동일하게, 인스턴스가 프로토 체이닝을 통해 마치 자신의 것처럼 호출할 수 있는 메서드*/
}; // 클래스 본문 영역
var es6Instance = new ES6('es6');
console.log(ES6.staticMethod()); // es6 staticMethod
console.log(es6Instance.method()); // es6 method
```
#### 2) ES6 클래스 상속
``` js
var Rectangle = class {
    constructor (width, height) {
        this.width = width;
        this.height = height;
    }
    getArea () {
        return this.width * this.height;
    }
};
var Square = class extends Rectangle {
    // 상속 관계 설정 (extends 상위클래스)
    constructor (width) {
        super(width, width);
        // superClass의 constructor 실행 (super 키워드 함수처럼 사용)
    }
    getArea() {
        console.log('size is : ', super.getArea());
        /* constructor 메서드 제외한 다른 메서드에서는 super 키워드를 객체처럼 사용.
        이때, 객체는 SuperClass.prototype을 바라보는데, this는 super가 아닌 원래의 this를 그래도 따름 */
    }
};
```
