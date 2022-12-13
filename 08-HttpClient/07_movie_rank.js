const axios = require('axios');
const logger = require('../helper/LogHelper');

(async() => {
    let json = null;
    try {
        // axios를 활용하여 다른 백엔드에게 HTTP GET 파라미터를 전달하고 결과를 리턴받는다.
        const response = await axios.get("http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json", {
            params: {
                // 발급받은 승인키
                key: '72edb1fd45b1adcfb186a6089230b85b',
                // 검색일(당일 데이터는 지원하지 않음)
                targetDt: '20221206'
            }
        });

        // 응답 결과 확인
        logger.debug(JSON.stringify(response.data));

        // 응답결과를 변수에 복사한다.
        json = response.data;
    } catch (error) {
        logger.error(`[Error Code] ${error.code}`);
        logger.error(`[Error Message] ${error.message}`);

        if (error.response !== undefined) {
            const errorMsg = `${error.response.status} error - ${error.response.statusText}`;
            logger.error(`[HTTP Status] ${errorMsg}`);
        }
        return;
    }

    json.boxOfficeResult.dailyBoxOfficeList.forEach((item, index) => {
        logger.debug(`[제목]: ${item.movieNm},\t[관람객수]: ${item.audiCnt}`);
    })
})();