const DBPool = require('../../helper/DBPool');
const ProfessorService = require('../service/ProfessorService');

(async() => {
    try {
        const params = { name: "유지인", userid: "yoojiin", position: "교수", sal: 300, hiredate: "2022-01-01", comm: 20, deptno: 201 };
        let result = await ProfessorService.addItem(params);
        console.log(result);
    } catch (e) {
        console.error(e);
    } finally {
        DBPool.close();
    }
})();