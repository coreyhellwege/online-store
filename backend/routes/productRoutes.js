import express from 'express'
const router = express.Router()
import { getProducts, getProductById, deleteProduct } from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.get('/', getProducts)
router.get('/:id', getProductById).delete('/:id', protect, admin, deleteProduct)

export default router