'use strict'

// // javascript --> typescript (데이터형 명확하게 지정해야함)

// // 1번에 있는 html 파일을 불러오려함
// let request = new XMLHttpRequest() // web browser -> 다른 곳으로 갈 수 있는 객체를 만들어줌
// request.open('GET', 'http://127.0.0.1:5500/_1_hello_world/hello.html', false) // GET 명령 : 특정 파일을 달라고 요청 , 목적어 : ip 주소 + 디렉토리 + 파일명
// request.send(null) // 리퀘스트 보내기

// if (request.status == 200){ // 200 : 서버가 제대로 보내줬다
//     console.log(request.responseText) // 실제로 받아온 것을 찍을 수 있음
// }

// // 동기식 진행 : 위에 내용을 다운로드 하기 전 까지는 밑의 반복문을 수행안함
// // 비동기식 진행 : 위에 다운을 하면서 아래 반복문을 수행 -> promise
// for (let i = 0 ; i < 10; i++){
//     console.log(i);
// }

// // Promise라는 클래스가 있음
// const a = new Promise( (resolve) => {
//     // 해야 할 일 지정
//     console.log('hello');
//     // 해야할 일이 끝나고 나면 다 끝났다고 알려줌 resolve
//     setTimeout(()=>{
//         resolve('ended');
//     }, 3000);
// })

// // 약속이 지켜져서 resolve가 호출이 됐으면 실행
// // v = 'ended'
// a.then((v) => {
//     console.log(`then received : ${v}`);
// });

// // Promise를 사용했기 때문에 a.then(v) 보다 먼저 실행됨
// for (let i = 0 ; i < 10; i++){
//     console.log(2*i);
// }
// ========================================
// // 63.
// // 동기식 요청 -> 비동기식 요청 (Promise 없이 구현해보자)
// let request = new XMLHttpRequest();

// // 서버로부터 응답이 왔을 때, 실행될 코드를 지정, 핸들러, 이벤트 핸들러를 지정해서 응답을 처리
// // onload : 요청에 대한 응답이 로딩될 때
// // 이부분은 요청을 하고 답징이 왔을때 수행하는 부분
// // 아래에다 쓰면 요청을 하고 미리 구현이 안됐는데 답장이 올수도 있음
// // 반드시 보내기전에 미리 설정을 해야함
// request.onload = () => {
//     if (request.status === 200){
//         console.log('응답이 제대로 왔음');
//         console.log(request.responseText);
//     }
//     else{
//         console.log('응답이 제대로 오지 않았음');
//     }
// }

// request.open('GET', 'http://127.0.0.1:5500/_1_hello_world/hello.html', true) // true, false -> 비동기, 동기식
// request.send(null);

// for (let i = 0 ; i < 10; i++){
//     console.log(2*i);
// }
// =============================================
// // 64. Promise를 이용한 비동기 서버 요청
// // html request는 구식
// // Promise :fetch 이용

// // fetch : 서버로 부터 웹페이지를 가져오다
// // fetch return은 Promise 반환함
// const a = fetch('http://127.0.0.1:5500/_1_hello_world/hello.html');

// // 실패를 시키는 방법 : 파일명 잘못입력


// // fetch API에서 resolve, reject 다 처리해줌
// // then, catch만 적으면됨
// a
// .then((response)=>{ // fetch 성공
//     console.log(`서버응답 도착`);
//     return response.text();// text()는 return이 문자열이 아님 Promise 반환
// })
// .then((data)=>{ // Promise를 다시 then으로 받아 data로 받으면 됨 (Promise Chaining)
//     console.log(`문자열로 바꾼 응답 : ${data}`);
// })

// a.
// catch((err)=>{
//     console.log(`서버응답 에러 ${err}`);
// })
// =========================================================

// a 없이 한번에 써보면
// fetch('http://127.0.0.1:5500/_1_hello_world/hello.html')
// .then((response)=>{ // fetch 성공
//     console.log(`서버응답 도착`);
//     return response.text();// text()는 return이 문자열이 아님 Promise 반환
// })
// .then((data)=>{ // Promise를 다시 then으로 받아 data로 받으면 됨 (Promise Chaining)
//     console.log(`문자열로 바꾼 응답 : ${data}`);
// })
// .catch((err)=>{
//     console.log(`서버응답 에러 ${err}`);
// })


// for (let i = 0 ; i < 10; i++){
//     console.log(2*i);
// }

// =========================================================
// 65 async : syntactic sugar for promise
// 코팅 : 설탕성분 : 약을 쉽게 넘길수 있도록 만들어줌(당의정)
// async 의 역할 -> Promise를 쉽게쓰게 해줌


function B(){
    new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log(`B가 실행됨`);
            resolve(45)
        }, 3000);
    })
}

// 앞에 async 가 붙으면 무조건 promise
async function fetchUser(a){
    console.log(`Promise 실행`) // 원래 실행 부분

    // B는 동기 => 완전히 끝났을 때 넘어와야 undefined가 안넘어옴
    // await -> 동기함수를 비동기적으로 실행될 수 있게끔 만들어줌
    // async 함수 내부에서만 사용 가능, 다른 Promise의 종료를 기다릴 때 사용가능
    const k = await B();

    if(k>=0){ // 양수면 resolve
        return '실행끝';
    }
    else{ // 음수면 reject
        throw new Error('음수');
    }
}

// 아래는 변하지 않음
const a = fetchUser(-10)
a.then((v)=>{
    console.log(`fetchUser result : ${v}`);
})
.catch((E)=>{
    console.log(`fetchUser result : ${E}`);
})
.finally(()=>{ // resolve reject 상관없이 promise 종료되면서 공통적으로 실행
    console.log(`Promise 끝 from finally`);
})











