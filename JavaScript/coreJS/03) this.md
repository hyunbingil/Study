## Chapter. 03. this
: 상황에 따라 this가 바라보는 대상이 달라진다.
> 어떤 이유로 그렇게 되는지를 파악하기 힘든 경우도 있고 예상과 다르게 엉뚱한 대상을 바라보는 경우도 있다.
>> 문제 해결을 하려면 원인을 추적해서 수정해야하는데, 정확한 작동 방식을 이해하지 못하면 원인을 파악해서 해결할 수 없다.

### 01. 상황에 따라 달라지는 this
: 기본적으로 실행 컨텍스트가 생성될 때 함께 결정된다.
> 실행 컨텍스트는 함수를 호출할 때 생성되니까 this는 함수를 호출할 때 결정된다.
>> 함수를 어떤 방식으로 호출하느냐에 따라 값이 달라지는 것이다.

#### 전역 공간에서의 this
: this = 전역 객체\
why? 전역 컨텍스트를 생성하는 주체가 바로 전역 객체.
> 브라우저 : window, Node.js : global

    var a = 1;
    console.log(a); // 1
    console.log(window.a) // 1
    console.log(this.a) // 1

- window랑 this가 같은거니까 같은 값 나오는건 맞는데 왜 1일까요?
because 자바스크립트의 모든 변수는 실은 특정 객체의 프로퍼티로 작동해서
> 변수 선언해도 실제 자바스크립트 엔진은 어떤 특정 개체의 프로퍼티로 인식하는 것.

- 특정 객체가 뭔데?
: 실행 컨텍스트의 LexicalEnvironment

=> 전역변수를 선언하면 자바스크립트 엔진은 이를 전역객체의 프로퍼티로 할당.

- window.a
: 변수 a에 접근하고자 하면 스코프체인에서 a를 검색하다가 가장 마지막에 도달하는 전역 스코프의 LexicalEnvironment
> 즉, 전역객체에서 해당 프로퍼티를 발견해 그 값을 반환함.

==> var로 변수 선언하는 대신 window의 프로퍼티에 직접 할당하더라도 결과적으로 var로 선언한 것과 똑같이 동작함.

- but 전역객체의 프로퍼티로 할당한 경우 ~> 삭제 O, 전역변수로 선언한 경우 ~> 삭제 X
> 즉, 전역변수를 선언하면 자바스크립트 엔진이 이를 자동으로 전역객체의 프로퍼티로 할당하면서 추가적으로 해당 프로퍼티의 configurable 속성(변경 및 삭제 가능성)을 false로 정의하는 것.

#### 메서드로서 호출할 때 그 메서드 내부에서의 this
- 함수
: 그 자체로 독립적인 기능을 수행.
- 메서드
: 자신을 호출한 대상 객체에 관한 동작을 수행
> this 키워드에 다른 값을 부여하게 함으로써 이를 구현함.

: 점 표기법 obj.method(1);\
: 대괄호 표기법 obj.['method'](2);\
<u>메서드는 객체의 메서드로서 호출할 경우에만 메서드로 동작하고, 그렇지 않으면 함수로 동작함.</u>

- 메서드 내부에서의 this
: 호출한 주체에 대한 정보가 담김
: 호출한 주체는 뭔데?\
~> 어떤 함수를 메서드로 호출하는 경우 호출주체는 바로 함수명(프로퍼티명)의 앞의 객체임
> 점 표기법의 경우 : 마지막 점 앞에 명시된 객체가 곧 this.

        var func = function(x){
            console.log(this, x);
        };
        func(1); // Window {...} 1

        var obj = {
            method: func
        };
        obj.method(2); // {method: f} 2
> 익명함수는 그대론데 이를 변수에 담에 호출한 경우와 obj 객체의 프로퍼티에 할당해 호출한 경우에 this가 달라짐

#### 함수로서 호출할 때 그 함수 내부에서의 this
- 함수 내부에서의 this
: 전역 객체를 가리킴.
> this는 지정되지 않는다.
>> this에는 호출한 주체에 대한 정보가 담긴다고 했는데, 함수로서 호출하는 것은 호출 주체를 명시하지 않고 개발자가 코드에 직접 관여해서 실행한 것이기 때문에 호출 주체의 정보를 알수 X.

: this 바인딩에 관해서는 함수를 실행하는 당시의 주변 환경(메서드 내부인지, 함수 내부인지 등)은 중요하지 X.\
: <u>오직 해당 함수를 호출하는 구문 앞에 점 또는 대괄호 표기가 있는지 없는지가 관건.</u>

##### 메서드의 내부 함수에서의 this를 우회하는 방법
: 호출 주체가 없을 때는 자동으로 전역객체를 바인딩하지 않고 호출 당시 주변 환경의 this를 그대로 상속받아 사용하는게 좋다.
> 스코프 체인과의 일관성을 지키는 설득력 있는 방식.
>> 변수 검색 시 가장 가까운 스코프의 L.E를 찾고 없으면 상위 스코프를 탐색하듯, this도 현재 컨텍스트에 바인딩된 대상이 없으면 직접 컨텍스트의 this를 바라보도록 하는 것.

    var obj = {
        outer: function(){
            console.log(this); // {outer: f}
            var innerFunc1 = function() {
                console.log(this); // Window{...}
            };
            innerFunc1();

            var self = this;
            var innerFunc2 = function() {
                console.log(self); // {outer: f}
            };
            innerFunc2();       
        }
    };
    obj.outer();
> 우회라고 할 수도 없을 만큼 허무하지만 기대에는 충실히 부합함.
>> 변수명은 self가 가장 많이 쓰임.

##### this를 바인딩하지 않는 함수
- 화살표 함수
: this가 전역객체를 바라보는 문제를 보완하고자, this를 바인딩하지 않는 이 함수를 새로 도입

    var obj = {
        outer: function(){
            console.log(this);
            var innerFunc = () => {
                console.log(this);
            };
            innerFunc();
        }
    };
    obj.outer();

#### 콜백 함수 호출시 그 함수 내부에서의 this
- 콜백 함수
: 함수 A의 제어권을 다른 함수(또는 메서드) B에게 넘겨주는 경우 함수 A를 콜백 함수라고 한다.
> 함수 A는 함수 B의 내부 로직에 따라 실행되며, this 역시 함수 B 내부 로직에서 정한 규칙에 따라 값이 결정됨.

: 콜백함수도 함수이기 때문에 기본적으로 this가 전역객체를 참조하지만, 제어권을 받은 함수에서 콜백 함수에 별도로 this가 될 대상을 지정한 경우에는 그 대상을 참조함.

        setTimeout(function(){console.log(this);}, 300); // 전역객체

        [1,2,3,4,5].forEach(function (x) {
            console.log(this, x); // 전역객체
        });

        document.body.innerHTML += '<button id="a">클릭</botton>';
        document.body.querySelector('#a')
            .addEventListener('click', function(e){
                console.log(this, e); // 자신의 this를 상속 (메서드명의 점(.) 앞부분이 곧 this)
            });

- 콜백 함수의 this
: 무조건 이거다라고 정의할 수 없음.\
: 콜백 함수의 제어권을 가지는 함수가 콜백함수에서의 this를 무엇으로 할지를 결정하며, 특별히 정의하지 않은 경우에는 함수와 마찬가지로 전역객체를 바라본다.

#### 생성자 함수 내부에서의 this
- 생성자 함수
: 어떤 공통된 성질을 지니는 객체들을 생성하는 데 사용하는 함수.
> 생성자 : class, 클래스를 통해 만든 객체 : instance
>> 생성자 : 구체적인 인스턴스를 만들기 위한 일종의 틀

: 함수에 생성자로서의 역할을 함께 부여
> new 명령어와 함께 함수를 호출하면 해당 함수가 생성자로서 동작함.

- 생성자 함수 내부에서의 this
: 곧 새로 만들 구체적인 인스턴스 자신.

        var Cat = function(name, age){
            this.bark = "야옹";
            this.name = name;
            this.age = age;
        }; // Cat이라는 변수에 익명 함수를 할당, 내부에서 this에 접근해서 bark, name, age 프로퍼티에 각각 값 대입

        var choco = new Cat('초코', 7); // 실행한 생성자 함수 내부에서는 this를 choco 인스턴스를 가리킴.
        var nabi = new Cat('나비', 5); // 여기는 this를 nabi 인스턴스.
        console.log(choco, nabi);
> 생성자 함수를 호출(new 명령어와 함께 함수 호출)하면 우선 생성자의 prototype 프로퍼티를 참조하는 __proto__라는 프로퍼티가 있는 객체를 만들고, 미리 준비된 공통 속성 및 개성을 해당 객체(this)에 부여합니다. 이렇게 해서 구체적인 인스턴스가 만들어진다.

### 02. 명시적으로 this를 바인딩하는 방법
: 앞의 규칙들을 깨고 this에 별도의 대상을 바인딩하는 방법이 있음.

#### 1) call 메서드
: 메서드의 호출 주체인 함수를 즉시 실행하도록 하는 명령.\
: 임의의 객체를 this로 지정 가능.

    Function.prototype.call(thisArg[, arg1[, arg2[, ...]]])

: call 메서드의 첫 번째 인자를 this로 바인딩하고, <u>이후의 인자들(첫 번째 인자 제외)을 호출할 함수의 매개변수</u>로 한다.
> apply와 call은 기능적으로 똑같으나 여기서 갈린다.

    var func = function (a, b, c){
        console.log(this, a, b, c);
    };

    func(1, 2, 3); // Window{ . . . } 1 2 3 
    func.call({ x: 1}, 4, 5, 6); // { x: 1} 4 5 6
> 그냥 호출하면 전역 객체 참조

    var obj = {
        a: 1,
        method: function (x, y) {
            console.log(this.a, x, y);
        }
    };

    obj.method(2, 3); // 1 2 3
    obj.method.call({ a: 4}, 5, 6); // 4 5 6

#### 2) apply 메서드
: 메서드의 호출 주체인 함수를 즉시 실행하도록 하는 명령.

    Function.prototype.apply(thisArg[, argsArray])

: apply의 첫 번째 인자를 this로 바인딩하고, <u>두 번째 인자를 배열로 받아 그 배열의 요소들을 호출할 함수의 매개변수</u>로 한다.
> apply와 call은 기능적으로 똑같으나 여기서 갈린다.    

    var func = function (a, b, c) {
        console.log(this, a, b, c);
    };
    func.apply({x: 1}, [4,5,6]);

    var obj = {
        a: 1,
        method: function (x, y) {
            console.log(this.a, x, y);
        }
    };
    obj.method.apply({ a: 4}, [5, 6]);

#### 3) call / apply 메서드의 활용
: 명시적으로 별도의 this를 바인딩하면서 함수 또는 메서드를 실행하는 휼륭한 방법이지만 오히려 이로 인해 this를 예측하기 어렵게 만들어 코드 해석을 방해한다는 단점이 있음. but 마땅한 대안이 없어서(ES5이하 환경) 실무에서 매우 광범위하게 활용.
##### 유사배열객체(array-like object)에 배열 메서드를 적용
- 유사배열 객체
: 키가 0 또는 양의 정수인 프로퍼티가 존재하고 length 프로퍼티의 값이 0 또는 양의 정수인 객체
> 배열의 구조와 유사한 객체

~>객체에는 배열 메서드를 직접 적용 X.\
but 유사배열 객체면 call 또는 apply 메서드를 이용해 배열 메서드를 차용 O.

     var obj = {
         0: 'a',
         1: 'b',
         2: 'c',
         length: 3
     };
     Array.prototype.push.call(obj, 'd'); // 배열 메서드 push를 사용함.
     console.log(obj);

     var arr = Array.prototype.slice.call(obj); // 배열 메서드 slice를 적용해 객체를 배열로 전환.
     console.log(arr);
> slice 메서드 : 원래 시작 인덱스값과 마지막 인덱스값을 받아 시작값부터 마지막값의 앞부분까지의 배열 요소를 추출하는 메서드
>> 그런데 매개변수를 아무것도 넘기지 않을 경우에는 그냥 원본 배열의 얕은 복사본을 반환.

- arguments 객체
: 유사배열객체.
> querySelectorAll, getElementByClassName 등의 Node 선택자로 선택한 결과인 NodeList도 마찬가지.

    function a(){
        var argv = Array.prototype.slice.call(arguments);
        argv.forEach(function (arg){
            console.log(arg);
        });
    }
    a(1, 2, 3);

    document.body.innerHTML = '<div>a</div><div>b</div><div>c</div>';
    var nodeList = document.querySelectorAll('div');
    var nodeArr = Array.prototype.slice.call(nodeList);
    nodeArr.forEach(function (node){
        console.log(node);
    })

- 배열처럼 인덱스와 length 프로퍼티를 지니는 문자열
: call/apply 메서드를 이용해 모든 배열 메서드를 적용 O.\
> but 문자열의 경우 length 프로퍼티가 읽기 전용이기 때문에 원본 문자열에 변경을 가하는 메서드(push, pop, shift, unshift, slice 등)는 에러를 던지며, concat처럼 대상이 반드시 배열이어야 하는 경우에는 에러가 나지 않지만 제대로 된 결과를 얻을 수 X.

~> 사실 call/apply를 이용해 형변환하는 것은 'this를 원하는 값으로 지정해서 호출한다'라는 본래의 메서드의 의도와는 다소 동떨어진 활용법.

- Array.from 메서드
: 유사배열객체 또는 순회 가능한 모든 종류의 데이터 타입을 배열로 전환하는 메서드.

    var obj = {
        0: 'a',
        1: 'b',
        2: 'c',
        length: 3
    };
    var arr = Array.from(obj);
    console.log(arr); // ['a', 'b', 'c']

##### 생성자 내부에서 다른 생성자를 호출
: 생성자 내부에 다른 생성자와 공통된 내용이 있을 경우 call 또는 apply를 이용해 다른 생성자를 호출하면 간단하게 반복을 줄일 수 있음.

    function Person(name, gender){
        this.name = name;
        this.gender = gender;
    }
    function Student(name, gender, school){
        Person.call(this, name, gender);
        this.school = school;
    }
    function Employee(name, gender, company){
        Person.apply(this, [name, gender]);
        this.company = company;
    }

    var by = new Student("핸빈", "female", "부경대");
    var jn = new Employee("일꾼", "male", "네이바")

##### 여러 인수를 묶어 하나의 배열로 전달하고 싶을 때
: 여러 개의 인수를 받는 메서드에게 하나의 배열로 인수들을 전달하고 싶을 땐 apply를 사용해라!
> 배열에서 최대/최솟값을 구해야 할 경우 apply를 사용하면 편하당.

    var numbers = [10, 20, 3, 16, 45];
    var max = Math.max.apply(null, numbers);
    var min = Math.min.apply(null, numbers);
    console.log(max, min)
> 사실은 spread 사용하면 더 간편하게 작성 가능 ㅎㅎ
>> 기억나니..? const max = Math.max(...numbers);

#### 4) bind 메서드
: call과 비슷하지만 즉시 호출하지는 않고 넘겨받은 this 및 인수들을 바탕으로 새로운 함수를 반환하기만 하는 메서드.

    Function.prototype.bind(thisArg[, arg1[, arg2[, . . .]]])
> 다시 새로운 함수를 호출할 때 인수를 넘기면 그 인수들은 기존 bind 메서드를 호출할 때 전달했던 인수들의 뒤에 이어 등록.

##### bind의 목적
1. 함수에 this를 미리 적용하는 것
2. 부분 적용 함수를 구현하는 것

        var func = function (a, b, c, d){
            console.log(this, a, b, c, d);
        };
        func(1, 2, 3, 4);

        var bindFunc1 = func.bind({ x: 1}); // this 지정.
        bindFunc1(5, 6, 7, 8);

        var bindFunc2 = func.bind({ x: 1}, 4, 5); // this 지정과 함께 부분 적용 함수 구현.
        bindFunc2(6, 7);
        bindFunc2(8, 9);

##### name 프로퍼티
: bind 메서드를 적용해 새로 만든 함수의 독특한 성질.\
: name 프로퍼티에 동사 bind의 수동태인 'bound'라는 접두어가 붙는다.
> 어떤 함수의 name 프로퍼티가 'bound xx'라면 이는 곧 하수명이 xx인 원본 함수에 bind 메서드를 적용한 새로운 함수라는 의미
>> call이나 apply보다 코드를 추적하기에 더 수월.

##### 상위 컨텍스트의 this를 내부함수나 콜백 함수에 전달하기
> 아까 위에서 this를 그대로 바라보게 하기 위한 방법으로 self 등의 변수를 활용한 우회법을 소개했었음.
>> call, apply, bind 메서드 이용하면 더 깔끔.

    var obj = {
        outer: function() {
            console.log(this);
            var innerFunc = function() {
                console.log(this);
            };
            innerFunc.call(this);
        }
    };
    obj.outer();

: 콜백 함수를 인자로 받는 함수 or 메서드 중, 기본적으로 콜백 함수 내에서의 this에 관여하는 함수 or 메서드에 대해서도 bind 메서드를 이용하면 this 값을 마음대로 바꾸기 가능.

    var obj = {
        logThis: function(){
            console.log(this);
        },
        logThisLater1: function(){
            setTimeout(this.logThis, 500);
        }
        logThisLater2: function(){
            setTimeout(this.logThis,bind(this), 1000);
        }
    };
    obj.logThisLater1();
    obj.logThisLater2();

#### 5) 화살표 함수의 예외사항
: 실행 컨텍스트 생성 시 this를 바인딩하는 과정이 제외되어, 함수 내부에는 this가 아예없으며 스코프체인상 가장 가까운 this에 접근.

    var obj = {
        outer: function(){
            console.log(this);
            var innerFunc = () => {
                console.log(this);
            };
            innerFunc();
        }
    };
    obj.outer();
> 별도의 변수로 this를 우회하거나(self), call/apply/bind 를 적용할 필요가 없어 더욱 간결하고 편리.

#### 6) 별도의 인자로 this를 받는 경우(콜백 함수 내에서의 this)
: 콜백 함수를 인자로 받는 메서드 중 일부는 추가로 this로 지정할 객체(thisArg)를 인자로 지정할 수 있는 경우 O.
> 이렇게 thisArg 값을 지정하면 콜백 함수 내부에서 this 값을 원하는 대로 변경 O.

: 이러한 형태는 여러 내부 요소에 대해 반복 수행해야 하는 배열 메서드에 많이 포진.
> Set, Map 등의 메서드에도 일부 존재.

    var report = {
        sum: 0,
        count: 0,
        add: function() {
            var args = Array.prototype.slice.call(arguments);
            arg.forEach(function (entry){
                this.sum += entry;
                ++this.count;
            }, this);
        },
        average: function(){
            reutrn this.sum / this.count;
        }
    };
    report.add(60, 85, 95);
    console.log(report.sum, report.count, report.average());

##### 콜백 함수와 함께 thisArg를 인자로 받는 메서드

    Array.prototype.forEach(callback[, thisArg])
    Array.prototype.map(callback[, thisArg])
    Array.prototype.filter(callback[, thisArg])
    Array.prototype.some(callback[, thisArg])
    Array.prototype.every(callback[, thisArg])
    Array.prototype.find(callback[, thisArg])
    Array.prototype.findIndex(callback[, thisArg])
    Array.prototype.flatMap(callback[, thisArg])
    Array.prototype.from(callback[, thisArg])
    Set.prototype.forEach(callback[, thisArg])
    Map.prototype.forEach(callback[, thisArg])