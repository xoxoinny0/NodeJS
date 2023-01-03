const express = require('express');
const logger = require('../../helper/LogHelper');

module.exports = (() => {
    const url = '/session';
    const router = express.Router();

    
    router
        .post('/session', (req, res, next) => {
            // POST로 전송된 변수값을 추출
            const username = req.body.username;
            const nickname = req.body.nickname;

            // 세션 저장
            req.session.username = username;
            req.session.nickname = nickname;

            // 결과 응답
            const json = { rt: 'ok'};
            res.status(200).send(json);
        })
        .get('/session', (req, res, next) => {
            // 저장되어 있는 모든 session값 탐색
            for (let key in req.session) {
                const str = '[session] ' + key + '=' + req.session[key];
                logger.debug(str);
            }

            // 세션 데이터를 JSON으로 구성 후 클라이언트에게 응답으로 전송
            const my_data = {
                username: req.session.username,
                nickname: req.session.nickname,
            };

            res.status(200).send(my_data);
        })
        .delete('/session', async (req, res, next) => {
            let result = 'ok';
            let code = 200;

            try {
                await req.session.destroy();
            } catch (e) {
                logger.error(e.message);
                result = e.message;
                code = 500;
            }

            const json = { rt: result };
            res.status(code).send(json);
        });

    return router;
})();