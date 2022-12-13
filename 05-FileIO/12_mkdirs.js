const { mkdirs } = require('../helper/FileHelper');
const path = require('path');

// 상대경로 방식으로 폴더 생성하기
// --> VSCode가 열고 있는 프로젝트 폴더 기준
const target1 = './test/dir/make';
console.log(`target1 => ${target1}`);
mkdirs(target1);

// 절대경로 방식으로 폴더 생성하기
// __dirname --> 현재 실행중인 소스코드가 위치하고 있는 디렉토리의 절대경로
console.log(`__dirname => ${__dirname}`)
const target2 = path.join(__dirname, 'hello/node/js');
console.log(`target2 => ${target2}`);
mkdirs(target2);
