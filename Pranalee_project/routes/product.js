const express = require('express')
const router = express.Router()
const db = require('../utils/db')
const result = require('../utils/result')

const multer = require('multer')
const fs = require('fs')

const upload = multer({ dest: 'productimages/' })

//Only admin can add products 
router.post('/add', upload.single('image'), (req, res) => {
    const { category_id, name, description, price, stock_quantity } = req.body
    const imageName = req.file.filename + '.jpg'
    const oldPath = req.file.path
    
    const newPath = `productimages/${imageName}`

    fs.rename(oldPath, newPath, (err) => {
        if (err) {
            return res.status(500).send('Image saving failed')
        }
        const sql = `
            INSERT INTO product
            (category_id, name, description, price, stock_quantity, image)
            VALUES (?, ?, ?, ?, ?, ?)`
        db.query(
            sql,
            [category_id, name, description, price, stock_quantity, imageName],
            (err, data) => {
                return res.send(result.createResult(err, data))
            }
        )
    })
})

//Get all the products (list)
router.get('/', (req, res) => {
    const sql = `SELECT product_id,name,description,price,image,stock_quantity FROM product`
    db.query(sql, (err, data) => {
       return res.send(result.createResult(err, data))
    })
})

//get products by product_id
router.get('/:product_id', (req, res) => {
    const sql = `SELECT * FROM product WHERE product_id=?`
    db.query(sql, [req.params.product_id], (err, data) => {
      res.send(result.createResult(err, data))
    })
  })

  //update the products
  router.put('/update/:product_id', upload.single('image'), (req, res) => {
    const { category_id, name, description, price, stock_quantity } = req.body
    let sql
    let params
  
    if (req.file) {
      const imageName = req.file.filename + '.jpg'
      fs.renameSync(req.file.path, `productimages/${imageName}`)
  
      sql = `
        UPDATE product SET
        category_id=?, name=?, description=?, price=?, stock_quantity=?, image=?
        WHERE product_id=?
      `
      params = [category_id, name, description, price, stock_quantity, imageName, req.params.product_id]
    } else {
      sql = `
        UPDATE product SET
        category_id=?, name=?, description=?, price=?, stock_quantity=?
        WHERE product_id=?
      `
      params = [category_id, name, description, price, stock_quantity, req.params.product_id]
    }
  
    db.query(sql, params, (err, data) => {
      res.send(result.createResult(err, data))
    })
  })
  //delete products
  router.delete('/delete/:product_id', (req, res) => {
    const sql = `DELETE FROM product WHERE product_id=?`
    db.query(sql, [req.params.product_id], (err, data) => {
      res.send(result.createResult(err, data))
    })
  })
  

//Get products by category only for customer
router.get('/getByCategory/:category_id',(req,res)=>{
    const category_id=req.params.category_id
    const sql=`Select product_id,name,description,price,image,stock_quantity from product WHERE category_id=?`
    db.query(sql,[category_id],(err,data)=>{
        if(err)
            return res.status(500).send('DB Error')
       return res.send({status:'success',data})
    })
})


module.exports = router