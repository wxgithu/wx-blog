const express = require("express")
const router = express.Router()
const pool = require("../pool")
router.post("/images", (req, res) => {
    var url = req.body;
    console.log(req.body);
    var sql = "insert into images (image_url) values (?)";
    pool.query(sql, [url], (err, result) => {
        if (err) throw (err);
        if (result.affectedRows > 0) {
            res.send('success');
        }
    })
})
module.exports = router;