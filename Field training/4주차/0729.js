$("#rfiCreate #myTab a").click(function(e) {
			
    e.preventDefault();
    let buttonObject = $("#rfiPrint");
    
    const tabName = $(this).text();
    if ((tabName === "Report List") || (tabName === "Memo")) {
        buttonObject.hide();
    }
});

$('#rfiCreate #mobileRb').click(function (e) {
    checkedPaperRb = false;
    $("#rfiCreate").find(".modal-dialog").removeClass("modal-lg");
    $("#rfiCreate #carousel-example-generic").hide();
    $("#rfiCreate #itpCheckForm").show();
    $("#rfiPrint").hide();
})

$('#rfiCreate #paperRb').click(function (e) {
    checkedPaperRb = true;
    $("#rfiCreate").find(".modal-dialog").addClass("modal-lg");
    $("#rfiCreate #carousel-example-generic").show();
    $("#rfiCreate #itpCheckForm").hide();
    resizeEvent($("#rfiCreate"));
    $("#rfiPrint").show();
})


function invisibility() {
	$('div#itpFormList *').css({'background-color':'transparent', 'border' : '0px',});
	// #itpFormList의 후손들 모두를 선택
}
	
function fnSaveAsPdf() {
	invisibility();
	var element = document.querySelector('#finList');
	var opt = {
	    filename: "finList.pdf", // 파일 이름 설정
	    image: {type: 'jpeg', quality: 1},
	    html2canvas: { scale: 2, logging: true },
	    jsPDF: {unit: 'mm', format: [230, 317]},
	}
	html2pdf().set(opt).from(element).save();
	setTimeout(function() {
	    $('div#itpFormList *').css({'background-color':'', 'border' : '',});
	}, 2000);
}
      