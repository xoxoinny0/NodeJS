/**
 * 스케쥴에 따른 자동 수행
 */
/** (1) 필요한 패키지 참조하기 */
const logger = require('../helper/LogHelper');
const schedule = require('node-schedule');

/** (2) 매 분 10초마다 수행 */
const rule1 = new schedule.RecurrenceRule();
rule1.second = 10;
schedule.scheduleJob(rule1, () => logger.debug(`[rule1] 매분 ${rule1.second}초 마다 수행!!`));

/** (3) 매 시간 분,초마다 수행 */
const rule2 = new schedule.RecurrenceRule();
rule2.minute = 35;
rule2.second = 20;
schedule.scheduleJob(rule2, () => logger.debug(`[rule2] 매시간 ${rule2.minute}분 ${rule2.second}초 마다 수행!!`));

/** (4) 매일 시,분,초마다 수행 */
const rule3 = new schedule.RecurrenceRule();
rule3.hour = 12;
rule3.minute = 35;
rule3.second = 37;
schedule.scheduleJob(rule3, () => logger.debug(`[rule3] 매일 ${rule3.hour}시 ${rule3.minute}분 ${rule3.second}초 마다 수행!!`));

/** (5) 일주일 중 0번째 요일과 1번째~6번째 요일까지 (0=sun, 6=sat) 실행 */
const rule4 = new schedule.RecurrenceRule();
rule4.dayOfWeek = [0, new schedule.Range(1, 6)];
rule4.second = 35;
schedule.scheduleJob(rule4, () => logger.debug(`[rule4] 매주 월~토 매 분 ${rule4.second}초마다 실행`));

logger.info('예약작업이 설정되었습니다.');


