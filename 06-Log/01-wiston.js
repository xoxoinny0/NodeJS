/** 1) 패키지 참조 */
const { mkdirs } = require("../helper/FileHelper");
const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');

/** 2) 환경설정 정보 */
const LOG_PATH = '_files/_logs';
const LOG_LEVEL = 'debug';

/** 3) 로그가 저장될 폴더 생성 */
mkdirs(LOG_PATH);

/** 4) 로그가 출력될 형식 지정하기 위한 함수 추출 */
const { combine, timestamp, printf, splat, colorize } = winston.format;

/** 5) winston 객체 만들기 */
const logger = winston.createLogger({
    // 로그의 전반적인 형식
    format: combine(
        timestamp({
            // 날짜 출력형식은 https://day.js.org/docs/en/display/format 참고
            // format: 'YYYY-MM-DD HH:mm:ss',
            format: 'YY/MM/DD HH:mm:ss SSS', 
        }),
        printf((info) => {
            return `${info.timestamp} [${info.level}] : ${info.message}`;
        }),
        splat()
    ),
    // 일반 로그 규칙 정의
    transports: [
        // 하루에 하나씩 파일 형태로 기록하기 위한 설정
        new winstonDaily({
            name: "log",
            level: LOG_LEVEL, // 출력할 로그의 수준
            datePattern: 'YYMMDD', // 파일 이름에 표시될 날짜 형식
            dirname: LOG_PATH, // 파일이 저장될 위치
            filename: "log_%DATE%.log", // 파일이름 형식
            maxSize: 50000000,
            maxFiles: 50,
            zippedArchive: true,
        }),
    ],
});

/** 6) 콘솔 설정 */
// 프로덕션 버전(=상용화 버전)이 아니라면?
if (process.env.NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console({
            prettyPrint: true,
            showLevel : true,
            level: LOG_LEVEL,
            format: combine(
                colorize({ all: true }),
                printf((info) => {
                    return `${info.timestamp} [${info.level}] : ${info.message}`;
                })
            ),
        })
    );
}

logger.error("error 메시지 입니다. (1수준)");
logger.warn("warn 메시지 입니다. (2수준)");
logger.info("info 메시지 입니다. (3수준)");
logger.verbose("verbose 메시지 입니다. (4수준)");
logger.debug("debug 메시지 입니다. (5수준)");



