const openAnswer = document.querySelector(".show-button");
const closeAnswer = document.querySelector(".close-button");
const modal = document.querySelector(".modal-wrapper");

openAnswer.onclick = () => {
    modal.style.display = "flex";
};

closeAnswer.onclick = () => {
    modal.style.display = "none";
};

