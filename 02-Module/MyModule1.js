/** 사용자 정의 함수를 작성. */
function helloWorld() {
    console.log("Hello World");
}

/** 작성된 함수를 모듈로 등록 */
module.exports = helloWorld;

// 아래와 같이 축약형으로도 작성 가능하다.
// module.exports = function() {
//     console.log("Hello World");
// }
