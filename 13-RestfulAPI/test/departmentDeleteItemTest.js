const DBPool = require('../../helper/DBPool');
const departmentService = require('../service/DepartmentService');

(async() => {
    try {
        const params = { deptno: 101 };
        await departmentService.deleteItem(params);
    } catch (e) {
        console.error(e);
    } finally {
        DBPool.close();
    }
})();