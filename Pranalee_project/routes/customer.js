const express=require("express")
const router=express.Router();
const db=require("../utils/db");
const result=require("../utils/result")
const bcrypt=require("bcrypt")
const config=require('../utils/config')
const jwt=require('jsonwebtoken')

router.post('/signin',(req,res)=>{
    const{email,password}=req.body;

    const sql=`Select * from customer WHERE email=?`;
    db.query(sql,[email],(err,data)=>{
        if(err){
            res.send(result.createResult(err));
        }
        else if(data.length===0){
            res.send(result.createResult("Invalid Email"));
        }
        else{
            bcrypt.compare(password,data[0].password,(err,passwordStatus)=>{
                if(passwordStatus){
                    const payload={
                        customer_id:data[0].customer_id,
                    }
                    const token=jwt.sign(payload,config.SECRET)
                    const user={
                        token,
                        name:data[0].name,
                        email:data[0].email,
                        phone:data[0].phone,
                        address:data[0].address
                    };
                    res.send(result.createResult(null,user));
                }
                    else{
                        res.send(result.createResult("Invalid Password"));
                    }
            });
        }
    })
})

router.post('/signup',(req,res)=>{
    const{name,email,password,phone,address}=req.body
    const sql=`Select * from customer WHERE email=?`
    db.query(sql,[email],(err,result)=>{
        if(err) 
            return res.status(500).send("Database error")
        if(result.length>0){
            return res.status(400).send("Email already exists")
        }
        bcrypt.hash(password,10,(err,hashedPassword)=>{
            if(err)
                return res.status(500).send("Password Hashing Failed")

            const sql=`Insert into customer(name,email,password,phone,address) values(?,?,?,?,?)`
            db.query(sql,[name,email,hashedPassword,phone,address],(err,data)=>{
                if(err)
                    res.status(500).send("Signup Failed")
                return res.status(200).send('Signup Successful')
            })
        })
    })
})

router.get('/profile/', (req, res) => {
    const customer_id = req.body.customer_id
    const sql = `SELECT * FROM customer WHERE customer_id = ?`
    db.query(sql, [customer_id], (err, data) => {
        if (err)
            res.send(result.createResult(err))
        else {
            const user = {
                name: data[0].name,
                email: data[0].email,
                mobile: data[0].mobile
            }
            res.send(result.createResult(null, user))
        }
    })
})

router.get('/',(req,res)=>{
    const sql="Select * from customer"
    db.query(sql,(err,data)=>{
        if(err)
            res.status(500).send("Database Error")
        if(data.length===0)
            return res.status(200).send("No Customers Found")
        return res.status(200).json(data)
    })
})

router.put('/',(req,res)=>{
    const {customer_id,address,phone}=req.body
    if(!customer_id||!address||!phone){
        return res.status(400).send('Missing Fields')
    }
    const sql="Update customer SET phone=?,address=? WHERE customer_id=?"
    db.query(sql,[phone,address,customer_id],(err,result)=>{
        if(err)
            res.status(500).send('Database Error')
        if(result.affectedRows===0)
            return res.status(404).send('Customer not Found')
        return res.status(200).send('Records Updated Successfully')
    })
})

router.patch('/updatephone',(req,res)=>{
    const {customer_id,phone}=req.body
    const sql=`Update customer SET phone=? WHERE customer_id=?`
    db.query(sql,[phone,customer_id],(err,result)=>{
        if(err)
            res.status(500).send('Database Error')
        if(result.affectedRows===0)
            res.status(404).send('Customer not Found')
        return res.status(200).send('Phone number updated')
    })
})

router.patch('/updateemail',(req,res)=>{
    const {customer_id,email}=req.body
    const sql=`Update customer SET email=? WHERE customer_id=?`
    db.query(sql,[email,customer_id],(err,result)=>{
        if(err)
            res.status(500).send('Database Error')
        if(result.affectedRows===0)
            res.status(404).send('Customer not Found')
        return res.status(200).send('Email updated')
    })
})
router.delete('/',(req,res)=>{
    const customer_id=req.body.customer_id
    // const selectSql="Select * from customer where customer_id=?"
      const sql="Delete from customer where customer_id=?"
    db.query(sql,[customer_id],(err,result)=>{
        if(err){
            res.status(500).send('Server Error')
        }
        if(result.affectedRows===0){
            return res.status(404).send('Customer not Found')
        }
        return res.status(200).send('Customer Deleted Successfully')
    })
})



module.exports=router;