const express=require('express')
const router=express.Router()

const db=require('../utils/db')
const result=require('../utils/result')


//For low stock Alerts
router.get('/dashboard/summary',(req,res)=>{
    const sql=`Select 
    (SELECT COUNT(*) from product) As totalProduct,
    (SELECT COUNT(*) from category) As totalCategory,
    (SELECT COUNT(*) from orders) As totalOrders,
    (SELECT COUNT(*) from product WHERE stock_quantity<=10) As lowStockAlerts`
    db.query(sql,(err,data)=>{
        res.send(result.createResult(err,data))
    })
})

router.get('/orders',(req,res)=>{
    const sql=`Select order_id,customer_id,order_date,total_amount,status from orders`
    db.query(sql,(err,data)=>{
        res.send(result.createResult(err,data))
    })
})
module.exports=router