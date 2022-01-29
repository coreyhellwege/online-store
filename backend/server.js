import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import products from './data/products.js'

dotenv.config()

connectDB()

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

const PORT = process.env.PORT || 8000
const ENV = process.env.NODE_ENV

app.listen(PORT, console.log(`Server running in ${ENV} mode on port ${PORT}`.yellow.bold))