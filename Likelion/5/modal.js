const openAnswer = document.querySelector(".map_icon_img");
const closeAnswer = document.querySelector(".close-button");
// const reservationAnswer = document.querySelector(".reservationreservation-button");
const modal = document.querySelector(".modal-wrapper");
// const madal_res = document.querySelector('.modal-wrapper-res');
openAnswer.onclick = () => {
    modal.style.display = "flex";
};

closeAnswer.onclick = () => {
    modal.style.display = "none";
};

// reservationAnswer.onclick = () => {
//     madal_res.style.display = "flex";
// }