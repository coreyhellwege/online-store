import express from 'express'
import { createOrder, getOrderById, updateOrderToPaid, updateOrderToDelivered, getMyOrders, getOrders } from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', protect, createOrder)
router.get('/myorders', protect, getMyOrders)
router.get('/:id', protect, getOrderById)
router.put('/:id/pay', protect, updateOrderToPaid)
router.put('/:id/deliver', protect, admin, updateOrderToDelivered)
router.get('/', protect, admin, getOrders)

export default router