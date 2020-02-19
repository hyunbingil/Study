const number = document.querySelector("#number");
const minus = document.querySelector("#minus");
const plus = document.querySelector("#plus");

minus.onclick = () => {
    const current = parseInt(number.innerText, 10);
    // string을 10진법으로 바꾼다.
    number.innerText = current - 1;
};

plus.onclick = () => {
    const current = parseInt(number.innerText, 10);
    number.innerText = current + 1;
};