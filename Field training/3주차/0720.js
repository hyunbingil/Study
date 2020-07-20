function invisibility() {
    $('.textarea1')[0].style.backgroundColor = 'transparent';
    $('.textarea1')[0].style.border = '0px';
}
function eee() {
    getpng();
    setTimeout(function() {
        $('.textarea1')[0].style.backgroundColor = 'white';
        $('.textarea1')[0].style.border = '1px solid black'
    }, 5000);
    // $('.textarea1')[0].style.backgroundColor = 'white';
    // $('.textarea1')[0].style.border = '1px solid black';
}

// function invisibility() {
//     for (jj=0; jj<36; jj++) {
//         $('.textarea1')[jj].style.backgroundColor = 'transparent';
//         $('.textarea1')[jj].style.border = '0px';
//     }
//     getpng();
//     for (ii=0; ii<36; ii++) {
//         $('.textarea1')[ii].style.backgroundColor = 'white';
//         $('.textarea1')[ii].style.border = '1px solid black';
//     }
//   }

function getpng() {
    var element = document.querySelector('#capture');
    var opt = {
        filename: "myfile.pdf",
        image: {type: 'jpeg', quality: 1},
        html2canvas: { scale: 2 },
        jsPDF: {unit: 'mm', format: [333,475], 
        //orientation: 'landscape'
        }
    };
    html2pdf().set(opt).from(element).save();
}

  function fnSaveAsPdf() {
    //특정부분 스크린샷
    console.log("함수 실행");
    html2canvas(document.querySelector("#capture"))
    //id carousel-example-generic 부분만 스크린샷
    .then(function (canvas) {
       console.log("capture");
        var imgData = canvas.toDataURL('image/png'); // 캔버스를 이미지로 변환
        var imgWidth = 210; // 이미지 가로 길이(mm) A4 기준
        var pageHeight = imgWidth * 1.414; // 출력 페이지 세로 길이 계산 A4 기준
        var imgHeight = canvas.height * imgWidth / canvas.width;

        var doc = new jsPDF({
          // orientation: 'p',
          unit: 'mm',
          format: [333,475],
        });
        
        doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight); // 이미지넣기
        doc.save('sample_A3.pdf'); // pdf로 이미지 저장하기
        console.log('Reached here?');
    });
}  