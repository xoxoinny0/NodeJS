const DBPool = require('../helper/DBPool');
const mybatisMapper = require('mybatis-mapper');

mybatisMapper.createMapper([
    './12-MySQL/mappers/DepartmentMapper.xml',
    './12-MySQL/mappers/ProfessorDepartmentMapper.xml'
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

    try {
        let params = { deptno: 201 };
        let query = mybatisMapper.getStatement('DepartmentMapper', 'selectItem', params);
        let [result] = await dbcon.query(query);
        console.log(result);
    } catch (err) {
        console.error(err);
        return;
    }

    try {
        params = { dname: "풀스택", offset:0, listCount: 3 };
        query = mybatisMapper.getStatement('DepartmentMapper', 'selectList', params);
        [result] = await dbcon.query(query);
        console.log(result);
    } catch (err) {
        console.error(err);
        return;
    }

    try {
        params = { dname: "풀스택", loc: "1401호" };
        query = mybatisMapper.getStatement('DepartmentMapper', 'insertItem', params);
        [result] = await dbcon.query(query);
        console.log(`affectedRows=${result.affectedRows}, insertId=${result.insertId}`);
    } catch (err) {
        console.error(err);
        return;
    }

    try {
        params = { deptno: 300 };
        query = mybatisMapper.getStatement('DepartmentMapper', 'deleteItem', params);
        [result] = await dbcon.query(query);
        console.log(`affectedRows=${result.affectedRows}`);
    } catch (err) {
        console.error(err);
        return;
    }

    try {
        params = { deptno: 300, dname: '수정된학과', loc: '수정된위치' };
        query = mybatisMapper.getStatement('DepartmentMapper', 'updateItem', params);
        [result] = await dbcon.query(query);
        console.log(`affectedRows=${result.affectedRows}`);
    } catch (err) {
        console.error(err);
        return;
    }

    try {
        query = mybatisMapper.getStatement('DepartmentMapper', 'selectCountAll');
        [result] = await dbcon.query(query);
        // --> [ {cnt: 53}]
        console.log(`cnt=${result[0].cnt}`);
    } catch (err) {
        console.error(err);
        return;
    }

    try {
        query = mybatisMapper.getStatement('ProfessorDepartmentMapper', 'selectJoin');
        [result] = await dbcon.query(query);
        console.log(result);
    } catch (err) {
        console.error(err);
        return;
    }

    dbcon.release();
    DBPool.close();
})();

