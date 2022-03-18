// 기본적으로 모듈로 만들어져 있음
// 끝부분에 다른 파일에서 사용할 수 있도록 해두면됨..
function showLogMessage(msg){
    console.log('-------------------')
    console.log(`log message : ${msg}`);
    console.log('-------------------')
}

function showLogMessage2(msg){
    console.log('-------------------')
    console.log(`log message2 : ${msg}`);
    console.log('-------------------')
}

const precious_value = 78

// module.exports.다른파일에서 쓸 때 쓰는 이름 = 지금 파일에서 쓰는 이름
// 보통 같게 씀
module.exports.showLogMessage = showLogMessage;
module.exports.secondLog = showLogMessage2;
module.exports.pvalue = precious_value;