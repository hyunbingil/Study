### Chapter. 02. 실행 컨텍스트
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

#### VariableEnvironment
: 현재 컨텍스트 내의 식별자들에 대한 정보 + 외부 환경 정보.\
: 선언 시점의 LexicalEnvironment의 스냅샷으로, 변경 사항은 반영되지 않음.
> 담기는 내용은 LexicalEnvironment와 같지만 최초 실행 시의 스냅샷을 유지한다는 점이 다름.

: 여기에 먼저 정보를 담고 그대로 복사해서 LexicalEnvironment를 만들고 이후에 LexicalEnvironment를 활용.
- 내부 (LexicalEnvironment도 같음)
: environmentRecord와 outer-EnvironmentReference로 구성되어 있음.

#### LexicalEnvironment
: 사전적 환경이라고 생각하면 된다.\
~> ex) 현재 컨텍스트 내부에는 a,b,c와 같은 식별자들이 있고 그 외부 정보는 D를 참조하도록 구성되어있다.
##### environmentRecord와 호이스팅
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



