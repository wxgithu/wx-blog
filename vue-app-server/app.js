const express = require("express");
const pool = require("./pool")
const bodyParser = require('body-parser');
const cors = require("cors")
const session = require('express-session');
const carousel = require('./routes/carousel.js');
const users = require('./routes/users.js');
const article = require('./routes/article.js');
const getnumber = require('./routes/phoneNumberList');
const images = require('./routes/image');
const review = require('./routes/review');
var app = express();
app.use(express.static(__dirname + "/public"))
app.use(cors({
    origin: ["http://127.0.0.1:3000:8080", "http://localhost:8080"],
    credentials: true
}))
app.listen(3000);

//使用body-parser中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: '128位随机字符串',
    resave: false,
    saveUninitialized: true,
}))
const qs = require("querystring");
app.post("/updatePwd", (req, res) => {
    req.on("data", (buf) => {
        var str = buf.toString();
        var obj = JSON.parse(str);
        // console.log(obj)
        var uid = parseInt(obj.uid);
        var newPwd = obj.pwd;
        var sql = "update lt_user set upwd=? where uid=?";
        pool.query(sql, [newPwd, uid], (err, result) => {
            if (err) throw err;
            res.send({ code: 1, msg: "修改成功" })
        })
    })

})

app.use("/users", users);
app.use(carousel);
app.use(article);
app.use(images);
app.use(review);