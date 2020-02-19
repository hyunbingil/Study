## Chapter. 02. 실행 컨텍스트
: 실행할 코드에 제공할 환경 정보들을 모아놓은 객체
#### 실행 컨텍스트란?
: 동일한 환경에 있는 코드들을 실행할 때 필요한 환경 정보들을 모아 컨텍스트를 구성하고, 이를 콜 스택(call stack)에 쌓아올렸다가, 가장 위에쌓여있는 컨텍스트와 관련 있는 코드들을 실행하는 식으로 전체 코드의 환경과 순서를 보장.
- 하나의 실행 컨텍스트로 구성할 수 있는 방법 (동일한 환경)
    - 전역공간
    - eval() 함수
    - 함수

        var a = 1;
        function outer(){
            function inner(){
                console.log(a);
                var a = 3; // inner 함수 안에서만 a = 3 헷갈 ㄴㄴ
            }
            inner();
            console.log(a);
        }
        outer();
        console.log(a);

- 종류
    - VariableEnvironment
    - LexicalEnvironment
    - ThisBinding

### VariableEnvironment
: 현재 컨텍스트 내의 식별자들에 대한 정보 + 외부 환경 정보.\
: 선언 시점의 LexicalEnvironment의 스냅샷으로, 변경 사항은 반영되지 않음.
> 담기는 내용은 LexicalEnvironment와 같지만 최초 실행 시의 스냅샷을 유지한다는 점이 다름.

: 여기에 먼저 정보를 담고 그대로 복사해서 LexicalEnvironment를 만들고 이후에 LexicalEnvironment를 활용.
- 내부 (LexicalEnvironment도 같음)
: environmentRecord와 outer-EnvironmentReference로 구성되어 있음.

### LexicalEnvironment
: 사전적 환경이라고 생각하면 된다.\
~> ex) 현재 컨텍스트 내부에는 a,b,c와 같은 식별자들이 있고 그 외부 정보는 D를 참조하도록 구성되어있다.
- 받아오는 것(내부 구성)
: environmentRecord와 outerEnvironmentReference

#### environmentRecord와 호이스팅
- environmentRecord
: 식별자 정보 저장
> 매개변수 이름, 함수 선언, 변수명 등

~> 컨텍스트 내부 전체를 처음부터 끝까지 쭉 훑어나가면서 '순서대로' 수집.\
=> 이미 해당환경에 속한 코드의 변수명을 모두 알고 있게 되는 셈..\
==> 식별자들을 최상단으로 끌어올려 놓은 다음 실제 코드를 실행한다고 생각해도\
~> 코드 해석 문제 X

- 호이스팅(hoisting)
: 식별자 정보를 수집하는 과정으로 식별자들을 끌어올리고 할당부분은 밑에 그대로 둔다.\
~> 고려한거랑 안한거랑 다른 값 나옴.

- 함수 선언문 vs 함수 표현식
    - 함수 선언문
    : function 정의부만 존재하고 별도의 할당 명령 X.\
    : 반드시 함수명 정의되어야 함.

            function sum (a,b){
                return a + b;
            }
    - 함수 표현식
    : 정의한 function을 별도의 변수에 할당하는 것.
    : 기명 함수 표현식 - 함수명 정의
    > 외부에서 함수명으로 호출 X. 변수명으로 호출 가능.
    : 익명 함수 표현식 - 함수명 정의 X. ~> 일반적으로 말하는 함수 표현식.

            var multiply = function (a,b){
                return a * b;
            }

        var sum = function sum(a, b){
            return a + b;
        }; // 함수 선언문은 전체를 호이스팅함.
        var multiply;

        console.log(sum(1,2));
        console.log(multiply(3,4));

        multiply = function(a, b){
            return a * b;
        }; // 변수의 할당부는 원래 자리에 남겨둔다.

#### 스코프, 스코프 체인, outerEnvironmentReference
- outerEnvironmentReference
: 스코프와 스코프 체인을 가능하게 하는 것
: 연결리스트 형태

1. 스코프
: 식별자에 대한 유효범위
> 어떤 경계 A의 외부에서 선언한 변수는 A의 외부뿐 아니라 A의 내부에서도 접근이 가능하지만,
A의 내부에서 선언한 변수는 오직 A의 내부에서만 접근할 수 있음.

: 전역공간을 제외하면 오직 함수에 의해서만 스코프가 생성된다.

2. 스코프 체인
: '식별자의 유효범위'를 안에서부터 바깥으로 차례로 검색해나가는 것을 스코프 체인이라고 함.\
: 현재 호출된 함수가 선언될 당시의 LexicalEnvironment를 참조.
> '선언하다'라는 행위가 실제로 일어날 수 있는 시점 : 콜 스택 상에서 어떤 실행 컨텐스트가 활성화된 상태일 때.

        var a = 1;
        var outer = function(){
            var inner = function(){
                console.log(a);
                var a = 3;
            };
            inner();
            console.log(a);
        };
        outer();
        console.log(a);
> 함수 outer  내부에 함수 inner를 선언한 경우, 함수 inner의 outerEnvironmentReference는 함수 outer의 LexicalEnvironment를 참조
>> 이런식으로 계속 올라가면서 참조하다보면 전역 컨텐스트의 LexicalEnvironment가 있을 것이다.

: 그래서 outerEnvironmentReference가 연결 리스트 형태.\
: 구조적 특성 때문에 여러 스코프에서 동일한 식별자를 선언한 경우에는 무조건 스코프 체인 상에서 가장 먼저 발견된 식별자에만 접근이 가능.