/**
 * @FileName : ProfessorController.js
 * @Author : 유지인
 * @Description: 교수 테이블에 대한 Restful API 구축을 위한 controller 
 *              요청 수신 및 파라미터 식별, 검사
 */
const express = require("express");
const logger = require("../../helper/LogHelper");
const regexHelper = require("../../helper/RegexHelper");
const ProfessorService = require("../service/ProfessorService");
const { pagenation } = require("../../helper/UtilHelper");

module.exports = (() => {
  const url = "/professor";
  const router = express.Router();

  /** 전체 목록 조회 --> Read(SELECT) */
  router.get(url, async (req, res, next) => {
    // 검색어 파라미터
    const { query, page = 1, rows = 5 } = req.query;

    // 검색어를 MyBatis에 전달하기 위한 객체로 구성
    const params = {};
    if (query) {
      params.name = query;
      params.userid = query;
      params.position = query;
      params.sal = query;
      params.hiredate = query;
      params.usecommrid = query;
      params.deptno = query;
    }

    // 데이터 조회
    let json = null;

    try {
      // 전체 데이터 수 얻기
      const totalCount = await ProfessorService.getCount(params);
      pageInfo = pagenation(totalCount, page, rows);

      params.offset = pageInfo.offset;
      params.listCount = pageInfo.listCount;
      json = await ProfessorService.getList(params);
    } catch (err) {
      return next(err);
    }

    res.sendResult({ meta: pageInfo, item: json });
  });

  /** 단일행 조회 --> Read(SELECT) */
  router.get(`${url}/:profno`, async (req, res, next) => {
    // 파라미터 받기
    const { profno } = req.params;

    // 파라미터 유효성 검사
    try {
      regexHelper.value(profno, "교수번호를 입력하세요.");
      regexHelper.num(profno, "교수번호가 잘못되었습니다.");
    } catch (err) {
      return next(err);
    }

    // 데이터 조회
    let json = null;

    try {
      json = await ProfessorService.getItem({
        profno: profno,
      });
    } catch (err) {
      return next(err);
    }

    res.sendResult({ item: json });
  });

  /** 데이터 추가 --> Create(INSERT) */
  router.post(url, async (req, res, next) => {
    // 파라미터 받기
    const { name, userid,  position, sal, hiredate, comm, deptno} = req.body;

    // 유효성 검사
    try {
      regexHelper.value(name, "교수이름을 입력하세요.");
      regexHelper.maxLength(name, 50, "교수이름은 50자까지 입력 가능합니다.");
      regexHelper.value(userid, "아이디를 입력하세요.");
      regexHelper.maxLength(userid, 50, "아이디는 50자까지 입력 가능합니다.");
      regexHelper.value(position, "직급을 입력하세요.");
      regexHelper.maxLength(position, 20, "직급은 20자까지 입력 가능합니다.");
      regexHelper.value(sal, "급여를 입력하세요.");
      regexHelper.num(sal, "급여는 숫자로만 입력가능합니다.");
      regexHelper.value(hiredate, "입사일을 입력하세요.");
      regexHelper.value(comm, "보직수당을 입력하세요.");
      regexHelper.num(comm, "보직수당은 숫자로만 입력가능합니다.");
      regexHelper.value(deptno, "학과번호를 입력하세요.");
      regexHelper.num(deptno, "학과번호는 숫자로만 입력가능합니다.");
    } catch (err) {
      return next(err);
    }

    // 데이터 저장
    let json = null;

    try {
      json = await ProfessorService.addItem({
        name: name,
        userid: userid,
        position: position,
        sal: sal,
        hiredate: hiredate,
        comm: comm,
        deptno : deptno
      });
    } catch (err) {
      return next(err);
    }

    res.sendResult({ item: json });
  });

  /** 데이터 수정 --> Update(UPDATE) */
  router.put(`${url}/:profno`, async (req, res, next) => {
    // 파라미터 받기
    const { profno } = req.params;
    const {name, userid,  position, sal, hiredate, comm, deptno } = req.body;

    // 유효성 검사
    try {
      regexHelper.value(profno, "교수번호를 입력하세요.");
      regexHelper.num(profno, "교수번호가 잘못되었습니다.");
      regexHelper.value(name, "교수이름을 입력하세요.");
      regexHelper.maxLength(name, 50, "교수이름은 50자까지 입력 가능합니다.");
      regexHelper.value(userid, "아이디를 입력하세요.");
      regexHelper.maxLength(userid, 50, "아이디는 50자까지 입력 가능합니다.");
      regexHelper.value(position, "직급을 입력하세요.");
      regexHelper.maxLength(position, 20, "직급은 20자까지 입력 가능합니다.");
      regexHelper.value(sal, "급여를 입력하세요.");
      regexHelper.num(sal, "급여는 숫자로만 입력가능합니다.");
      regexHelper.value(hiredate, "입사일을 입력하세요.");
      regexHelper.value(comm, "보직수당을 입력하세요.");
      regexHelper.num(comm, "보직수당은 숫자로만 입력가능합니다.");
      regexHelper.value(deptno, "학과번호를 입력하세요.");
      regexHelper.num(deptno, "학과번호는 숫자로만 입력가능합니다.");
    } catch (err) {
      return next(err);
    }

    // 데이터 저장
    let json = null;

    try {
      json = await ProfessorService.editItem({
        profno: profno,
        name: name,
        userid: userid,
        position: position,
        sal: sal,
        hiredate: hiredate,
        comm: comm,
        deptno : deptno
      });
    } catch (err) {
      return next(err);
    }

    res.sendResult({ item: json });
  });

  /** 데이터 삭제 --> Delete(DELETE) */
  router.delete(`${url}/:profno`, async (req, res, next) => {
    // 파라미터 받기
    const { profno } = req.params;

    // 유효성 검사
    try {
      regexHelper.value(profno, "교수번호를 입력하세요.");
      regexHelper.num(profno, "교수번호가 잘못되었습니다.");
    } catch (err) {
      return next(err);
    }

    try {
      await ProfessorService.deleteItem({
        profno: profno,
      });
    } catch (err) {
      return next(err);
    }

    res.sendResult();
  });

  return router;
})();
