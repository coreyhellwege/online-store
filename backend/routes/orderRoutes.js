import express from 'express'
const router = express.Router()
import { addOrderItems, getOrderById } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

router.post('/', protect, addOrderItems)
router.get('/:id', protect, getOrderById)

export default router