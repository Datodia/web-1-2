const express = require('express')
const { getAllProducts, getProductById, createProduct } = require('./config/connectToSQL')
const app = express()

app.use(express.json())

app.get('/products',async (req, res) => {
    const resp = await getAllProducts()
    res.json(resp)
})

app.get('/products/:id', async (req, res) => {
    const {id} = req.params
    const result = await getProductById(id)
    res.json(result)
})

app.post('/products', async (req, res) => {
    const {name, price, available} = req.body
    const result = await createProduct(name, price, available)
    console.log(result)
    res.status(201).json({message: 'created successfully'})
})


app.listen(3000, () => {
    console.log('http://localhost:3000')
})