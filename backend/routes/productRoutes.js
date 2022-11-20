import express from 'express'
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, createProductReview, getTopProducts } from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getProducts).post('/', protect, admin, createProduct)
router.get('/top', getTopProducts)
router.get('/:id', getProductById).delete('/:id', protect, admin, deleteProduct).put('/:id', protect, admin, updateProduct)
router.post('/:id/reviews', protect, createProductReview)

export default router