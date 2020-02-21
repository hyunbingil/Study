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
....오늘 콜백 함수 너무 많이 해서 지금 보기도 싫어요 내일 수정할래.요..

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

집중력 떨어져서 뭐라는지 모르겠어 진짜 멍청인가 내일 다시 제대로 빡 집 중 해서 봐야 이해 가능할듯.......

#### 4) 커링 함수
- 커링 함수
: 여러 개의 인자를 받는 함수를 하나의 인자만 받는 함수로 나눠서 순차적으로 호출될 수 있게 체인 형태로 구성한 것.\
: 한 번에 하나의 인자만 전달하는 것을 원칙으로 함.\
: 중간 과정상의 함수를 실행한 결과는 그 다음 인자를 받기 위해 대기만 할 뿐, 마지막 인자가 전달되기 전까지는 원본 함수가 실행되지 않음.
> 부분 적용 함수 : 여러 개의 인자를 전달할 수 있고, 실행 결과를 재실행할 때 원본 함수가 무조건 실행된다.

