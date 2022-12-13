const nodemailer = require('nodemailer'); // 메일발송 -> app.use()로 추가설정 필요 없음
const logger = require('../helper/LogHelper');

// 메일 발송이 비동기 처리를 위한 promise객체를 리턴하기 때문에 async~await 문법을 적용해야 한다.
// 그러므로 router에 연결되는 콜백 함수를 asnyc 함수 형태로 정의한다.
router.post('/send_mail', async(req, res, next) => {
    /** 1) 프론트엔드에서 전달한 사용자 입력값 */
    let { writer_email, receiver_email } = req.body;
    const { writer_name, receiver_name, subject, content } =  req.body;

    /** 2) 보내는 사람, 받는 사람의 메일주소와 이름 */
    // 보내는 사람의 이름과 주소
    // --> 외부 SMTP 연동시 주의사항 - 발신주소가 로그인 계정과 다를 경우 발송이 거부됨
    if (writer_name) {
        writer_email = writer_name + ' <' + writer_email + '>';
    }

    // 받는 사람의 이름과 주소
    if (receiver_name) {
        receiver_email = receiver_name + ' <' + receiver_email + '>';
    }

    /** 메일 발송정보 구현 */
    const sendInfo = {
        from: writer_email,
        to: receiver_email,
        subject: subject,
        html: content
    };
    logger.debug(JSON.stringify(sendInfo));

    /** 4) 메일 서버 연동 정보 구성 */
    const configInfo = {
        host: process.env.SMTP_HOST, // SMTP 서버명
        port: process.env.SMTP_PORT, 
        secure: true, 
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
        },
    };
    logger.debug(JSON.stringify(configInfo));

    /** 4) 발송이 필요한 서버 정보를 사용하여 발송객체 생성 */
    const smtp = nodemailer.createTransport(configInfo);

    /** 5) 메일 발소 ㅇ요청 */
})