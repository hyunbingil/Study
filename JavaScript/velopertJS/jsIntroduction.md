### 1. 변수와 상수
#### 변수
: 바뀔수 있는 값

    let value = 1;

> var은 이제 쓰지 마세오 . .

#### 상수
: 바뀔 수 없는 값

    const a = 1;

#### 데이터 타입
1. 숫자 (Number)
2. 문자열 (String)
3. 참/거짓 (Boolean)
4. 없음 
- null\
: 값이 없다.

    const friend = null;

- undefined\
: 값이 설정되지 않았다.
> 변수 선언했지만 값 지정 X.

    let criminal;

### 2. 연산자
#### 산술 연산자
- +,-,*,/
- ++a, a++ : 1 더하기 직접 값, 1 더한 다음 값

#### 대입 연산자
- +=, -=, *=, /=

#### 논리 연산자
: Boolean형을 위한 연산자
- !(not), &&(and), ||(or)
> 연산 순서도 이 순서대로!

#### 비교 연산자
- ===
> ==은 타입 검사까지는 하지 않는다. (자료형 검사X)

#### 두 값이 일치하지 않는지 확인
- !==
>!= 타입 검사X.

#### 크고 작음
: >,<,>=,<=

### 주석
: //, /**/

### 문자열 붙이기
: +로 붙일 수 있다. (python도 되는거같은데 찾아봐야겠당)

    const a = "펩시가";
    const b = "짱이야";
    console.log(a+b);

### 3. 조건문
#### if 문    

    if(조건){
        코드;
    }

#### if-else 문

    if(조건){
        코드;
    } else{
        코드;
    }
#### if-else if 문

    if(조건1){
        코드;
    } else if(조건2){
        코드;
    } else{

    }
#### switch/case 문

    switch(변수){
        case 변수값1:
        코드;
        break;

        case 변수값2:
        코드;
        break;

        default:
    }

### 4. 함수

    function add(a,b){
        return a + b; //함수의 결과물 지정 & 함수 끝!
    }

#### 화살표 함수
: function 키워드 대신에 => 문자를 사용해 함수를 구현.

    const add = (a,b) => {
        return a+b;
    }

    console.log(add(1,2));
> 화살표 함수와 일반 function 으로 만든 함수와의 주요 차이점은 화살표 함수에서 가르키는 this 와 function 에서 가르키는 this 가 서로 다르다!

### 5. 객체
: 우리가 변수 혹은 상수를 사용하게 될 때 하나의 이름에 여러 종류의 값을 넣을 수 있게 해준다.

    const dog = {
        name: "앵두",
        age: 2
    };

    console.log(dog.name);
    console.log(dog.age);
 > 키: 원하는 값 (파이썬 딕셔너리랑 비슷한듯..?)
 > 파라미터로 string사용하라고 하네 ``이거에 ${}이거 쓰는거 ㅎㅎ

 #### 객체 비구조화 할당
 
    const ironMan = {
        name: '토니 스타크',
        actor: '로버트 다우니 주니어',
        alias: '아이언맨' 
    };

    function print(hero){
        const {alias, name, actor} = hero;
        const text = `${alias}(${name}) 역할을 맡은 배우는 ${actor}입니다.`;
    }

    print(ironMan);
 >  const {alias, name, actor} = hero; //객체에서 값들을 추출해 새로운 상수로 선언

    function print({alias, name, actor}){
        const text = `${alias}(${name}) 역할을 맡은 배우는 ${actor}입니다.`;
    }
> 더 간단쓰!.!

#### 객체 안에 함수 넣기

    const dog = {
        name: "앵두",
        sound: "앙!",
        say: function say(){
            console.log(this.sound);
        }
    };

    dog.say();
 > 출력 결과 : 앙!

 : 함수가 객체안에 들어가면 this는 자신이 속해있는 객체를 가르키게 된다. 함수 선언 시 이름 없어도 괜춘.!

 <u>여기서 화살표 함수로 선언하면 작동 X.</u>


#### Getter 함수와 Setter 함수
: const로 객체를 정의했어도 객체안의 값은 수정가능! 특정 값을 바꾸려고 하거나, 특정 값을 조회하려고 할 때 이 함수들을 사용하면 원하는 코드를 실행시킬 수 O.
1. Getter 함수
: 특정 값을 조회 할 때 우리가 설정한 함수로 연산된 값을 반환.

    const numbers = {
        a: 1,
        b: 2,
     get sum() {
        console.log('sum 함수가 실행됩니다!');
        return this.a + this.b;
         }
    };

    console.log(numbers.sum);
    numbers.b = 5;
    console.log(numbers.sum);

 > numbers.sum()을 하지 않고 numbers.sum을 조회했는데 함수가 실행되고 그 결과값이 출력된다.   

2. Setter 함수
~> 잘 모르겠음ㅠ 그냥 이런게 있다 . . .

### 6. 배열
: 여러개의 항목들이 들어있는 리스트와 같다.

    const array = [1,2,3,4,5];
    const objects = [{name: "앵두"}, {name: "애옹이"}];
 > 객체 배열도 가능\
 objects[0]; 이렇게 조회가능   

 #### 배열에 새 항목 추가하기

    objects.push({name: "연두"});
> 내장함수인 push 사용.!

#### 배열의 크기 알아내기
: objects.length 이런식으로 값 알아낼 수 있음.

### 7. 반복문
: 특정 작업을 반복적으로 할 때 사용

#### for

    for (let i =0; i<10; i++){
        console.log(i);
    }

    for(초기 구문; 조건 구문; 변화 구문;){
        코드
    }

##### 배열과 for

    for (let i = 0; i < names.length; i++){
        console.log(names[i]);
    }

 #### 객체를 위한 반복문 for...in
 - Object.entries : [[키, 값], [키, 값]] 형태의 배열로 변환
 - Object.keys : [키, 키, 키] 형태의 배열로 변환
 - Object.values : [값, 값, 값] 형태의 배열로 변환
> 이 함수 사용해도 되고 for...in 구문 사용해도 된당.

    for(let key in 객체명){
        console.log(`${key}: ${doggy[key]}`);
    }

#### while
: 특정 조건이 참이라면 계속해서 반복하는 반복문    

    let i = 0;
    while (i<10){
        console.log(i);
        i++;
    }
 
#### break와 continue
: 반복문 안에서 break와 continue를 이용해 반복문에서 벗어나거나(break) 그 다음 루프를 실행 할 수 있음(continue).

##### 예제
당연히 바로 풀었쥬? 사진 첨부 나중에 할 예정 ㅎㅎ
~> 아 어디갔어 저장 안해놨네 ㅡㅡ

### 8. 배열 내장함수
#### forEach
: for문 대체

    const superheroes = ['아이언맨', '캡틴 아메리카', '토르', '닥터 스트레인지'];

    superheroes.forEach(hero => {
        console.log(hero);    
    });
> forEach 함수의 파라미터 hero는 각 원소를 가르키게 된다.

#### map(변화함수)
: 배열 안의 각 원소를 변환 할 때 사용\
ex) 각 배열 안의 원소를 제곱시킨 새로운 배열을 만들래

    const array = [1,2,3];
    const square = n => n*n;
    const squared = array.map(squre);
    console.log(squared);

#### indexOf
: 원하는 항목이 몇번째 원소인지 찾아준다.

    const superheroes = ['아이언맨', '캡틴 아메리카', '토르', '닥터 스트레인지'];
    const index = superheroes.indexOf('토르');
    console.log(index);
 > 결과 : 2

#### findIndex
 : 배열 안에 있는 값이 객체거나 배열이면 indexOf로 찾을 수 X

    const index = todos.findIndex(todo => todo.id === 3);
    console.log(index);
 > 객체이름 : todos / 요소들 : id, text, done

#### find
 : findIndex랑 비슷하지만 몇번째인지 알아내는게 X ~> 찾아낸 값 자체 반환.

    const todo = todos.find(todo => todo.id === 3);
    console.log(todo);
 > 출력결과 : {id: 3, text: "어쩌구", done: true}        

#### filter
 : 배열에서 특정 조건을 만족하는 값들만 따로 추출해 새로운 배열을 만든다.

    const tasksNotDone = todos.filter(todo => todo.done === false);
    console.log(taskNotDone);
 > 출력결과 : [{id: 4, text: "저쩌구", done: flase}];

#### splice
 : 배열에서 특정 항목을 제거할 때 사용\
 : .splice(어떤 인덱스부터 지울래, 그 인덱스부터 몇개 지울래)

    const numbers = [10,20,30];
    const index = numbers.indexOf(30);
    numbers.splice(index, 1);

#### slice
: 배열을 잘라낼 때 사용\
: .slice(어디서부터 자를래, 어디까지 자를래)

    const sliced = numbers.slice(0,2);
 > 0부터 1까지만 남긴다는 뜻..! 난 맨날이게 헷갈리더라 python에서도 비슷한거 있는데 거기서도 똑같이 앞에 0은 살아있고 뒤에 2는 잘려나간다고 생각하면 쉽다... 그러니까 총 0,1만 남는거.... 헷갈리지 말기.!

#### shift와 pop
 - shift : 첫번째 원소를 배열에서 추출
 > 배열에서 해당 원소 사라짐
 - pop : 마지막 원소를 배열에서 추출(push 반대)
  > 배열에서 해당 원소 사라짐

#### unshift
  : shift의 반대.! ~> 배열의 맨 앞에 새 원소 추가.

#### concat
  : 여러개의 배열을 하나의 배열로 합쳐줌

    const arr1 = [1,2,3];
    const arr2 = [4,5,6];
    const concated = arr1.concat(arr2);
> concated 배열 = [1,2,3,4,5,6]

#### join
: 배열 안의 값들을 문자열 형태로 합쳐줌
- 배열이름.join() : 1,2,3,4,5
- 배열이름.join(' ') : 1 2 3 4 5
- 배열이름.join(', ') : 1, 2, 3, 4, 5

#### reduce

    const numbers = [1,2,3,4,5];
    let sum = array.reduce((accumulator, current) => accumulator + current, 0);
 > accumulator : 누적된 값   

##### 예제
얘는 저장했어유^^.

### 9. 프로토타입과 클래스
#### 객체 생성자
: 함수를 통해 새로운 객체를 만들고 그 안에 넣고 싶은 값 혹은 함수들을 구현 할 수 있게 해줌.

    function Animal(type, name, sound){
        this.type = type;
        this.name = name;
        this.sound = sound;
        this.say = function(){
            console.log(this.sound);
        };
    }

    const dog = new Animal('개','멍멍이','멍멍');
    dog.say();
> 객체 생성자 사용 시 함수 이름 대문자, 새로운 객체 만들경우에는 new 키워드 앞에 붙이기

#### 프로토타입
: 같은 객체 생성자 함수를 사용할 경우, 특정 함수 또는 값을 재사용 할 수 있음

    .prototype.원하는키 = 코드

    function Animal(type, name, sound){
        this.type = type;
        this.name = name;
        this.sound = sound;
    }

     Animal.prototype.say = function(){
            console.log(this.sound);
        };

    const dog = new Animal('개','멍멍이','멍멍');
    dog.say();    

#### 객체 생성자 상속받기

    function Dog(name, sound){
        Animal.call(this, "개", name, sound);
    }
    Dog.prototype = Aniaml.prototype;
> Dog 함수에서 Animal.call 호출... 첫번째에는 this 넣어줘야해..! 그리고 protype 공유해야해서 저렇게 설정해준겨...

#### 클래스
: 객체 생성자로 구현했던 코드를 조금 더 명확하고, 깔끔하게 구현 가능.. 상속도 훨씬 쉽게 해줌.

    Class Animal{
        constructor(type, name, sound){
            this.type = type;
            this.name = name;
            this.sound = sound;
        }
        say(){
            console.log(this.sound);
        }
    }
    
    const dog = new Animal("개","앵두","왕!");

    dog.say();

: 클래스 내부의 함수를 '메서드'라고 부름. 메서드 만들면 자동으로 prototype로 등록된다.

#### 클래스 상속
: extends를 사용해서 상속하고 super() 함수가 상속받은 클래스의 생성자를 가르킴.

    Class Dog extends Aniaml{
        constructor(name, sound){
            super('개',name,sound);
        }
    }
    
    const dog = new Dog("앵두", "왕!");

    dog.say();