// 객체야 안녕?
let user = {
    name: "John",
    surname: "Smith",
}

user.name = "Pete";
delete user.name;

// 객체가 비어있는지 확인하기
function isEmpty(obj) {
    for (let key in obj) {
        return false
    }
    return true
}

let schedule = {};
alert( isEmpty(schedule) ); // true
schedule["8:30"] = "get up";
alert( isEmpty(schedule) ); // false

// 프로퍼티 합계 구하기
let salaries = {
    John: 100,
    Ann: 160,
    Pete: 130
}

let sum = 0;

for (let key in salaries) {
    sum += salaries[key];
}

alert(sum);

// 프로퍼티 값 두 배로 부풀리기

function multiplyNumeric(obj) {
    for (let key in obj) {
        if(typeof obj[key] == 'number') {
            obj[key] = obj[key] * 2;
        }
    }
}

let menu = {
    width: 200,
    height: 300,
    title: "My menu"
  };
  
multiplyNumeric(menu);
