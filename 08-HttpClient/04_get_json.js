const axios = require('axios');
const logger = require('../helper/LogHelper');

const url = 'http://data.hossam.kr/grade_card.json';

(async() => {
    let json = null;
    try {
        // axios를 활용하여 json 데이터 요청
        const response = await axios.get(url);
        json = response.data;
    } catch(error) {
        logger.error(`[Error Code] ${error.code}`);
        logger.error(`[Error Message] ${error.message}`);

        if (error.response !== undefined) {
            const errorMsg = `${error.response.status} error - ${error.response.statusText}`;
            logger.error(`[HTTP Status] ${errorMsg}`);
        }
        return;
    }

    json.grade_card.forEach((v, i) => {
        logger.debug('[%d번째 항목] 이름: %s, 학년: %d, 성별: %s, 국어: %d, 영어: %d, 수학: %d, 과학: %d', i, v.이름, v.학년, v.성별, v.국어, v.영어, v.수학, v.과학);
    })
})();
