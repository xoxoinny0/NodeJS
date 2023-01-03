const DBPool = require('../../helper/DBPool');
const ProfessorService = require('../service/ProfessorService');

(async() => {
    try {
        const params = { profno: 9929, name: '수정된이름', userid: 'updateid',position: '부교수', sal: 301, hiredate: "2022-01-02", comm: 30, deptno: 102};
        let result = await ProfessorService.editItem(params);
        console.log(result);
    } catch (e) {
        console.error(e);
    } finally {
        DBPool.close();
    }
})();