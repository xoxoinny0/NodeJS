/** (1) 모듈참조 */
// 아래 모듈을 설치가 필요함 --> npm install --save axios
const axios = require('axios');
const logger = require('../helper/LogHelper');

/** (2) 접속할 서버의  호스트 이름과 요청정보(path) 설정 */
const url = 'http://data.hossam.kr/simple_text.txt';

/** (3) GET방식으로 접속하기 위한 객체 생성 (promise 방식) */
axios
    .get(url)
    .then(function (response) {
        //지정된 url의 컨텐츠를 성공적으로 가져온 경우 호출된다.
        // --> 응답을 성공적으로 수신했다고 표현된다.
        logger.debug('Promise 방식 - ' + response.data);
    })
    .catch(function (error) {
        // Axios 표준 에러 내용
        logger.error(`[Error Code] ${error.code}`);
        logger.error(`[Error Message] ${error.message}`);

        // 백엔드에 접속은 되었으나 에러가 발생한 경우
        // 아래 내용이 표시되지 않는다면 대상 시스템에 접속조차 못한 경우이다.
        // ex) 도메인 자체가 잘못됨, 네트워크 연결이 되지 않음 등
        if (error.response !== undefined) {
            // 지정된 url로의 요청에 실패한 경우 호출된다.
            // 에러 내용에서 상태코드(숫자)와 에러 메시지만 추출
            // [HTTP 상태코드]
            // 200(OK)
            // 404(Page Not Found), 401(권한없음, 로그인필요), 403(접근금지, 폴더에 접속한 경우)
            // 50x(접속대상에서 에러가 나고 있는 경우)
            const errorMsg = `${error.response.status} error - ${error.response.statusText}`;
            logger.error(`[HTTP Status] ${errorMsg}`);
        }
    })
    .finally(function () {
        // 성공, 실패 여부에 상관 없이 마지막에 무조건 호출된다
        // 필요 없다면 이 부분은 구현하지 않아도 된다.
        logger.debug('Promise방식 - fin');
    });

logger.debug('promise 방식으로 HTTP 요청');

