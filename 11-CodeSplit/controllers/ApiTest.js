const logger = require("../../helper/LogHelper");
const express = require("express");

module.exports = (() => {
  const router = express.Router();

  router.get("/page1", (req, res, next) => {
    let html = "<h1>Page1</h1>";
    html += "<h2>Express로 구현한 Node.js 백엔드 페이지</h2>";

    res.status(200).send(html);
  });

  router.get("/page2", (req, res, next) => {
    let html = { a: 100, b: 200 };
    res.status(200).send(html);
  });

  return router;
})();
