const express = require("express");
const router = express.Router();
const pool = require("../pool");
const Core = require('@alicloud/pop-core');
//获取验证码
router.get("/code", (req, res) => {
        var phoneNum = req.query.phone;
        var client = new Core({
            accessKeyId: 'LTAIbKmVxnTDuIwc',
            accessKeySecret: 'kXxeD7uhtdbqyyDBTSYBifJJV1UaSV',
            endpoint: 'https://dysmsapi.aliyuncs.com',
            apiVersion: '2017-05-25'
        });
        var randomNum = ('000000' + Math.floor(Math.random() * 999999)).slice(-6);
        var params = {
            "RegionId": "cn-hangzhou",
            "PhoneNumbers": phoneNum,
            "SignName": "畅写博客",
            "TemplateCode": "SMS_165116990",
            "TemplateParam": `{\"code\":\"${randomNum}\"}`
        }

        var requestOption = {
            method: 'POST'
        };

        client.request('SendSms', params, requestOption).then((result) => {
            res.send(randomNum);
            console.log(result);
        }, (ex) => {
            console.log(ex);
        })
    })
    //获取用户列表
router.get("/users", (req, res) => {
        var sql = "select * from users";
        pool.query(sql, (err, result) => {
            if (err) throw (err);
            res.send(result);
        })
    })
    //获取用户信息
router.get("/usersInfo", (req, res) => {
        var uid = req.query.uid;
        var obj = {};
        var progress = 0;
        var sql = "select * from users where user_id = ? ";
        var sql1 = "select * from article where user_id=? order by article_date desc";
        pool.query(sql, [uid], (err, result) => {
            if (err) throw (err);
            obj.user = result;
            progress += 50;
            if (progress == 100) {
                res.send(obj);
            }
        });
        pool.query(sql1, [uid], (err, result) => {
            if (err) throw (err);
            progress += 50;
            obj.article = result;
            if (progress == 100) {
                res.send(obj);
            }
        })
    })
    //用户注册
router.post("/register", (req, res) => {
        var name = req.body.name;
        var phone = req.body.phone;
        var password = req.body.password;
        var code = req.body.code;
        var vertifyCode = req.body.vertifyCode;
        if (code == "") { res.send("please input code"); return; }
        var sql1 = "select * from users where user_name=?";
        pool.query(sql1, [name], (err, result) => {
            if (err) throw (err);
            if (result.length > 0) {
                res.send("nickname occupied");
            } else {
                if (code == vertifyCode && code != "") {
                    var sql = "insert into users (user_name,user_telephone_number,user_password) values (?,?,?)";
                    pool.query(sql, [name, phone, password], (err, result) => {
                        if (err) throw (err);
                        if (result.affectedRows > 0) {
                            res.send("ok");
                        }
                    })
                } else {
                    res.send("code error");
                }
            }
        })
    })
    //修改昵称和头像
router.post("/updateAvatar", (req, res) => {
        var name = req.body.username;
        var file = req.body.file;
        console.log(file);
    })
    // 登陆验证
router.post("/signin", (req, res) => {
    var name = req.body.name;
    var upwd = req.body.password;
    var sql = "select * from users where user_name=? and user_password=?";
    pool.query(sql, [name, upwd], (err, result) => {
        if (err) throw (err);
        // console.log(result);
        if (result.length > 0) {
            var user = result[0]
            req.session["uid"] = user["user_id"];
            var uid = result[0].user_id;
            var name = result[0].user_name;
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
router.post("/reset", (req, res) => {
    var phone = req.body.phone;
    var upwd = req.body.password;
    var second = req.body.second;
    var uid = req.body.uid;
    var code = req.body.code;
    var vertifyCode = req.body.vertifyCode;
    var sql = "select * from users where user_telephone_number=?";
    pool.query(sql, [phone], (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
            if (upwd !== second) {
                res.write(JSON.stringify({
                    ok: 0,
                }))
                res.end()
            } else if (code != "" && code == vertifyCode) {
                var sql = "update users set user_password=? where user_telephone_number=?";
                pool.query(sql, [upwd, phone], (error, result) => {
                    if (error) throw error;
                    if (result.affectedRows > 0) {
                        res.send("ok");
                    }
                })
            } else if (code == "") {
                res.send("please input code");
                return;
            } else {
                res.send("code error");
                return;
            }
        } else {
            res.send("fail");
        }
    })
})
module.exports = router;