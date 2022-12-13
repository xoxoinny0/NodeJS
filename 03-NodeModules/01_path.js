/** (1) 모듈참조 */
/** ES5 스타일 모듈 참조 */
const path = require('path');

/** (2) 경로 합치기 */
// 파라미터의 제한이 없다.
// 조합된 경로 문자열에 해당하는 Path가 실제로 존재하는지는 상관없다.
const currentPath = path.join('C:/Users/hello/world', 'myphoto', '../photo.jpg');
console.group("\npath.join");
console.debug(currentPath);
console.groupEnd();

/** (3) 경로에서 디렉토리, 파일명, 확장자 구분하기 */
// --> C:/Users/hello/world/photo.jpg
const dirname = path.dirname(currentPath);
const basename = path.basename(currentPath);
const extname = path.extname(currentPath);
console.group("\n경로 분할하기");
console.debug('디렉토리: %s', dirname);
console.debug('파일이름: %s', basename);
console.debug('확장자: %s', extname);
console.groupEnd();

/** (4) 경로정보 파싱 */
// 경로의 성분을 JSON 형태로 한번에 분할
const parse = path.parse(currentPath);
console.group("\n경로정보 파싱");
console.debug(parse);
console.debug("root: " + parse.root);
console.debug("dir: " + parse.dir);
console.debug("name: " + parse.name);
console.debug("ext: " + parse.ext);
console.groupEnd();





