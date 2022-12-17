/**
 * @FileName: UtilHelper.js
 * @Description: 백엔드 개발시 자주 사용되는 독립 함수들 모음
 */

const {networkInterfaces} = require('os');
const nodemailer = require('nodemailer');
const logger = require('./LogHelper');

class UtilHelper {
    static #current = null;

    static getInstance() {
        if (UtilHelper.#current === null) {
            UtilHelper.#current = new UtilHelper();
        }

        return UtilHelper.#current;
    }

    myip() {
        const ipAddress = [];
        const nets = networkInterfaces();

        for (const attr in nets) {
            const item = nets[attr];

            item.map((v, i) => {
                if ((v.family == 'IPv4' || v.family == 4) && v.address != '127.0.0.1') {
                    ipAddress.push(v.address);
                }
            });
        }

        return ipAddress;
    };

    urlFormat(urlobject) {
        return String(Object.assign(new URL("http://a.com"), urlobject));
    }

    async sendMail(writerName, writerEmail, receiverName, receiverEmail, subject, content) {
        if (writerName) {
            writerEmail = `${writerName} <${writerEmail}>`;
        }

        if (receiverEmail) {
            receiverEmail = `${receiverName} <${receiverEmail}>`;
        }

        const smtp = nodemailer.createTransport({
            host: process.env.SMTP_HOST, 
            port: process.env.SMTP_PORT,
            secure: true, 
            auth: {
                user: process.env.SMTP_USERNAME, 
                pass: process.env.SMTP_PASSWORD, 
            },
        });

        try {
            await smtp.sendMail({
            from: writerEmail,
            to: receiverEmail,
            subject: subject,
            html: content
            })
        } catch (e) {
            logger.error(e.message);
            throw new Error('메일 발송에 실패했습니다.');
        }
    }
}

module.exports = UtilHelper.getInstance();