## Chapter. 04. 콜백 함수
### 01. 콜백 함수란?
: 다른 코드의 인자로 넘겨주는 함수
> 제어권과 관련이 깊다.
>> A의 경우 시계 함수의 제어권은 A에게 있고, 시계는 그저 요청받은 내용을 이행할 뿐이다. 그런데 B는 시계 함수에게 요청을 하면서 알람을 울리는 명령에 대한 제어권을 시계에게 넘겨준 것이다. (알람 맞춰두고 맞춰둔 시간에 알람울리는겨.)

: '되돌아 호출해달라!'
> 어떤 함수 X를 호출하면서 '특정 조건일때 함수 Y를 실행해서 나에게 알려달라'는 요청을 함께 보낸다. 이 요청을 받은 함수 X의 입장에서는 해당 조건이 갖춰졌는지 여부를 스스로 판단하고 Y를 직접 호출.

: 콜백 함수는 다른 코드(함수 또는 메서드)에게 인자로 넘겨줌으로써 그 제어권도 함께 위임한 함수.
> 콜백 함수를 위임받은 코드는 자체적인 내부 로직에 의해 이 콜백 함수를 적절한 시점에 실행할 것.

### 02. 제어권
#### 1) 호출 시점
##### setInterval
: 반복적으로 실행되는 내용 자체를 특정할 수 있는 고유한 ID 값이 반환된다.
> 변수에 담는 이유 : 반복 실행되는 중간에 종료(clearInterval)할 수 있게 하기 위해서

    var intervalID = scope.setInterval(func, delay[, param1, param2, . . .]);
> func : 함수, delay : ms 단위의 숫자, param1 .. : 매개변수로 전달할 인자.

    var count = 0;
    var cbFunc = function( ) {
        console.log(count);
        if (++count > 4) clearInterval(timer);
    };
    var timer = setInterval(cbFunc, 300);
> timer 변수에는 setInterval의 ID 값이 담긴다. setInterval에 전달한 첫 번째 인자인 cbFunc 함수(콜백 함수)는 0.3초마다 자동으로 실행.
>> 콜백 함수 내부에서는 count 값을 출력하고, count 1만큼 증가시킨 다음, 그 값이 4보다 크면 반복 실행 종료.

: setInterval이라고 하는 '다른 코드'에 첫 번째 인자로서 cbFunc 함수를 넘겨주자 제어권을 넘겨받은 setInterval이 스스로의 판단에 따라 적절한 시점에 이 익명 함수를 실행했음.
> 콜백 함수의 제어권을 넘겨받은 코드는 콜백 함수 호출 시점에 대한 제어권을 가짐.

##### 인자
- map 메서드
: 첫 번째 인자로 callback 함수를 받고, 생략 가능한 두 번째 인자로 콜백 함수 내부에서 this로 인식할 대상을 특정할 수 있음.
> thisArg 생략 : 전역객체가 바인딩.

        var newArr = [10, 20, 30].map(function (currentValue, index) {
            console.log(currentValue, index);
            return currentValue + 5;
        });
        console.log(newArr); // 10 0 20 1 30 2 [15,25,35]

: 메서드의 대상이 되는 배열의 모든 요소들을 처음부터 끝까지 하나씩 꺼내어 콜백 함수를 반복 호출하고, 콜백 함수의 실행 결과들을 모아 새로운 배열을 만듦.

        Array. prototype.map(callback[, thisArg])
        callback: function(currentValue, index, array) // 콜백 함수의 인자들(현재값, 현재값의 인덱스, map메서드의 대상이 되는 배열 자체)

-  jQuery의 메서드 : 첫 번째인자 - index, 두 번째 인자 - currentValue  

        var newArr = [10, 20, 30].map(function (index, currentValue) {
            console.log(index, currentValue);
            return currentValue + 5;
        });
        console.log(newArr);  // 위에꺼랑 다르게 나온다. 10 0 20 1 30 2 [5,6,7]      
> 이름 자체의 의미는 달라지지 않는다고 생각해서 바꿔도 똑같이 나올거라고 생각하지만 아니라9! 큰 오산 ^.^         
>> 콜백 함수의 인자들(현재값, 현재값의 인덱스, map메서드의 대상이 되는 배열 자체) 이거 그대로 가져서 그래용..!

##### this

    Array.prototype.map = function(callback, thisArg) {
        var mappedArr = [ ];
        for (var i =0; i < this.length; i++) {
            var mappedValue = callback.call(thisArg || window, this[i], i, this);
            mappedArr[i] = mappedValue;
        }
        return mappedArr;
    };
> call/apply 메서드에 있음, this에는 thisArg 값이 있을 경우에는 그 값을, 없을 경우에는 전역객체를 지정.
>> 첫 번째 인자 : 메서드의 this가 배열을 가리킬 것이므로 배열의 i번째 요소 값을, 두 번째 인자 : i 값, 세 번재 인자 : 배열 자체를 지정해 호출.

- this에 다른 값이 담기는 이유
: 제어권을 넘겨받을 코드에서 call/apply 메서드의 첫 번째 인자에 콜백 함수 내부에서의 this가 될 대상을 명시적으로 바인딩하기 때문.

        setTimeout(function () {console.log(this);}, 300); // setTimeout은 내부에서 콜백 함수 호출할 때 call 메서드의 첫번째 인자에 전역객체를 넘겨서 window

        [1, 2, 3, 4, 5].forEach(function (x) {
            console.log(this); // forEach는 별도의 인자로 this를 받는 경우에 해당하지만 별도의 인자로 this를 넘겨주지 X ~> window
        });

        document.body.innerHTML += '<button id = "a"> 클릭 </button>';
        document.body.querySelector('#a')
            .addEventListener('click', function (e) {
                console.log(this, e); // addEventListener를 호출한 주체인 HTML 엘리먼트를 가리킴 ~> <button id = "a"> 클릭 </button>
            }
        );

### 03. 콜백 함수는 함수다.
: 콜백 함수로 어떤 객체의 메서드를 전달하더라도 그 메서드는 메서드가 아닌 함수로 호출.

    var obj = {
        vals: [1, 2, 3],
        logValues: function(v, i) {
            console.log(this, v, i);
        }
    };

    obj.logValues(1, 2);
    [4, 5, 6].forEach(obj.logValues);
> forEach에 의해 콜백이 함수로서 호출되고, 별도로 this를 지정하는 인자를 지정X ~> 함수 내부에서의 this는 전역객체를 바라보게 됨.

=> 어떤 함수의 인자에 객체의 메서드를 전달하더라도 이는 결국 메서드가 아닌 함수일 뿐.!
> 객체의 메서드를 콜백 함수로 전달하면 해당 객체를 this로 바라볼 수 없게 된다잉..

### 04. 콜백 함수 내부의 this에 다른 값 바인딩하기
: 킹치만... 그래도 콜백 함수 내부에서 this가 객체를 바라보게 하고 싶다!
- 어떻게 하나?
1) 별도의 인자로 this를 받는 함수 : 여기에 원하는 값을 넘겨주면 된다.\
2) 그렇지 않은 함수 : this의 제어권도 넘겨주게 되서 사용자가 임의로 값을 바꿀 수 O.

#### 전통적인 방식
: this를 다른 변수에 담아 콜백 함수로 활용할 함수에서는 this 대신 그 변수를 사용하게 하고, 이를 클로저로 만든다.

    var obj1 = {
        name: 'obj1',
        func: function () {
            var self = this;
            return function() {
                console.log(self.name);
            };
        }
    };

    var callback = obj1.func();
    setTimeout(callback, 1000);
> 번거롭긴 하지만, this를 우회적으로나마 활용함으로써 다양한 상황에서 원하는 객체르 바라보는 콜백함수를 만들 수 있다.
>> 객체를 명시적으로 지정했을 경우에는 어떤 방법으로도 다른 객체를 바라보게끔 할 수 없어서 불편하고 메모리를 낭비해서.. 이걸쓰는게 나았음.

#### bind 메서드 사용
: 전통적인 방식의 아쉬움을 보완하는 휼륭한 방법 ^.^

    var obj1 = {
        name: 'obj1',
        func: function() {
            console.log(this.name);
        }
    };
    setTimeout(obj1.func.bind(obj1), 1000);

    var obj2 = { name: 'obj2' };
    setTimeout(obj1.func.bind(obj2), 1500);

### 05. 콜백지옥과 비동기 제어
##### 콜백지옥
: 콜백 함수를 익명 함수로 전달하는 과정이 반복되어 코드를 들여쓰기 수준이 감당하기 힘들 정도로 깊어지는 현상. 
> 주로 이벤트 처리나 서버 통신과 같이 비동기적인 작업을 수행하기 위해 이런 형태가 자주 등장.
>> 가독성 떨어지고 코드 수정 어렵.

##### 동기 VS 비동기
1. 동기
: 현재 실행 중인 코드가 완료된 후에 다음 코드를 실행하는 방식.
2. 비동기
: 현재 실행 중인 코드의 완료 여부와 무관하게 즉시 다음 코드로 넘어감.
- setTimeout : 사용자의 요청에 의해 특정 시간이 경과되기 전까지 어떤 함수의 실행을 보류
- addEventListener : 사용자의 직접적인 개입이 있을 때 비로소 어떤 함수를 실행하도록 대기
- XMLHttpRequest : 웹브라우저 자체가 아닌 별도의 대상에 무언가를 요청하고 그에 대한 응답이 왔을 때 비로소 어떤 함수를 실행하도록 대기
> 별도의 요청, 실행 대기, 보류 등과 관련된 코드는 비동기적인 코드.

#### 콜백지옥의 가독성 문제와 어색함 해결방법
: 들여쓰기 수준이 과도하게 깊어짐\
: 값이 전달되는 순서 ~> 아래에서 위로
=> 해결방법?!?

1. 익명의 콜백 함수를 모두 기명 함수로 전환.
: 코드의 가독성 높이고, 함수 선언과 함수 호출만 구분할 수 있으면 위에서 아래로 순서대로 읽어내려가는 데 어려움 X.\
: 변수를 최상단으로 끌어올림으로써 외부에 노출되게 됐지만 전체를 즉시 실행 함수 등으로 감싸면 간단히 해결될 문제.\
but 일회성 함수를 전부 변수에 할당하는 것이 헷갈릴 수 있음.\
=> 해결방법?!? 밑에 나온다9~~~

2. Promise
: new 연산자와 함께 호출한 Promise의 인자로 넘겨주는 콜백 함수는 그 내부에 resolve 또는 reject 함수를 호출하는 구문이 있을 경우 둘 중 하나가 실행되기 전까지는 다음(then) 또는 오류 구문(catch)로 넘어가지 X.
> 원래 호출할 때 바로 실행된다.

=> 따라서 비동기 작업이 완료될 때 resolve, reject를 호출하는 방법으로 비동기 작업의 동기적 표현 O.

        Var addCoffee = function (name) {
            return function (prevName) {
                return new Promise(function (resolve) { // 클로저 등장... 다음 장에서 자세히...
                    setTimeout(function() {
                        var newName = prevName ? (prevName + ', ' + name) : name;
                        console.log(newName);
                        resolve(newName);
                    }, 500);
                });
            };
        };
        addCoffee('에스프레소')()
            .then(addCoffee('아메리카노'))
            .then(addCoffee('카페라떼));

3. Generator
: *이 붙은 함수\
: 함수 실행시 Iterator가 반환되는데, Iterator는 next라는 메서드를 가지고 있음.\
: 이 next 메서드를 호출하면 Generator 함수 내부에서 가장 먼저 등장하는 yield에서 함수의 실행을 멈춤.\
-> 다시 next 메서드 호출 -> 멈췄던 부분부터 시작해서 다음에 등장하는 yield에서 함수의 실행을 멈춤.\
=> 비동기 작업이 완료되는 시점마다 next 메서드를 호출해주면 Generator 함수 내부의 소스가 위에서부터 아래로 순차적으로 진행된다.

        var addCoffee = function (prevName, name) {
            setTimeout(function () {
                coffeeMaker.next(prevName ? prevName + ', ' + name : name);
            }, 500);
        };
        var coffeeGenerator = function* () {
            var esspresson = yield addCoffee('', '에스프레소');
            console.log(espresso);
            var americano = yield addCoffee(espresso, '아메리카노');
            console.log(americano);
            var latte = yield addCoffee(americano, '카페라떼');
            console.log(latte);
        };
        var coffeeMaker = coffeeGenerator();
        coffeeMaker.next();

4. Promise + Async/await
: 가독성이 뛰어나면서 작성법도 간단한 새로운 기능.
- 비동기 작업을 수행하고자 하는 함수 앞에 async를 표기
- 함수 내부에서 실질적인 비동기 작업이 필요한 위치마다 await를 표시

=> 뒤의 내용을 Promise로 자동 전환, 해당 내용이 resolve된 이후에야 다음으로 진행.
> Promise의 the과 흡사한 효과를 얻을 수 O.
