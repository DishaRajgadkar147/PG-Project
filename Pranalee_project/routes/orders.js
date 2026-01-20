const express=require('express')
const router=express.Router()

const db=require('../utils/db')
const result=require('../utils/result')

// router.post('/add',(req,res)=>{
//     const customer_id=req.customer_id
//     const {items,total_amount}=req.body

//     const orderSql=`Insert into orders(customer_id,order_date,total_amount,status) values(?,NOW(),?,'PLACED')`
//     db.query(orderSql,[customer_id,total_amount],(err,orderResult)=>{
//         if(err)
//         return res.send(result.createResult(err))
//         const order_id=orderResult.insertId

//         const values=items.map(item=>[
//             order_id,
//             item.product_id,
//             item.quantity,
//             item.price
//         ])
//         const itemSql=`Insert into order_items(order_id,product_id,quantity,price) values ?`
//         db.query(itemSql,[values],(err2)=>{
//             res.send(result.createResult(err2,{
//             message:'Order placed successfully',
//             order_id:order_id
//         }))
//     })
// })
// })


router.post('/add', (req, res) => {
    const { customer_id, items, total_amount } = req.body;

    // Validation
    if (!customer_id) {
        return res.send(result.createResult(
            { message: "Customer ID is required" }
        ));
    }

    if (!Array.isArray(items) || items.length === 0) {
        return res.send(result.createResult(
            { message: "Order items are required" }
        ));
    }

    // Insert into orders table
    const orderSql = `
        INSERT INTO orders (customer_id, order_date, total_amount, status)
        VALUES (?, NOW(), ?, 'PLACED')
    `;

    db.query(orderSql, [customer_id, total_amount], (err, orderResult) => {
        if (err) {
            console.error("Order insert error:", err);
            return res.send(result.createResult(err));
        }

        const order_id = orderResult.insertId;

        // Prepare order_items values
        const values = items.map(item => [
            order_id,
            item.product_id,
            item.quantity,
            item.price
        ]);

        const itemSql = `
            INSERT INTO order_items (order_id, product_id, quantity, price)
            VALUES ?
        `;

        db.query(itemSql, [values], (err2) => {
            if (err2) {
                console.error("Order items insert error:", err2);
                return res.send(result.createResult(err2));
            }

            // Success response
            res.send(result.createResult(null, {
                message: "Order placed successfully",
                order_id
            }));
        });
    });
});
module.exports=router