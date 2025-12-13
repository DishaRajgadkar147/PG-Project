const jwt=require('jsonwebtoken')
const result=require('./result')
const config=require('./config')

function authorizeCustomer(req,res,next){
    const url=req.url
    if(url=='/api/customer/signin' || url=='/api/customer/signup')
    next()
    else if(url=='/product'||req.method=='GET')
        next()
    else if(url=='/getByCategory/:category_id'||req.method=='GET')
        next()
    else{
        const token=req.headers.token
        if(token){
            try{
                const payload=jwt.verify(token,config.SECRET)
                req.headers.customer_id=payload.customer_id
                next()
            }
            catch(ex){
                res.send(result.createResult('Invalid Token'))
            }
        }
        else
        res.send(result.createResult('Token is missing'))
    }
}

module.exports=authorizeCustomer