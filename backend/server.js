import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import path from 'path'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

// Import routes
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json()) // Allows us to accept json data in request body

// Routes:
app.get('/', (req, res) => {
    res.send('API is running..')
})

// Mount routes to URLs
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

const folder = path.resolve()

// Use Express to make the uploads folder static so it can be loaded in the browser
app.use('/uploads', express.static(path.join(folder, '/uploads')))

app.use(notFound) // Handle missing route errors.
app.use(errorHandler) // Override the default error handler.

const PORT = process.env.PORT || 8000
const ENV = process.env.NODE_ENV

app.listen(PORT, console.log(`Server running in ${ENV} mode on port ${PORT}`.yellow.bold))