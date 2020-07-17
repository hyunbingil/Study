# HTML -> PDF
## 첫 번째 방법
: HTML -> CANVAS -> PDF\
: 화질이 좋지 않음.
### HTML2CANVAS
: https://html2canvas.hertzen.com/documentation

### JSPDF
: https://rawgit.com/MrRio/jsPDF/master/docs/jsPDF.html

## 두 번째 방법 (Increase the quality of the image)
: .from() -> .toContainer() -> .toCanvas() -> .toImg() -> .toPdf() -> .save()\
: 화질 개선 가능.\
: but dom 단위라서 바뀐 것들이 나오지 않음.\
=> 큰일남.
### HTML2PDF
: https://www.npmjs.com/package/html2pdf.js#image-type-and-quality

# 비밀번호 조건 달기
