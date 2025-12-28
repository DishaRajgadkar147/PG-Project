const express=require('express')
const router=express.Router()

const db=require('../utils/db')
const result=require('../utils/result')

//Displaying orders of particular customer
router.get('/orders',(req,res)=>{
    const customer_id=req.customer_id
    const sql=`Select order_id,order_date,total_amount,status FROM orders WHERE customer_id=?`
    db.query(sql,[customer_id],(err,data)=>{
        res.send(result.createResult(err,data))
    })
})

module.exports=router