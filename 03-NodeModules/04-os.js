/** (1) OS모듈 참조 */
const {networkInterfaces} = require('os');

/** (2) 네트워크 정보 */
const nets = networkInterfaces();
console.log(nets);

for (const attr in nets) {
    console.group('Network장치 이름: %s', attr);

    const item = nets[attr];

    item.forEach((v, i) => {
        console.debug('주소형식: %s', v.family);
        console.debug('Ip주소: %s', v.address);
        console.debug('맥주소: %s', v.mac);
        console.debug('넷마스크: %s', v.netmask);
        console.debug();
    });

    console.groupEnd();
}