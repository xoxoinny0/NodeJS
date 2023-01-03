const DBPool = require('../helper/DBPool');
const mybatisMapper = require('mybatis-mapper');

mybatisMapper.createMapper([
    './12-MySQL/mappers/DepartmentMapper.xml',
    './12-MySQL/mappers/ProfessorDepartmentMapper.xml',
    './12-MySQL/mappers/ProfessorMapper.xml',
    './12-MySQL/mappers/StudentMapper.xml',
]);

(async() => {
    let dbcon = null;

    try {
        dbcon = await DBPool.getConnection();
    } catch(err) {
        console.error('데이터베이스 접속 객체 임대 실패');
        console.error(err);
        return;
    }

    // try {
    //     let params = { profno: 9922 };
    //     let query = mybatisMapper.getStatement("ProfessorMapper", "selectItem", params);
    //     let [result] = await dbcon.query(query);
    //     console.log(result);
    // } catch (err) {
    //     console.error(err);
    //     return;
    // }

    // try {
    //     params = { position: "교수", offset:0, listCount: 3 };
    //     query = mybatisMapper.getStatement('ProfessorMapper', 'selectList', params);
    //     [result] = await dbcon.query(query);
    //     console.log(result);
    // } catch (err) {
    //     console.error(err);
    //     return;
    // }

    // try {
    //     params = { name: "유지인", userid: "yoojiin", position: "교수", sal: 300, hiredate: "2022-01-01", comm: 20, deptno: 201 };
    //     query = mybatisMapper.getStatement('ProfessorMapper', 'insertItem', params);
    //     [result] = await dbcon.query(query);
    //     console.log(`affectedRows=${result.affectedRows}, insertId=${result.insertId}`);
    // } catch (err) {
    //     console.error(err);
    //     return;
    // }

    // try {
    //     params = { profno: 9925 };
    //     query = mybatisMapper.getStatement('ProfessorMapper', 'deleteItem', params);
    //     [result] = await dbcon.query(query);
    //     console.log(`affectedRows=${result.affectedRows}`);
    // } catch (err) {
    //     console.error(err);
    //     return;
    // }

    try {
        params = { profno: 9926, name: '수정된이름', userid: 'updateid',position: '부교수', sal: 301, hiredate: "2022-01-02", comm: 30, deptno: 202};
        query = mybatisMapper.getStatement('ProfessorMapper', 'updateItem', params);
        [result] = await dbcon.query(query);
        console.log(`affectedRows=${result.affectedRows}`);
    } catch (err) {
        console.error(err);
        return;
    }

    // try {
    //     query = mybatisMapper.getStatement('ProfessorMapper', 'selectCountAll');
    //     [result] = await dbcon.query(query);
    //     console.log(`cnt=${result[0].cnt}`);
    // } catch (err) {
    //     console.error(err);
    //     return;
    // }

    // try {
    //     query = mybatisMapper.getStatement('ProfessorDepartmentMapper', 'selectJoin');
    //     [result] = await dbcon.query(query);
    //     console.log(result);
    // } catch (err) {
    //     console.error(err);
    //     return;
    // }

    // try {
    //     params = { profno: 9905 };
    //     query = mybatisMapper.getStatement('StudentMapper', 'deleteItemByProfno', params);
    //     [result] = await dbcon.query(query);
    //     console.log(`affectedRows=${result.affectedRows}`);
    // } catch (err) {
    //     console.error(err);
    //     return;
    // }

    // try {
    //     params = { deptno: 104 };
    //     query = mybatisMapper.getStatement('StudentMapper', 'deleteItemByDeptno', params);
    //     [result] = await dbcon.query(query);
    //     console.log(`affectedRows=${result.affectedRows}`);
    // } catch (err) {
    //     console.error(err);
    //     return;
    // }

    dbcon.release();
    DBPool.close();
})();

