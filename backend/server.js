const express = require('express')
const products = require('./data/products')

const app = express()

// Routes:
app.get('/', (req, res) => {
    res.send('API is running..')
})

app.get('/api/products', (req, res) => {
    res.json(products) // converts to JSON
})

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p._id === req.params.id)
    res.json(product) // converts to JSON
})

app.listen(8000, console.log('Server running on port 8000'))