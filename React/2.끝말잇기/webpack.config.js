const path = require('path');

module.exports = {
    name: 'wordrelay-setting',
    node: 'development', // 실서비스에서는 production으로 바꾸면 된다.
    devtool: 'eval', //빠르게 하겠다.
    resolve: {
        extensions: ['.js', '.jsx']
    },

    // 제일 중요한 애들
    entry: {
        app: ['./client'], // 배열로 나타내주기
        // client.jsx가 WordRelay.jsx를 불러오기 때문에 따로 적을 필요 X.
    }, // 입력
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js' // entry안에 있는 친구들을 합쳐서 이 친구로 만들어준다.
    }, // 출력
};

//웹팩은 webpack.config.js에서 모든게 돌아간다.