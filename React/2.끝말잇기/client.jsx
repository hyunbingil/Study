const React = require('react');
const ReactDom = require('react-dom');
// 스크립트로 안불러오고 노드의 모듈 시스템으로 npm에 설치했던걸 이렇게 불러올 수 있음.

const WordRelay = require('./WordRelay');
// 여기서 WordRelay가 WordRelay.jsx의 class인 WordRelay가 된다.
ReactDom.render(<WordRelay />, document.querySelector('#root'));

// 쪼개둔 파일들을 여기에 모아서 사용 가능 -! 드래곤볼인줄 ㅋ.ㅋ
