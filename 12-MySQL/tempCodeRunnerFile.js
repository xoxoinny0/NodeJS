const connectionInfo = {
    host: process.env.DATABASE_HOST, // MYSQL 서버 주소 (다른 PC인 경우 IP 주소),
    port: process.env.DATABASE_PORT, // MYSQL 포트번호
    user: process.env.DATABASE_USERNAME, // MYSQL에 로그인 할 수 있는 계정이름
    password: process.env.DATABASE_PASSWORD, // 비밀번호
    database: process.env.DATABASE_SCHEMA, // 사용하고자 하는 데이터베이스 이름
    connectionLimit: process.env.DATABASE_CONNECTION_LIMIT, // 최대 커넥션 수,
    connectTimeout: process.env.DATABASE_CONNECT_TIMEOUT, // 커넥션 타임아웃
    waitForConnections: process.env.DATABASE_WAIT_FOR_CONNECTIONS, // 커넥션 풀이 다 찬 경우 처리
};