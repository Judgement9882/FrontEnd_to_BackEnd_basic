const express = require('express')
const mysql = require('mysql') // npm install mysql
const path = require('path')
const static = require('serve-static')

const dbconfig = require('./config/dbconfig.json')

// Database connection pool
const pool = mysql.createPool({
    connectionLimit : 10, // maximum connection
    host : dbconfig.host, // ip address
    user : dbconfig.user,
    password : dbconfig.password,
    database : dbconfig.database,
    debug : false
})

const app = express()
app.use(express.urlencoded({extended:true}))

app.use(express.json())

app.use('/public', static(path.join(__dirname, 'public')));
// app.use('/public', express.static(__dirname+'/public'));


app.get('/', (req, res) => { // req와 res를 받아서 {} 안의 내용을 실행함
    // req는 들어오는것, res는 나가는것
    // localhost:3000 입력시 나옴
    console.log('===> 루트에 대한 요청들어왔음');
    // res.send('루트에 대한 요청');
    res.sendFile(__dirname+'/public/adduser.html') // 해당 html 페이지를 보여줌
})

app.post('/process/login', (req, res)=> {
    console.log('/process/login 호출됨 '+req)

    const paramId = req.body.id;
    const paramPassword = req.body.password;

    console.log('로그인 요청' + paramId+ ' ' + paramPassword );

    pool.getConnection((err, conn)=>{
        if(err){
            conn.release();
            console.log('Mysql getConeection error. aborted');
            res.writeHead('200', {'Content-Type' : 'text/html; charset=utf8'})
            res.write('<h1>DB서버 실행 실패 </h1>')
            res.end();
            return;
        }
        conn.query('use ?;', [dbconfig.database]);
        const exec = conn.query('select id, age from dbtest where id=? and password=md5(?)', 
                    [paramId, paramPassword],
                    (err, result) =>{
                        conn.release();
                        console.log('실행된 SQL: ' + exec.sql)

                        if (err){
                            console.log('SQL 실행시 오류 발생')
                            console.dir(err);
                            res.writeHead('200', {'Content-Type' : 'text/html; charset=utf8'})
                            res.write('<h1>SQL 실행 실패 </h1>')
                            res.end();
                            return;
                        }

                        // length가 0이상이면 있다는 뜻.
                        if (result.length > 0) {
                            console.log('패스워드가 일치하는 아이디 [%s]와 사용자 나이[%s] 찾음', paramId, result[0].age);
                            res.writeHead('200', {'Content-Type' : 'text/html; charset=utf8'})
                            res.write('<h2>로그인 성공 </h2>')
                            res.end();
                            return;
                        }
                        // 패스워드가 틀렸다거나 아이디 일치하는게 없는것
                        else{
                            console.log('패스워드가 일치하는 아이디 [%s] 없음', paramId);
                            res.writeHead('200', {'Content-Type' : 'text/html; charset=utf8'})
                            res.write('<h2>로그인 실패. 아이디와 패스워드를 확인하세요. </h2>')
                            res.end();
                            return;
                        }
                    }
        )
    });

});


app.post('/process/adduser', (req, res)=> {
    console.log('/process/adduser 호출됨 '+req)

    const paramId = req.body.id;
    const paramGender = req.body.gender;
    const paramAge = req.body.age;
    const paramPassword = req.body.password;

    pool.getConnection((err, conn)=>{
        if (err){
            conn.release();
            console.log('Mysql getConeection error. aborted');
            res.writeHead('200', {'Content-Type' : 'text/html; charset=utf8'})
            res.write('<h1>DB서버 실행 실패 </h1>')
            res.end();
            return;
        }

        console.log('데이터베이스 연결 끈 얻었음');
        conn.query('use ?;', [dbconfig.database])
        const exec = conn.query('insert into dbtest (id, gender, age, password) values (?, ?, ?, md5(?));', 
                    [paramId, paramGender, paramAge, paramPassword],
                    (err, result)=>{
                        conn.release();
                        console.log('실행된 SQL: ' + exec.sql)

                        if (err){
                            console.log('SQL 실행시 오류 발생')
                            console.dir(err);
                            res.writeHead('200', {'Content-Type' : 'text/html; charset=utf8'})
                            res.write('<h1>SQL 실행 실패 </h1>')
                            res.end();
                            return;
                        }

                        if(result){
                            console.dir(result);
                            console.log('Inserted 성공');

                            res.writeHead('200', {'Content-Type' : 'text/html; charset=utf8'})
                            res.write('<h2>사용자 추가 성공</h2>')
                            res.end();
                        }
                        else{
                            console.dir(result);
                            console.log('Inserted 실패');

                            res.writeHead('200', {'Content-Type' : 'text/html; charset=utf8'})
                            res.write('<h2>사용자 추가 실패</h2>')
                            res.end();
                        }

                    }
        )
        
    })
});

app.listen(3000, ()=>{
    console.log('listening on port 3000');
})