const express=require("express");
const app=express();
app.use(express.json())

app.use('/productimages', express.static('productimages'));
const customerRoute=require('./routes/customer')
const adminRoute=require('./routes/admin')
const categoryRoute=require('./routes/category')
const productRoute=require('./routes/product')
const authorizeAdmin=require('./utils/authAdmin')
const adminRoutes=require('./routes/admin.routes')
const authorizeCustomer=require('./utils/authCustomer')
const customerRoutes=require('./routes/customer.routes')
const orderRoute=require('./routes/orders')


app.use("/api/customer",customerRoute)
app.use("/api/customer/signin",customerRoutes)
app.use("/api/customer/signup",customerRoutes)
app.use("/api/product",productRoute)

app.use("/api/order",authorizeCustomer,orderRoute)
app.use("/api/customer",authorizeCustomer,customerRoutes)
app.use("/api/customer",customerRoutes)
app.use("/api/admin",adminRoute)
app.use("/api/admin",adminRoutes)
app.use("/api/category",categoryRoute)

app.use("/api/order",orderRoute)

app.listen(4000,()=> console.log("Server started at port 4000"))
