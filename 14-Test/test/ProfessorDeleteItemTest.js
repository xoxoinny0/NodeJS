const DBPool = require('../../helper/DBPool');
const ProfessorService = require('../service/ProfessorService');

(async() => {
    try {
        const params = { profno: 9930 };
        await ProfessorService.deleteItem(params);
    } catch (e) {
        console.error(e);
    } finally {
        DBPool.close();
    }
})();