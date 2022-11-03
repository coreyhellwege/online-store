import express from 'express'
import { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders } from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', protect, addOrderItems)
router.get('/myorders', protect, getMyOrders)
router.get('/:id', protect, getOrderById)
router.put('/:id/pay', protect, updateOrderToPaid)
router.get('/', protect, admin, getOrders)

export default router