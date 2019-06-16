const express = require('express');
//引入mysql连接池
const pool = require('../pool.js');
//创建路由器
var router = express.Router();
//评论内容
router.post("/review", (req, res) => {
        var time = req.body.time;
        var uid = req.body.uid;
        var article_id = req.body.article_id;
        var review_content = req.body.sendContent;
        var sql = "insert into review  (review_content,review_date,user_id,article_id) values (?,?,?,?)";
        pool.query(sql, [review_content, time, uid, article_id], (err, result) => {
            if (err) throw err;
            if (result.affectedRows > 0) {
                res.send("ok");
            }
        })
    })
    //获取评论列表
router.get("/reviewList", (req, res) => {
        var progress = 0;
        var obj = {};
        var id = req.query.id;
        var sql = "select * from review,users where article_id =? and users.`user_id` = review.`user_id`";
        var sql1 = "select count(*) as count from review  where article_id =?"
        pool.query(sql, [id], (err, result) => {
            if (err) throw err;
            obj.data = result;
            progress += 50;
            if (progress == 100) {
                res.send(obj);
            }
        })
        pool.query(sql1, [id], (err, result) => {
            if (err) throw err;
            obj.count = result;
            progress += 50;
            if (progress == 100) {
                res.send(obj);
            }
        })
    })
    //删除评论
router.get("/deleteReview", (req, res) => {
        var id = req.query.id;
        var sql = "delete from review where review_id=?";
        pool.query(sql, [id], (err, result) => {
            if (result.affectedRows > 0) {
                res.send("ok");
            }
        });
    })
    //聊天记录
router.post("/chat", (req, res) => {
        var content = req.body.content;
        var time = req.body.time;
        var from_id = req.body.from_id;
        var to_id = req.body.to_id;
        if (from_id !== to_id) {
            var sql = "insert into chat (chat_content,chat_time,from_user_id,to_user_id) values (?,?,?,?)";
            pool.query(sql, [content, time, from_id, to_id], (err, result) => {
                if (err) console.log(err)
                if (result.data.affectedRows > 0) {
                    res.send("success");
                }
            });
        } else {
            res.send('fail');
        }
    })
    //发送者聊天记录
router.get("/send", (req, res) => {
        var from_id = req.query.from_id;
        var to_id = req.query.to_id;
        var sql = "select * from chat where from_user_id = ? and to_user_id = ?"
        pool.query(sql, [from_id, to_id], (err, result) => {
            if (err) console.log(err)
            res.send(result);
        })
    })
    //接收者聊天记录
router.get("/receive", (req, res) => {
    var to_id = req.query.to_id;
    var sql = "select * from chat where to_user_id = ?"
    pool.query(sql, [to_id], (err, result) => {
        if (err) console.log(err)
        res.send(result);
    })
})
module.exports = router;