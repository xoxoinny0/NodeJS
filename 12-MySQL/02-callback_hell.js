/** (1) 모듈 및 환경설정 불러오기 */
const {join, resolve} = require('path');
const dotenv = require('dotenv');
const mysql = require('mysql2');

// 설정 파일 내용 가져오기
dotenv.config({path: join(resolve(), ".env.server.development")});

// 접속 정보 설정
const connectionInfo = {
    host: process.env.DATABASE_HOST, // MYSQL 서버 주소 (다른 PC인 경우 IP 주소),
    port: process.env.DATABASE_PORT, // MYSQL 포트번호
    user: process.env.DATABASE_USERNAME, // MYSQL에 로그인 할 수 있는 계정이름
    password: process.env.DATABASE_PASSWORD, // 비밀번호
    database: process.env.DATABASE_SCHEMA // 사용하고자 하는 데이터베이스 이름
};

console.log(connectionInfo);

/** (2) mysql 접속 객체 생성 */
const dbcon = mysql.createConnection(connectionInfo);

/** (3) 데이터베이스 접속 */
dbcon.connect((error) => {
    if(error) {
        console.error("데이터베이스 접속에 실패했습니다.");
        console.error(error);
        return;
    }

    const targetDeptno = 101;

    /** (4) INSERT, UPDATE, DELETE 쿼리 생성하기 */
    dbcon.query("DELETE FROM student WHERE deptno=?", [targetDeptno], (error, result) => {
        if (error) {
            console.error("SQL문 실행에 실패했습니다.");
            console.error(error);
            dbcon.end();
            return;
        }

        dbcon.query("DELETE FROM professor WHERE deptno=?", [targetDeptno], (error, result) => {
            if (error) {
                console.error("SQL문 실행에 실패했습니다.");
                console.error(error);
                dbcon.end();
                return;
            }

            dbcon.query("DELETE FROM department WHERE deptno=?", [targetDeptno], (error, result) => {
                if (error) {
                    console.error("SQL문 실행에 실패했습니다.");
                    console.error(error);
                    dbcon.end();
                    return;
                }

                // 저장결과 확인
                console.log('반영된 데이터의 수: ' + result.affectedRows);
                // 데이터베이스 접속 해제(중요)
                dbcon.end();
            });
        });
    });
});