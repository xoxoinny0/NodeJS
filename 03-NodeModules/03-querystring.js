/** (1) 모듈 참조하기 */
const {URL, URLSearchParams} = require('url');

/** (2) URL에서 querystring 부분만 추출 */
// 분석할 URL에서 쿼리부분만 추출하기
const address = 'http://www.itpaper.co.kr:8765/hello/world.html?a=123&b=456';
const {searchParams} = new URL(address);
console.debug(searchParams);

// (3) URL에서 추출한 모든 변수는 string타입이다.
console.debug('요청 파라미터 중 a의 값: %s (%s)', searchParams.get("a"), typeof searchParams.get("a"));
console.debug('요청 파라미터 중 b의 값: %s (%s)', searchParams.get("b"), typeof searchParams.get("b"));

// (4) 객체 타입의 파라미터값을 JSON으로 변환
const params = Object.fromEntries(searchParams);
console.log(params);

/** (5) JSON객체를 QueryString 문자열로 변환 */
// URL에 포함될 수 없는 글자는 자동으로 Encoding처리함.
const obj = { name: 'hello', nick: 'world', 'address': '서울시 서초구'};
const str = new URLSearchParams(obj);
console.log(str);
console.log('조합된 요청 파라미터: %s', str);



