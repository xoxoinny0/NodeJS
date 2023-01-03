const DBPool = require('../../helper/DBPool');
const departmentService = require('../service/DepartmentService');

(async() => {
    try {
        const params = { deptno: 102 };
        let result = await departmentService.getItem(params);
        console.log(result);
    } catch (e) {
        console.error(e);
    } finally {
        DBPool.close();
    }
})();