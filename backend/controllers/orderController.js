import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'

/*
 * @desc   Create a new order.
 * @route  POST /api/orders
 * @access Private
 */
const createOrder = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
        return
    } else {
        // Add some validation to prevent the user from manipulating item prices from local storage
        orderItems.forEach(async (item) => {
            let lookupItem = await Product.findById(item.product)
            if (item.price !== lookupItem.price) {
                res.status(400)
                throw new Error('Item prices don\'t match, please try again')
                return
            }
        })

        const order = new Order({
            user: req.user._id, // get user id from the token as this is a protected route
            orderItems, 
            shippingAddress, 
            paymentMethod, 
            itemsPrice, 
            taxPrice, 
            shippingPrice, 
            totalPrice
        })

        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})

/*
 * @desc   Get order by ID.
 * @route  GET /api/orders/:id
 * @access Private
 */
const getOrderById = asyncHandler(async (req, res) => {
    // get order by ID (from the URL) and populate it with the name & email from user
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

/*
 * @desc   Update order to paid.
 * @route  PUT /api/orders/:id/pay
 * @access Private
 */
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        // PayPal order response:
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

/*
 * @desc   Update order to delivered.
 * @route  PUT /api/orders/:id/deliver
 * @access Private/Admin
 */
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

/*
 * @desc   Get logged-in user's orders.
 * @route  GET /api/orders/myorders
 * @access Private
 */
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)
})

/*
 * @desc   Get all orders.
 * @route  GET /api/orders
 * @access Private/Admin
 */
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name') // also get the id and name from the user associated with the order
    res.json(orders)
})

export { createOrder, getOrderById, updateOrderToPaid, updateOrderToDelivered, getMyOrders, getOrders }