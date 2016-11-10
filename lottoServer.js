// 서버 생성
var server = require('http').createServer();
// localhost(127.0.0.1)의 52273 port 에 서버 실행
server.listen(52273, function() {
    console.log('server running at http://127.0.0.1:52273');
});
// 5초후 서버 종료, 그리고 프로그램 종료
setInterval(function() {
    server.close();
    console.log('server closed');
    process.exit();
}, 5000);