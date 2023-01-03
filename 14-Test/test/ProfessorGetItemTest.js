const DBPool = require('../../helper/DBPool');
const ProfessorService = require('../service/ProfessorService');

(async() => {
    try {
        const params = { profno: 9902 };
        let result = await ProfessorService.getItem(params);
        console.log(result);
    } catch (e) {
        console.error(e);
    } finally {
        DBPool.close();
    }
})();