const cp_h1 = document.body.querySelector('#_h1');
let num = 1;
// 1초에 한번씩 1씩 더해서 h1을 보여주는 스크립트
setInterval(()=>{
    cp_h1.textContent = num;
    num += 1;
}, 1000)

// 오류 -> /pages 에 대한 설정을 안해뒀음. main.js로 다시 가서 수정