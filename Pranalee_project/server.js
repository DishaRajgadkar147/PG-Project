const express=require("express");
const app=express();
app.use(express.json())

app.use('/productimages', express.static('productimages'));
const customerRoute=require('./routes/customer')
const adminRoute=require('./routes/admin')
const categoryRoute=require('./routes/category')
const productRoute=require('./routes/product')

app.use("/api/customer",customerRoute)
app.use("/api/admin",adminRoute)
app.use("/api/category",categoryRoute)
app.use("/api/product",productRoute)

app.listen(4000,()=> console.log("Server started at port 4000"))
