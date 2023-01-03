const DBPool = require('../../helper/DBPool');
const departmentService = require('../service/DepartmentService');

(async() => {
    try {
        const params = { dname: '헬로학과', loc: '이젠1403호' };
        let result = await departmentService.addItem(params);
        console.log(result);
    } catch (e) {
        console.error(e);
    } finally {
        DBPool.close();
    }
})();