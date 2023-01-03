const DBPool = require('../../helper/DBPool');
const ProfessorService = require('../service/ProfessorService');

(async() => {
    try {
        let result = await ProfessorService.getCount();
        console.log(result);
    } catch (e) {
        console.error(e);
    } finally {
        DBPool.close();
    }
})();