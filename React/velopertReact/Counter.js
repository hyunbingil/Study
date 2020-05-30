import React, {useState} from 'react';

function Counter() {
    const [number, setNumber] = useState(0);

    const onIncrease = () => {
        setNumber(number+1);
    }
    const onDecrease = () => {
        setNumber(number-1);
    }
    return (
        <div>
            <h1>{number}</h1>
            <button onClick = {onIncrease}>+1</button>
            {/* 리액트에서 엘리먼트에 이벤트를 설정해줄 때는 on이벤트이름={실행하고 싶은 함수} 형태로 설정해야함 */}
            <button onClick = {onDecrease}>-1</button>
        </div>
    );
}

export default Counter;