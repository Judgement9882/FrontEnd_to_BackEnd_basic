console.log('hello node js'); // ctrl + `  => 터미널 열림

// node js version 확인 : node --version
// 실행 : node app.js

// 함수
function sayHello(name){
    console.log(`Hello ${name}`);
}

sayHello('John');
sayHello('Alice');

const v = 1;
if (v > 5){
    console.log('it is a big number');
}else{
    console.log('작은 숫자야');
}


// 일정 주기마다 자동 실행
setInterval(()=>{
    console.log('Node js 연습중 3초에 한번씩')
}, 3000);

// 딱 한번만 실행
setTimeout(()=>{
    console.log('5초 지났다');
}, 5000)

// 70. Module : Nodejs를 사용하는 이유, 함수들의 집합, 라이브러리
// logger.js에서 showLogMessage를 쓰려고 함

// 개인이 만든 모델은 .js 붙이는게 좋을듯함
const logger = require("./logger.js") // 불러오기

logger.showLogMessage('모듈 테스트');

// express 모듈 아주 강력함. (웹서버)

logger.secondLog('모듈 테스트');
console.log(`p value is ` + logger.pvalue)