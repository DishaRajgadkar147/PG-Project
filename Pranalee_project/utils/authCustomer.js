const jwt=require('jsonwebtoken')
const result=require('./result')
const config=require('./config')

//Authorize customer token is created after signin
function authorizeCustomer(req,res,next){
        const token=req.headers.token
        if(!token){
            return res.send(result.createResult('Token is Missing'))
        }
            try{
                const payload=jwt.verify(token,config.SECRET)
                req.customer_id=payload.customer_id
                next()
            }
            catch(ex){
                res.send(result.createResult('Invalid Token'))
            }
    }

module.exports=authorizeCustomer