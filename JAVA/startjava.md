## 자바란?
### Java? JDK? J2SE?
: 자바 플랫폼을 사용한 개발 혹인 실행을 위한 API이다.

### 자바의 특징
#### 1. 쉬운 난이도 
: C와 C++ 문법을 차용한 언어. 포인터, 다중 상속 등의 개념을 없애 문법적인 난이도 낮춤.
#### 2. Garbage Collector
: 

## 메모리와 자료형
### 변수(Variable)
: 변할 수 있는 수
### 상수(Constants)
: 값이 변하지 않는 데이터 공간\
: 변수 앞에 final을 붙여서 사용
> final int a = 2;

### 자료형 - 기본형(Primitive Type)
#### 1. Integral Type (정수 형태)
: integer, short, long
#### 2. floating point Type (실수 형태)
: float, double
> java에서 일반적인 실수는 기본적으로 double형이다.
>> 따라서 float 형에 실수를 저장할 경우 12.34f 이런식으로 f 적어주기.
#### 3. Character Type (문자 형태)
: character
> 한 개의 문자만 저장이 가능하므로 단어 or 문장 넣지 X.
>> 여러 개 문자 저장하는 자료형은 String
#### 4. Boolean Type (참/거짓 형태)
: boolean

### 자료형 - 참조형
: 주소를 저장하는 자료형으로, 자바에서는 모두 객체의 주소.
> 포인터 같다 . . .
1. Class Type
2. Interface Type
3. Array Type
4. Enum Type

### 형변환(Type Casting)
: 자료형 변환해주기
#### 1. 명시적 형변환
: 변수 형태를 명시적을 지정하여 자료형을 바꾸는 행위
``` java
import java.io.*;
class Main {
    public static void main(String[] args) {
        double varDouble = 98.76;
        int varInteger = (int)varDouble;
        System.out.println(varInteger);	
    }
}
```
#### 2. 묵시적 형변환
: 형태를 명시하지 않는 변환
> 묵시적 형변환이 가능한 조건 = 목표 자료형 크기가 바꾸려는 데이터의 자료형 크기보다 클 때이다.
``` java
import java.io.*;
class Main {
    public static void main(String[] args) {
        short varShort = 5;
        double varDouble = varShort;
        System.out.println(varDouble); 
    }
}
```
> short 형 데이터는 2byte, double 형 데이터는 8byte라서 가능.

### 연산자
#### 대입연산자(=)
: 우측의 값을 좌측에 대입한다.\
=> 좌측과 우측의 자료형이 동일할 때 사용 가능.
> 좌측의 변수만 변함.
#### 산술연산자
: +,-,*,/,%
#### 복합대입연산자
: 대입연산자와 산술연산자가 합쳐진 모습.\
: +=, -=, *=, /=, %=
``` java
import java.io.*;
class Main {
    public static void main(String[] args) throws Exception {
        int a = 1;
        a += 2;	// a = a + 2; 와 같음
        System.out.println(a);

        int b = 5;
        b -= 1;	// b = b - 1; 과 같음
        System.out.println(b);
	
        int c = 2;
        c *= 3;	// c = c * 3; 과 같음
        System.out.println(c);

        int d = 6;
        d /= 2;	// d = d / 2; 와 같음
        System.out.println(d);

        int e = 9;
        e %= 2;	// e = e % 2; 와 같음
        System.out.println(e);
    }
}
```
#### 비교연산자
: 연산자의 좌우 값을 비교하는 연산자\
=> 결과는 true, false로 된다.