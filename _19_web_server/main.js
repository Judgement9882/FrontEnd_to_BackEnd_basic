const express = require('express'); // npm install express --save
const app = express(); // express 객체 생성

// 서버가 만들어짐 .listen(포트번호, 콜백함수)
// 3000번 포트에 서버가 만들어졌고 호출을 할때마다 콜백함수를 실행
// 크롬브라우저 localhost:3000 => Cannot GET / 이 뜬다.
// get은 뭔가를 달라, /는 루트 디렉토리


//===========================================================
// pages 경로로 들어오는 요청에 대해서는
// 로컬폴더 __dirname : main.js 가 있는 폴더 위치
// __dirname + '/pages' 밑에 있는 것들
// 폴더를 scripts로 바꾼다면 마찬가지로 바꿔줌
app.use('/scripts', express.static(__dirname+'/scripts'));
//===========================================================


app.listen(3000, ()=>{
    console.log('3000번 포트에 귀를 대고 듣기 시작했음.');
});

// 요청을 처리해주는 루틴을 추가
// app.get(디렉토리, 콜백함수)
app.get('/', (req, res) => { // req와 res를 받아서 {} 안의 내용을 실행함
    // req는 들어오는것, res는 나가는것
    // localhost:3000 입력시 나옴
    console.log('===> 루트에 대한 요청들어왔음');
    // res.send('루트에 대한 요청');
    res.sendFile(__dirname+'/pages/index.html') // 해당 html 페이지를 보여줌
})

app.get('/about', (req, res) => {
    // localhost:3000/about 입력시 나옴
    console.log('about에 대한 요청 들어왔음');
    // res.send('about에 대한 요청');
    res.sendFile(__dirname+'/pages/about.html')
})

// nodemon => 실행시 소스코드 변경할 때 마다 서버 정지후 다시 시작
// npm install -g nodemon (-g 는 글로벌 옵션)
// nodemon main.js 실행 후 코드수정 - ctrl+s => 바로 반영

app.get('/working', (req, res) => {
    // localhost:3000/about 입력시 나옴
    console.log('working에 대한 요청 들어왔음');
    // res.send('about에 대한 요청');
    res.sendFile(__dirname+'/pages/working.html')
})