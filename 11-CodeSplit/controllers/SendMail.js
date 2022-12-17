const logger = require("../../helper/LogHelper");
const regexHelper = require("../../helper/RegexHelper");
const { sendMail } = require("../../helper/UtilHelper");
const express = require("express");

module.exports = (() => {
  const router = express.Router();

  // 메일발송 기능 모듈화
  router.post("/send_mail2", async (req, res, next) => {
    /** 1) 프론트엔드에서 전달한 사용자 입력값 */
    const {
      writer_name,
      writer_email,
      receiver_name,
      receiver_email,
      subject,
      content,
    } = req.body;

    /** 2) 입력값 형식 검사 */
    try {
      regexHelper.value(writer_name, "발송자 이름을 입력하세요.");
      regexHelper.value(writer_email, "발송자 이메일을 입력하세요.");
      regexHelper.email(writer_email, "발송자 이메일 주소가 잘못되었습니다.");
      regexHelper.value(receiver_name, "수신자 이름을 입력하세요.");
      regexHelper.value(receiver_email, "수신자 이메일을 입력하세요.");
      regexHelper.email(receiver_email, "수신자 이메일 주소가 잘못되었습니다.");
      regexHelper.value(subject, "제목을 입력하세요.");
      regexHelper.value(content, "내용을 입력하세요.");
    } catch (err) {
      return next(err);
    }

    /** 3) 메일 발송 */
    try {
      await sendMail(
        writer_name,
        writer_email,
        receiver_name,
        receiver_email,
        subject,
        content
      );
    } catch (err) {
      return next(err);
    }

    /** 4) 성공시 결과 처리 */
    res.sendResult();
  });

  return router;
})();

