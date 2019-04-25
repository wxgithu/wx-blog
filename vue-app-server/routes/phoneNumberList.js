const express=require("express")
const router=express.Router()
const pool=require("../pool")

//1.查询没有卖出的手机号码和预存话费循环遍历出显示在前端页面
router.get("/getnumber",(req,res)=>{
       //从数据库查手机号
    var sql="SELECT * FROM `lt_phone` WHERE sold=0";
    pool.query(sql,(err,result)=>{
    	if(err) throw err;
    	res.send(result);
    })  
})
//2.分页显示
router.get("/phonelist",(req,res)=>{
	var pno=req.query.pno;
	var pageSize=req.query.pageSize;
	var sql="select count(phoneid) as c from lt_phone where sold=0";
	var obj={};
	var progress=0;
	pool.query(sql,(err,result)=>{
		if(err) throw err;
		var c=Math.ceil(result[0].c/pageSize);
		console.log(c);
		obj.pageCount=c;
		progress+=50;
		if(progress==100){
			res.send(obj);
		}
		console.log(c);
	});
	var sql=" select phoneid,phone,presmoney,packageid,sold";
		sql+=" from lt_phone WHERE sold=0";
		sql+=" limit ?,?";
		var offset=parseInt((pno-1)*pageSize);
		pageSize=parseInt(pageSize);
		pool.query(sql,[offset,pageSize],(err,result)=>{
			if(err) throw err;
			obj.data=result;
			progress+=50;
			if(progress==100){
				res.send(obj);
			}
		});
});
//3.排序
router.get("/numberdown",(req,res)=>{
	var sql="SELECT * FROM lt_phone WHERE sold=0 ORDER BY phone DESC";
	pool.query(sql,(err,result)=>{
		if(err) throw err;
		res.send(result);
	})
})
router.get("/numberup",(req,res)=>{
	var sql="SELECT * FROM lt_phone WHERE sold=0 ORDER BY phone ASC";
	pool.query(sql,(err,result)=>{
		if(err) throw err;
		res.send(result);
	})
})


module.exports=router;


//SELECT * FROM lt_phone WHERE sold=0 ORDER BY phone DESC  号码降序
//SELECT * FROM lt_phone WHERE sold=0 ORDER BY phone ASC   号码升序
//SELECT * FROM lt_phone WHERE sold=0 ORDER BY presmoney ASC  价格升序
