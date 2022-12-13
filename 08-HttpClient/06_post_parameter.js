/**
 * $ npm install --save form-data
 */
const axios = require('axios');
const { from } = require('form-data');
// 아래 모듈은 설치가 필요함 --> npm install --save form-data
const FormData = require('form-data')
const logger = require('../helper/LogHelper');

(async() => {
    let result = null;
    try {
        // POST 방식으로 전송할 파라미터 정의 --> 가상의 <form> 태그를 생성
        const form = new FormData();

        // form 태그에 input요소 추가와 같은 원리
        form.append('num1', 200);
        form.append('num2', 300);

        // POST 방식 전송
        const response = await axios.post('http://data.hossam.kr/post.php', form, {
            // application/x-www-form-unlencoded
            headers: form.getHeaders()
        });
        result = response.data;
    } catch(error) {
        logger.error(`[Error Code] ${error.code}`);
        logger.error(`[Error Message] ${error.message}`);

        if (error.response !== undefined) {
            const errorMsg = `${error.response.status} error - ${error.response.statusText}`;
            logger.error(`[HTTP Status] ${errorMsg}`);
        }
        return;
    }

    logger.debug('다른 백엔드로부터 응답받은 결과값: ' + result);
})();