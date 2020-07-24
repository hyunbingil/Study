function invisibility() {
    $('div#itpFormList *').css({'background-color':'transparent', 'border' : '0px',});
    // #itpFormList의 후손들 모두를 선택
    fnSaveAsPdf();
  }

function fnSaveAsPdf() {
    var element = document.querySelector('#capture2');
    var opt = {
        filename: "final.pdf", // 파일 이름 설정
        image: {type: 'jpeg', quality: 1},
        html2canvas: { scale: 2, logging: true },
        jsPDF: {unit: 'mm',
                   format: [230, 317]
        }, 
        }
    html2pdf().set(opt).from(element).save();
}