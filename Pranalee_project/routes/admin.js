const express=require("express")
const router=express.Router();
const bcrypt=require("bcrypt")
const db=require("../utils/db")
const result=require("../utils/result")
const {body,validationResult}=require('express-validator')
const jwt=require('jsonwebtoken')
const config=require('../utils/config')

//Admin signin is done with email,password
router.post('/admin/signin',(req,res)=>{
    const {email,password}=req.body;
    const sql="Select * from admin WHERE email=?";
    db.query(sql,[email],(err,data)=>{
        if(err){
            res.send(result.createResult(err));
        }
        else if(data.length===0){
            res.send(result.createResult("Invalid Email"))
        }
        else{
            bcrypt.compare(password,data[0].password,(err,passwordStatus)=>{
                if(passwordStatus){
                    const payload={
                        admin_id:data[0].admin_id,
                    }
                    const token=jwt.sign(payload,config.SECRET)
                    const admin={
                        token,
                        name:data[0].name,
                        email:data[0].email
                    }
                    res.send(result.createResult(null,admin))
                }
                else{
                    res.send(result.createResult("Invalid Password"))
                }
            })
        }
    })
})

// router.post('/admin/signup',body('email').isEmail().withMessage('Invalid Email'),
//     body('password')
//     .isLength({min:12})
//     .matches(/[A_Z]/)
//     .matches(/[a-z]/)
//     .matches(/[0-9]/)
//     .matches(/[\W]/),
//     (req,res)=>{
//         const  errors=validationResult(req)
//         if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()}
//         const {email,password}=req.body
//         const hashedPassword=await bcrypt.hash(password,12);
//         const sql='Insert into admin (name,email,hashedPassword) values(?,?,?)'
//            db.query(sql,[email],(err,result)=>{
//         if(err){
//             return res.status(500).send('Database Error')
//         }
//         return res.status(200).send('Admin Signup Successful')
//            })
//         })


//Admin signup wher password should be atleast 8 characters where (1 Capital letter,1 small letter,1special character,1 numeric character)
router.post('/signup', 
  body('email').isEmail().withMessage('Invalid email'),
  body('password')
    .isLength({ min: 8 })
    .matches(/[A-Z]/)
    .matches(/[a-z]/)
    .matches(/[0-9]/)
    .matches(/[\W]/),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name,email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);

    const sql = 'INSERT INTO admin (name,email, password) VALUES (?,?,?)';
    db.query(sql, [name,email, hashedPassword], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.status(201).send('Admin signed up successfully!');
    });
});

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

//Update email of admin
router.put('/',(req,res)=>{
    const {admin_id,email}=req.body
    const sql=`Update admin SET email=? WHERE admin_id=?`
    db.query(sql,[email,admin_id],(err,result)=>{
        if(err)
            res.status(500).send('Database Error')
        if(result.affectedRows===0)
            res.status(404).send('Record not found')
        return res.status(200).send('Record Updated Successfully')
    })
})

//Delete account of admin
router.delete('/',(req,res)=>{
    const {admin_id}=req.body
    const sql=`Delete from admin WHERE admin_id=?`
    db.query(sql,[admin_id],(err,result)=>{
        if(err)
            res.status(500).send('Database Error')
        if(result.affectedRows===0)
            res.status(404).send('Record not found')
        return res.status(200).send('Record Deleted Successfully')
    })
})
module.exports=router