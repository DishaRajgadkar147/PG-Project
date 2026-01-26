const express=require("express")
const router=express.Router();
const db=require("../utils/db")
const result=require("../utils/result")
const authAdmin=require('../utils/authAdmin')

//Admin signin is done with email,password

//Admin can see all the accounts
router.get('/',(req,res)=>{
    const sql=`Select * from admin`
    db.query(sql,(err,data)=>{
        if(err)
            return res.status(500).send('Database Error')
        if(data.length===0)
            return res.status(404).send('Admin account not found')
        return res.status(200).json(data)
    })
})

router.get('/profile', (req, res) => {
    const sql = `
      SELECT admin_id, name, email
      FROM admin
      WHERE admin_id = ?
    `
    db.query(sql, [req.admin_id], (err, data) => {
      if (err) return res.status(500).json(result.createResult(err))
      if (data.length === 0)
        return res.status(404).json(result.createResult("Admin not found"))
  
      res.json(result.createResult(null, data[0]))
    })
  })
  

//Update email of admin
router.put('/profile',(req,res)=>{
    const {name}=req.body
    const sql=`Update admin SET name=? WHERE admin_id=?`
    db.query(sql,[name,req.admin_id],(err,result)=>{
        if(err)
           return res.status(500).send('Database Error')
        if(result.affectedRows===0)
           return res.status(404).send('Record not found')
        return res.status(200).send('Record Updated Successfully')
    })
})


//For low stock Alerts
router.get('/dashboard/summary',(req,res)=>{
    const sql=`Select 
    (SELECT COUNT(*) from product) As totalProduct,
    (SELECT COUNT(*) from category) As totalCategory,
    (SELECT COUNT(*) from orders) As totalOrders,
    (SELECT COUNT(*) from product WHERE stock_quantity<=10) As lowStockAlerts`
    db.query(sql,(err,data)=>{
        return res.send(result.createResult(err,data))
    })
})

router.get('/orders',(req,res)=>{
    const sql=`Select order_id,customer_id,order_date,total_amount,status from orders`
    db.query(sql,(err,data)=>{
       return res.send(result.createResult(err,data))
    })
})

//Delete account of admin
router.delete('/',(req,res)=>{
    const {admin_id}=req.body
    const sql=`Delete from admin WHERE admin_id=?`
    db.query(sql,[admin_id],(err,result)=>{
        if(err)
            return res.status(500).send('Database Error')
        if(result.affectedRows===0)
            return res.status(404).send('Record not found')
        return res.status(200).send('Record Deleted Successfully')
    })
})
module.exports=router