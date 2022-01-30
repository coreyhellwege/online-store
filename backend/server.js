import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

// Routes:
app.get('/', (req, res) => {
    res.send('API is running..')
})

app.use('/api/products', productRoutes)

app.use(notFound) // Handle missing route errors.
app.use(errorHandler) // Override the default error handler.

const PORT = process.env.PORT || 8000
const ENV = process.env.NODE_ENV

app.listen(PORT, console.log(`Server running in ${ENV} mode on port ${PORT}`.yellow.bold))