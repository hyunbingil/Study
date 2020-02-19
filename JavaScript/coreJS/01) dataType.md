### Chapter. 01 데이터 타입
#### 목표
: 기본형 타입과 참조형 타입이 서로 다르게 동작하는 이유를 이해하고 이를 적절히 활용할 수 있게 되는 것

### 01. 데이터 타입의 종류
1. 기본형(primitive type)
: 숫자, 문자열, boolean, null, undefined, symbol
- 할당이나 연산시 복제\
~> 값이 담긴 주솟값을 바로 복제
> 불변성을 띈다.
2. 참조형(reference type)
: 객체, 배열, 함수, 날짜 ,정규표현식(RegExp)
: Map, WeakMap, Set, WeakSet
- 할당이나 연산시 참조\
~> 값이 담긴 주솟값들로 이루어진 묶음을 가리키는 주솟값을 복제

> 변수 : 변할 수 있는 데이터가 담길 수 있는 공간
> 변수명 : 식별자

### 02. 불변 객체
- 참조형 데이터의 '가변'
: 데이터 자체가 아닌 내부 프로퍼티를 변경할 때만 성립
>object2.name = 20 이런식으로

- 불변 객체를 만들려면?
: 내부 프로퍼티를 변경할 필요가 있을 때마다 매번 새로운 객체를 만들어 재할당하기로 규칙을 정한다.
: 자동으로 새로운 객체를 만드는 도구를 활용

- 어떤 상황에서 불변 객체가 필요한가?
: 값으로 전달받은 객체에 변경을 가해도 원본 객체는 변하지 않게 하는 경우
> 정보가 바뀐 시점에 알림보내기\
> 바뀌기 전의 정보와 바뀐 후의 정보차이를 가시적으로 보여줘야하는 등의 기능 구현

#### copyobject
: for in 문법을 이용해서 기존 정보를 복사해 새로운 객체를 반환하는 함수 (얕은 복사)
> 얕은 복사 : 바로 아래 단계의 값만 복사\
> ~> obejct안에 object는 가변이라는 뜻

        var copyObject = function(target){
            var result = {};
            for(var prop in target){
                result[prop] = target[prop];
            }
            return result;
        };
> 아쉬운 점 : 프로토타입 체이닝 상의 모든 프로퍼티를 복사(?), getter/setter 복사X, 얕은 복사만 수행.

    var user2 = copyObject(user);
    user2.name = "Jung";
> 이렇게 하면 user의 name이 user2를 따라서 바뀌지 않기 때문에 user을 불변 객체로 만들 수 있음.

: immutable.js, baobab.js 등의 라이브러리가 등장해 라이브러리 자체에서 불변성을 지닌 별도의 데이터 타입과 그에 따른 메서드 제공함.

#### copyobjectDeep
: 어떤 객체를 복사할 때 객체 내부의 모든 값을 복사해서 완전히 새로운 데이터를 만들고자 할 때, 
참조형 데이터는 다시 그 내부의 프로퍼티들을 복사해야한다.(객체안의 객체느낌) 
> 이 개념을 바탕으로 깊은 복사 방식으로 고쳐보면

    var copyObjectDeep = function(target){
        var result = {};
        if(typeof target === 'object' && target !== null){
            // target이 객체일 경우 돌면서 받아준당..!
            // typeof 명령가 null에 대해서도 'object'를 반환해서 target !== null 사용(자바스크립트 자체 버그)
            for(var prop in target){
                result[prop] = copyObjectDeep(target[prop]);
            }
        }
        else{
            result = target;
        }
        return result;
    }

> hasOwnProperty 메서드 : 프로토타입 체이닝을 통해 상속된 프로퍼티 복사하지 않게끔 할 수 O/
> Object.getOwnPropertyDescriptor(s) : getter/setter 복사 방법 ES5(ES2017)

#### JSON
: 객체를 JSON 문법으로 표현된 문자열로 전환했다가 다시 JSON 객체로 바꾸는 것.
> 메서드(함수)나 숨겨진 프로퍼티인 __proto__나 getter/setter 등과 같이 JSON으로 변경 X 프로퍼티는 모두 무시
: httpRequest로 받은 데이터를 저장한 객체를 복사할 때 등 순수한 정보만 다룰 때 활용하기 좋음.

    var copyObjectViaJSON = function(target){
        return JSON.parse(JSON.stringfy(target));
    };

    var obj = {
        a: 1,
        b: {
            c: null,
            d: [1,2],
            func1: function(){console.log(3);}
        },
        func2: function(){console.log(4);}
    };
    var obj2 = copyObjectViaJSON(obj);

    obj2.a = 3;
    obj2.b.c = 4;
    obj.b.d[1] = 3;

    console.log(obj); // {a:1, b:{c: null, d:[1,3],func1: f()},func2: f()}
    console.log(obj2); // {a:3, b:{c: 4, d:[1,2]}} ~> 함수는 JSON 변경 X 프로퍼팁니다.

### 03. undefined와 null
1. undefined
- 값을 대입하지 않은 변수
> 데이터 영역의 메모리 주소를 지정하지 않은 식별자에 접근 시
        var a;
        console.log(a);
- 객체 내부의 존재하지 않는 프로퍼티에 접근하려고 할 때
        var obj = {a: 1};
        console.log(obj.b);
        console.log(b);
- return 문이 없거나 호출되지 않는 함수의 실행 결과
        var func = function(){}
        var c = func();
        console.log(c);     

: undefined는 그 자체로 값이다. 비어있음을 의미하지만 하나의 값으로 동작하기 때문에 프로퍼티 이름(고유의 키값)이 실존하게 되고 따라서 순회의 대상이 될 수 있다.
> var array = [undefined, undefined, undefined]
> var array2 = []; array2.length = 3; //empty
> var array3 = new Array(3); //empty
> 배열에서의 empty와 undefined는 다르다. 배열의 각 요소를 순회하는 메서드들을 사용했을 때 empty는 그냥 넘어가지면 undefined는 순회당한(?)다.
> 존재하지 않는 프로퍼티에 대해서는 순회할 수 없는 것이 당연 ~> 값이 지정되지 않은 인덱스 (empty)는 아직 존재하지 않는 프로퍼티임.   

: 자바스크립트 엔진이 하는 수 없이 반환해주는 undefined는 해당 프로퍼티 내지 배열의 키값(인덱스) 자체가 존재 X.
> 값으로 어딘가에 할당된 undefined는 실존하는 데이터지만, 자바스크립트 엔진이 반환해주는 undefined는 문자 그대로 값이 없음을 나타냄.

~> 헷갈리지? 그러니까 비어있음을 명시적으로 나타내고 싶으면 null을 사용하라9!

2. null
: '비어있음'을 명시적으로 나타내기 위해 만든 데이터 타입.
> typeof null이 object라는 자바스크립트 자체 버그가 있음.. 그래서 다른 방식으로 접근해야함.

        console.log(n===null); // 일치 연산자로 판별하기 ==(동등연산자)로 판별하면 undefined랑 같다고 나옴.