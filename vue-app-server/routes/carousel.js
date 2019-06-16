const express = require('express');
//引入mysql连接池
const pool = require('../pool.js');
//创建路由器
var router = express.Router();
//从数据库获取图片URL
router.get("/carousel", (req, res) => {
    var sql = "SELECT * from carousel"
    pool.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})

module.exports = router;