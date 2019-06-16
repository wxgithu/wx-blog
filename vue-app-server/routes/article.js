const express = require("express");
const router = express.Router();
const pool = require("../pool");
//发布文章
router.post("/article", (req, res) => {
        var title = req.body.title;
        var summary = req.body.summary;
        var detail = req.body.detail;
        var time = req.body.time;
        var uid = req.body.uid;
        if (title == "" || summary == "" || detail == "") {
            res.send("fail");
        } else {
            // var sql1 = "select user_name from users where user_id=?";
            // pool.query(sql1, [uid], (err, result) => {
            //     if (err) throw (err);
            //     console.log(result);
            // })
            var sql = "insert into article (user_id,title,summary,detail,article_date) values (?,?,?,?,?)";
            pool.query(sql, [uid, title, summary, detail, time], (err, result) => {
                if (err) throw (err);
                if (result.affectedRows > 0) {
                    res.send('success');
                }
            })
        }
    })
    //文章详情页
router.get("/articleDetail", (req, res) => {
        var article_id = req.query.id;
        var sql = "SELECT * FROM users,article WHERE article_id=? AND users.`user_id` = article.`user_id`";
        pool.query(sql, [article_id], (err, result) => {
            if (err) throw (err);
            res.send(result);
        })
    })
    //文章列表
router.get("/articleList", (req, res) => {
        // var uid = req.query.uid;
        //文章当前页
        var current = req.query.current;
        var size = req.query.size;
        var start = parseInt((current - 1) * size);
        size = parseInt(size);
        var obj = {};
        var progress = 0;
        var sql1 = "select count(*) count from article";
        //分页
        var sql2 = "select * from article order by article_date desc limit ?,?";
        pool.query(sql1, (err, result) => {
            if (err) throw (err);
            var dataString = JSON.stringify(result);
            var data = JSON.parse(dataString);
            var total = data[0].count;
            obj.total = total;
            progress += 50;
            if (progress == 100) {
                res.send(obj);
            }
        })
        pool.query(sql2, [start, size], (err, result) => {
            if (err) throw (err);
            // console.log(result);
            progress += 50;
            obj.data = result;
            if (progress == 100) {
                res.send(obj);
            }
        })
    })
    //文章检索
router.get("/search", (req, res) => {
    var key = req.query.key.split(" ");
    var progress = 0;
    var obj = {};
    var sql = `select * from article where title like '%${key}%'`;
    var sql1 = `select count(*) as count from article where title like '%${key}%'`;
    pool.query(sql, [], (err, result) => {
        if (err) throw (err);
        progress += 50;
        obj.list = result;
        if (progress == 100) {
            res.send(obj);
        }
    })
    pool.query(sql1, [], (err, result) => {
        if (err) throw (err);
        progress += 50;
        obj.count = result;
        if (progress == 100) {
            res.send(obj);
        }
    })
})
module.exports = router;