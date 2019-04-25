const express=require('express');
//引入mysql连接池
const pool=require('../pool.js');
//创建路由器
var router=express.Router();
//从数据库获取号码套餐详情
router.get("/taocandetail",(req,res)=>{
    var id=req.query.id;
    var sql=" SELECT *from lt_package WHERE packageid=?"
    pool.query(sql,[id],(err,result)=>{
        if(err) throw err;
        res.send(result[0]);
    })
})
module.exports=router;