const jwt=require('jsonwebtoken')
const result=require('./result')
const config=require('./config')

function authorizeAdmin(req,res,next){
    const url=req.url
    if(url=='/api/admin/admin/signin'||url=='/api/admin/signup'){
    next()
    }
    else if(url=='/api/product/add'||req.method=='POST'){
        next()
    }
    else if(url=='/api/category/addCategory'||req.method=='POST'){
        next()
    }
    else{
        const token=req.headers.token
        if(token){
            try{
                const payload=jwt.verify(token,config.SECRET)
                req.headers.admin_id=payload.admin_id
                next()
            }
            catch(ex){
                res.send(result.createResult('Invalid Token'))
            }
        }
        else
        res.send(result.createResult('Token is Missing'))
    }
}