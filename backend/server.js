import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import path from 'path'
import morgan from 'morgan'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import schema from './schema/schema'
import { graphqlHTTP } from 'express-graphql'

// Import routes
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

connectDB()

const app = express()

const ENV = process.env.NODE_ENV

if (ENV === 'development') {
    app.use(morgan('dev')) // use Morgan just in the dev environment
}

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

app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      graphiql: process.env.NODE_ENV === 'development',
    })
)

const folder = path.resolve()

// Use Express to make the uploads folder static so it can be loaded in the browser
app.use('/uploads', express.static(path.join(folder, '/uploads')))

app.use(notFound) // Handle missing route errors.
app.use(errorHandler) // Override the default error handler.

const PORT = process.env.PORT || 8000

app.listen(PORT, console.log(`Server running in ${ENV} mode on port ${PORT}`.yellow.bold))