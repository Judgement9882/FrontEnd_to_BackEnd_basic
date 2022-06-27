/*
    HTTP response status code

    sendStatus()

    postman : 하나의 프로그램 
    웹브라우저가 하는일을 시뮬레이션 해줌
*/

const express = require('express');
const app = express();

app.get('/', (req, res)=>{
    // res.sendStatus(200) // 200 : OK
    res.sendStatus(400) // 400 : Bad Request 문법에 안맞음
    // 403 : forbidden : 외부 공개 x
    // 404 : not found : 자료 없음
    // 500 : internal server error : 요청잘받아서 처리하다가 서버문제생김
    // 503 : service unavailable : 지금 서버 죽었음.. 처리못해
})

app.listen(3000, ()=>{
    console.log('start listening on 3000');
})