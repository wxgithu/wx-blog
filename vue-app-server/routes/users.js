const express = require("express");
const router = express.Router();
const pool = require("../pool");
// 登陆验证
router.get("/signin", (req, res) => {
    var phone = req.query.phone;
    var upwd = req.query.upwd;
    var sql = "select * from lt_user where phone=? and upwd=?";
    pool.query(sql, [phone, upwd], (err, result) => {
        if (err) throw (err);
        if (result.length > 0) {
            // res.writeHead(200);       
            var user = result[0]
            req.session["uid"] = user["uid"];
            var uid = result[0].uid;
            var name = result[0].name;
            res.write(JSON.stringify({
                ok: 1,
                msg: "user login success",
                uid: uid,
                name: name
            }))
        } else {
            res.write(JSON.stringify({
                ok: 0,
                msg: "user login fail！"
            }))
        }
        res.end();
    })
})
router.get("/islogin", (req, res) => {
    res.writeHead(200);
    if (req.session.uid === undefined) {
        res.write(JSON.stringify({
            ok: 0,
            msg: "user notlogin"
        }))
        res.end();
    } else {
        var uid = req.session.uid;
        var sql = "select * from xz_user where uid=?";
        pool.query(sql, [uid], (err, result) => {
            if (err) console.log(err)
            var user = result[0];
            res.write(JSON.stringify({
                ok: 1,
                name: user.name
            }))
            res.end()
        })

    }
})
router.get("/signout", (req, res) => {
    req.session["uid"] = undefined;
    res.write(JSON.stringify({
        ok: 1,
        msg: "user already signout"
    }))
    res.end();
})
module.exports = router;