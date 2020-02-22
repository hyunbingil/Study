## Chapter. 05. 클로저
### 01. 클로저의 의미 및 원리 이해
- 클로저는 여러 함수형 프로그래밍 언어에서 등장하는 보편적인 특징.
- A closure is the combination of a function and the lexical environment within which that function was declared.

#### 1) 클로저는 함수와 그 함수가 선언될 당시의 lexical environment의 상호관계에 따른 현상.\
~> 선언될 당시의 lexical environment는 실행 컨텍스트의 구성 요소 중 하나의 outerEnvironmentReference에 해당.
> 어떤 컨텍스트 A에서 선언한 내부함수 B의 실행 컨텍스트가 활성화된 시점에는 B의 outerEnvironmentReference가 참조하는 대상인 a의 lexical environment에도 접근이 가능.
>> A에서는 B에서 선언한 변수에 접근 X but B에서는 A에서 선언한 변수에 접근 가능.

#### 2) 어떤 함수에서 선언한 변수를 참조하는 내부함수에서만 발생하는 현상\
##### combination
: 선언될 당시의 LexicalEnvrionment와의 상호관계
> 내부함수 B가 A의 LexicalEnvrionment를 언제나 사용 X. 외부 변수를 참조하는 경우에만.

    var outer = function() {
        var a = 1;
        var inner = function() {
            return ++a;
        };
        return inner();
    };
    var outer2 = outer();
    console.log(outer2);
> outer 함수의 실행 컨텍스트가 종료되기 전에 inner 함수의 실행 컨텍스트가 종료되어 있으며, 이후 별도로 inner 함수를 호출할 수 없다.

##### outer의 실행 컨텍스트가 종료된 후에도 inner 함수를 호출할 수 있게 만들면 어떨까?

    var outer = function() {
        var a = 1;
        var inner = function() {
            return ++a;
        };
        return inner;
    };
    var outer2 = outer(); // inner 함수를 참조한다. (함수의 실행결과가 아니라 inner 함수 자체.)
    console.log(outer2());
    console.log(outer2());
> inner 함수의 실행 시점에는 outer 함수는 이미 실행이 종료된 상태인데 outer 함수의 LexicalEnvironment에 어떻게 접근할 수 있는 걸까?
>> 가비지 컬렉터의 동작방식 때문이다.

##### 가비지 컬렉터
: 어떤 값을 참조하는 변수가 하나라도 있다면 그 값은 수집 대상에 포함시키지 X.
> 외부함수인 outer의 실행이 종료되더라도 내부 함수인 inner 함수는 언젠가 outer2를 실행함으로써 호출될 가능성이 열린 것.

: inner 함수의 실행 컨텐스트가 활성화되면 outerEnvironmentReference가 outer 함수의 LexicalEnvironment를 필요로 할 것이므로 수집 대상에서 제외된다.
> 그래서 inner 함수가 이 변수에 접근할 수 O.

#### 3) 외부 함수의 LexicalEnvironment가 가비지 컬렉팅되지 않는 현상.
: 함수의 실행 컨텍스트가 종료된 후에도 LexicalEnvironment가 가비지 컬렉터의 수집 대상에서 제외되는 경우는 지역변수를 참조하는 내부함수가 외부로 전달된 경우가 유일.
> 그래서 2)의 의미가 3)의 의미와 같다.

#### 모든 것을 조합해 보면
### 클로저란 어떤 함수 A에서 선언한 변수 a를 참조하는 내부함수 B를 외부로 전달할 경우 A의 실행 컨텍스트가 종료된 이후에도 변수 a가 사라지지 않는 현상.

    그래서 클로저가 뭔데?!?!?!?!?
    - 함수를 선언할 때 만들어지는 유효범위가 사라진 후에도 호출할 수 있는 함수
    - 이미 생명 주기가 끝난 외부 함수의 변수를 참조하는 함수
    - 자신이 생성될 때의 스코프에서 알 수 있었던 변수들 중 언젠가 자신이 실행될 때 사용할 변수들만을 기억해 유지시키는 함수
> 주의!!!! 외부로 전달 = reutrn만을 의미하는 것은 아님.

#### return 없이도 클로저가 발생하는 경우
##### setTimeout 또는 setInterval
: 별도의 외부객체인 window의 메서드(setTimeout 또는 setInterval)에 전달할 콜백 함수 내부에서 지역변수를참조.

    (function () {
        var a = 0;
        var intervalId = null;
        var inner = function() {
            if (++a >= 10) {
                clearInterval(intervalId);
            }
            console.log(a);
        };
        intervalId = setInterval(inner, 1000);
    })();
> 지역변수를 참조하는 내부함수를 외부에 전달했기 때문에 클로저임.

##### addEventListener
: 별도의 외부객체인 DOM의 메서드(addEventListener)에 등록할 handler 함수 내부에서 지역변수를 참조한다.

    (function() {
        var count = 0;
        var button = document.createElement('button');
        button.innerText = 'click';
        button.addEventListener('click', function() {
            console.log(++count, 'times clicked');
        });
        document.body.appendChild(button);
    })();
> 지역변수를 참조하는 내부함수를 외부에 전달했기 때문에 클로저임.

### 02. 클로저와 메모리 관리
- 메모리 소모는 클로저의 본질적인 특성임.
> 예전에는 메모리 누수가 발생하는 여러 가지 상황들이 있었지만 최근에는 별로 없어유...
>> 그래서 메모리 소모에 대한 관리법만 잘 파악해서 적용하는 것으로 충분하다9!

#### 클로저의 필요성이 사라진 시점에는 더는 메모리를 소모하지 않게 해준다.
: because 클로저는 어떤 필요에 의해 의도적으로 함수의 지역변수를 메모리를 소모하도록 함으로써 발생하기 때문에.
1. 참조 카운트를 0으로 만든다.
: 식별자에 참조형이 아닌 기본형 데이터(null이나 undefined)를 할당하면 된다.
(1) return에 의한 클로저의 메모리 해제

    var outer = (function() {
        var a = 1;
        var inner = function () {
            return ++a;
        };
        return inner;
    })();
    console.log(outer());
    console.log(outer());
    outer = null; // outer 식별자의 inner 함수 참조를 끊음
(2) setInterval에 의한 클로저의 메모리 해제

    (function() {
        var a = 0;
        var intervalId = null;
        var inner = function() {
            if(++a >= 10) {
                clearInterval(intervalId);
                inner = null; // inner 식별자의 함수 참조를 끊음
            }
            console.log(a);
        };
        intervalId = setInterval(inner, 1000);
    })();

(3) eventListener에 의한 클로저의 메모리 해제

    (function () {
        var count = 0;
        var button = document.createElement('button');
        button.innerText = 'click';

        var clickHandler = function() {
            console.log(++count, 'times clicked');
            if (count >= 10) {
                button.removeEventListener('click', clickHandler);
                clickHandler = null; // clickHandler 식별자의 함수 참조를 끊음
            }
        };
        button.addEventListener('click', clickHandler);
        document.body.appendChild(button);
    })();
2. 언젠가 GC가 수거해갈 것이다.
3. 소모됐던 메모리가 회수된다.

### 03. 클로저 활용 사례
#### 1) 콜백 함수 내부에서 외부 데이터를 사용하고자 할 때
: 외부 데이터에 주목하면서 흐름을 따라가보자.
(1) 콜백 함수를 내부함수로 선언해 외부변수를 직접 참조

    var fruits = ['apple', 'banana', 'peach'];
    var $ul = document.createElement('ul');

    fruits.forEach(function(fruit) { // (A)
        var $li = document.createElement('li');
        $li.innerText = fruit;
        $li.addEventListener('click', function() { 
            // (B)
            alert('your choice is ' + fruit);
        });
        $ul.appendChild($li);
    });
    document.body.appendChild($ul);
> (A) 내부에서 외부 변수를 사용 X ~> 클로저 X.\
fruits의 개수만큼 실행, 그때마다 새로운 실행 컨텐스트 활성화.
>> (B)에는 fruit라는 외부 변수 참조하고 있음 ~> 클로저 O.\
(B)의 outerEnvironmentReference가 (A)의 LexicalEnvironment를 참조. (B) 함수가 참조할 예정인 변수 fruit에 대해서는 (A) 종료 후에도 GC 대상에서 제외되어 계속 참조 가능.

(1)-1 반복을 줄이기 위해 (B)를 외부로 분리해보자.

        var alertFruit = function(fruit) {
            alert('your choice is ' + fruit);
        };
        fruits.forEach(function (fruit) {
            var $li = document.createElement('li');
            $li.innerText = fruit;
            $li..addEventListener('click', alertFruit);
            $ul.appendChild($li);
        });
        document.body.appendChild($ul);
        alertFruit(fruits[1]);
> banana에 대한 얼럿이 실행되지만, 각 li를 클릭하면 대상의 과일명이 아니라 [object MouseEvent]라는 값이 출력된다. 콜백 함수의 인자에 대한 제어권을 addEventListener가 가진 상태고, addEventListener는 콜백 함수를 호출할 때 첫 번째 인자에 '이벤트 객체'를 주입하기 때문.

==> bind 메서드 사용하면 해결 가능!

(2) bind 메서드를 사용하면 . . .

        fruits. forEach(function (fruit) {
            var $li = document.createElement('li');
            $li.innerText = fruit;
            $li.addEventListener('click', alertFruit.bind(null, fruit));
            $ul.appendChild($li);
        });
> 하지만 이렇게 하면 이벤트 객체가 인자로 넘어오는 순서가 바뀌는점, 함수 내부에서의 this가 원래의 this와는 달라지는 점을 감안해야함.
>> bind 메서드의 첫 번째 인자가 바로 새로 바인딩할 this인데, 이 값을 생략할 수 없기 때문에ㅠ 여기서는 두 번째 인자에 이벤트 객체가 넘어올 것이다.

==> 이런 변경사항이 발생하지 않게 하기 위해서는 고차함수를 활용하면 된다.

(3) 고차함수
: 함수를 인자로 받거나 함수를 리턴하는 함수.

        var alertFruitBuilder = function (fruit) {
            return function() {
                alert('your choice is' + fruit);
            };
        };
        fruits.forEach(function (fruit) {
            var $li = document.createElement('li');
            $li.innerText = fruit;
            $li.addEventListener('click', alertFruitBuilder(fruit)); // 함수 실행, fruit 값 인자로 전달. ~> 실행 결과가 함수가 되서 반환된 함수를 콜백 함수로써 전달.
            $ul.appendChild($li);
        });
> alertFruitBuilder 함수가 익명의 함수를 return하는데, 이 함수가 위에서 사용했던 alertFruit함수.
>> 클릭 이벤트 발생시 alertFruit 함수의 실행 컨텍스트가 열리면서 alertFruitBuiler의 인자로 넘어온 fruit를 outerEnvironmentReference에 의해 참조할 수 O
>>> 즉 이 함수에는 클로저가 존재.        

#### 2) 접근 권한 제어(정보 은닉)
- 정보 은닉(information hiding)
: 어떤 모듈의 내부 로직에 대해 외부로의 노출을 최소화해서 모듈간의 결합도를 낮추고 유연성을 높이고자 하는 현대 프로그래밍 언어의 중요한 개념 중 하나.
- 접근 권한
1) public\
: 외부에서 접근 가능.
2) private\
: 내부에서만 사용하며 외부에 노출되지 않는 것을 의미.
3) protected
> 자바스크립트는 기본적으로 변수 자체에 이러한 접근 권한을 직접 부여하도록 설계되어 있지 않음.
>> 그렇다고 접근 권한 제어 불가능 한건 X. 클로저 이용하면 함수 차원에서 public한 값과 private한 값을 구분하는 것이 가능하다9!
##### return 값을 이용해서 외부에 정보를 제공할 수 있음.
- 공개 멤버(public member) : 외부에 제공하고자 하는 정보들을 모아 return한 변수들
- 비공개 멤버(private member) : 그렇지 않은 변수들
> 외부 공간에 노출되어 있는 outer라는 변수를 통해 outer 함수를 실행할 수는 있지만 outer 함수 내부에는 개입 불가능.
>> 오직 outer 함수가 return한 정보에만 접근할 수 있기 때문에.. return 이용하기! 
##### 따라서 클로저를 활용해 접근권한을 제어하는 방법
(1) 함수에서 지역변수 및 내부함수 등을 생성
(2) 외부에 접근권한을 주고자 하는 대상들로 구성된 참조형 데이터(대상이 여럿일 때는 객체 또는 배열, 하나일 때는 함수)를 return한다.

#### 3) 부분 적용 함수
- 부분 적용 함수
: n개의 인자를 받는 함수에 미리 m개의 인자만 넘겨 기억시켰다가, 나중에 (n-m)개의 인자를 넘기면 비로소 원래 함수의 실행 결과를 얻을 수 있게끔 하는 함수.\
~> this를 바인딩해야 하는 점을 제외하면 bind 메서드의 실행 결과가 바로 부분 적용 함수다.

    var add = function() {
        var result = 0;
        for (var i = 0; i < arguments.length; i++) {
            result += arguments[i];
        }
        return result;
    };
    var addPartial = add.bind(null, 1, 2, 3, 4, 5);
    console.log(addPartial(6, 7, 8, 9, 10));
> this의 값을 변경할 수 없기 때문에 메서드에서 사용할 수 X.

    var partial = function() {
        var originalPartialArgs = arguments;
        var func = originalPartialArgs[0];
        if (typeof func !== 'function') {
            throw new Error('첫 번째 인자가 함수가 아닙니다.');
    }
    return function() {
        var partialArgs = Array.prototype.slice.call(originalPartialArgs, 1);
        var restArgs = Array.prototype.slice.call(arguments);
        return func.apply(this, partialArgs.concat(restArgs));
        };
    };

    var add = function() {
        var result = 0;
        for (var i = 0; i < arguments.length; i++) {
            result += arguments[i];
        }
        return result;
    };
    var addPartial = partial(add, 1, 2, 3, 4, 5);
    console.log(addPartial(6, 7, 8, 9, 10)); // 55
> 첫 번째 인자에는 원본 함수를, 두 번째 인자부터는 미리 적용할 인자들을 전달하고, 반환할 함수(부분 적용 함수)에서는 다시 나머지 인자들을 받아 이들을 한데 모아(concat) 원본 함수를 호출(apply)한다.
>> 실행 시점의 this를 그대로 반영해 this에는 아무런 영향을 주지 X.
>>> 부분 적용 함수에 넘길 인자를 반드시 앞에서부터 차례로 전달할 수 밖에 없다는 점이 아쉽.

- 전역객체에 _라는 프로퍼티 준비
: '비워놓음' 표시를 위해\
: 처음에 넘겨준 인자들 중 _로 비워놓은 공간마다 나중에 넘어온 인자들이 차례대로 끼워넣도록 구현
> 이자 개수를 맞춰 미리 빈 공간 확보 안해도 된다.

```js
Object.defineProperty(window, '_', {
  value: 'EMPTY_SPACE',
  writable: false,
  configurable: false,
  enumerable: false,
});

var partial2 = function() {
  var originalPartialArgs = arguments;
  var func = originalPartialArgs[0];
  if (typeof func !== 'function') {
    throw new Error('첫 번째 인자가 함수가 아닙니다.');
  }
  return function() {
    var partialArgs = Array.prototype.slice.call(originalPartialArgs, 1);
    var restArgs = Array.prototype.slice.call(arguments);
    for (var i = 0; i < partialArgs.length; i++) {
      if (partialArgs[i] === _) {
        partialArgs[i] = restArgs.shift();
      }
    }
    return func.apply(this, partialArgs.concat(restArgs));
  };
};

var add = function() {
  var result = 0;
  for (var i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  return result;
};
var addPartial = partial2(add, 1, 2, _, 4, 5, _, _, 8, 9);
console.log(addPartial(3, 6, 7, 10)); // 55

var dog = {
  name: '강아지',
  greet: partial2(function(prefix, suffix) {
    return prefix + this.name + suffix;
  }, '왈왈, '),
};
dog.greet(' 배고파요!'); // 왈왈, 강아지 배고파요!
```

- 디바운스(debounce)
: 짧은 시간 동안 동일한 이벤트가 많이 발생할 경우 이를 전부 처리하지 않고 처음 또는 마지막에 발생한 이벤트에 대해 한 번만 처리하는 것.
> 프론트엔드 성능 최적화에 큰 도움.
>> scroll, wheel, mousemove, resize 등에 적용하기 좋음.

```js
var debounce = function(eventName, func, wait) {
  var timeoutId = null;
  return function(event) {
    var self = this;
    console.log(eventName, 'event 발생');
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func.bind(self, event), wait);
  };
};

var moveHandler = function(e) {
  console.log('move event 처리');
};
var wheelHandler = function(e) {
  console.log('wheel event 처리');
};
document.body.addEventListener('mousemove', debounce('move', moveHandler, 500));
document.body.addEventListener(
  'mousewheel',
  debounce('wheel', wheelHandler, 700)
);
```
> 클로저로 처리되는 변수 : eventName, func, wait, timeoutId
>> 완벽하게 이해 못해서 다시 한번 더 봐야할듯 ㅠ

- Symbol.for 메서드
: 전역 식볼공간에 인자로 넘어온 문자열이 이미 있으면 해당 값을 참조하고, 선언돼 있지 않으면 새로 만드는 방식. 어디서든 접근가능하면서 유일무이한 상수를 만들고자 할 때 적합
> _를 '비워놓음'으로 사용하기 위해 어쩔 수 없이 전역공간을 침범하는 경우를 방지.


#### 4) 커링 함수
##### 커링 함수
: 여러 개의 인자를 받는 함수를 하나의 인자만 받는 함수로 나눠서 순차적으로 호출될 수 있게 체인 형태로 구성한 것.\
: 한 번에 하나의 인자만 전달하는 것을 원칙으로 함.\
: 중간 과정상의 함수를 실행한 결과는 그 다음 인자를 받기 위해 대기만 할 뿐, 마지막 인자가 전달되기 전까지는 원본 함수가 실행되지 않음.
> 부분 적용 함수 : 여러 개의 인자를 전달할 수 있고, 실행 결과를 재실행할 때 원본 함수가 무조건 실행된다.
>> 기본적인 맥락은 일치하지만 다르다!

```js
var curry3 = function(func) {
  return function(a) {
    return function(b) {
      return func(a, b);
    };
  };
};

var getMaxWith10 = curry3(Math.max)(10);
console.log(getMaxWith10(8)); // 10
console.log(getMaxWith10(25)); // 25

var getMinWith10 = curry3(Math.min)(10);
console.log(getMinWith10(8)); // 8
console.log(getMinWith10(25)); // 10
```
> 필요한 상황에 직접 만들어 쓰기 용이
>> but 인자가 많아지면 가독성이 떨어짐.

- 이럴때는 화살표 함수를 사용하면 한 줄에 표기 가능

```js
var curry5 = func => a => b => c => d => e => func(a, b, c, d, e);
```
> 화살표 순서에 따라 함수에 차례로 값을 넘겨주면 마지막에 func가 호출된다.
>> 각 단계에서 받은 인자들을 모두 마지막 단계에서 참조할 것이므로 GC되지 않고 메모리에 차곡차곡 쌓였다가, 마지막 호출로 실행 컨텍스트가 종료된 후에야 비로소 한꺼번에 GC의 수거 대상이 된다.

##### 커링 함수가 유용한 경우
- 지연실행(lazy execution)
: 당장 필요한 정보만 받아서 전달하고 또 필요한 정보가 들어오면 전달하는 식으로 하면 결국 마지막 인자가 넘어갈 때까지 함수 실행을 미루는 것.

ex) 서버에 정보를 요청할 필요가 있을 때마다 매번 baseUrl부터 전부 기입해주기보다는 공통적인 요소는 먼저 기억시켜두고 특정한 값(id)만으로 서버 요청을 수행하는 함수를 만드는게 좋은데, 이러한 이유로 커링을 상당히 광범위하게 사용하고 있음.
> 예) Flux 아키텍처의 구현체 중 하나인 Redux의 미들웨어
