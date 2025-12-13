const express = require('express')
const router = express.Router()
const db = require('../utils/db')
const result = require('../utils/result')

const multer = require('multer')
const fs = require('fs')

const upload = multer({ dest: 'productimages/' })

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
                res.send(result.createResult(err, data))
            }
        )
    })
})

router.get('/', (req, res) => {
    const sql = `SELECT name,description,price,image FROM product`
    db.query(sql, (err, data) => {
        res.send(result.createResult(err, data))
    })
})


router.get('/getByCategory/:category_id',(req,res)=>{
    const category_id=req.params.category_id
    const sql=`Select name,description,price,image from product WHERE category_id=?`
    db.query(sql,[category_id],(err,data)=>{
        if(err)
            return res.status(500).send('DB Error')
        res.send(data)
    })
})


module.exports = router