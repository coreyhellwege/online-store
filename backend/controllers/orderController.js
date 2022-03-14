import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'

/*
 * @desc   Create a new order.
 * @route  POST /api/orders
 * @access Private
 */
const addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
        return
    } else {
        // Add some validation to prevent the user from manipulating item prices from local storage
        orderItems.forEach(async (item) => {
            console.log(item)
            let lookupItem = await Product.findById(item.product)
            console.log(lookupItem)
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
    // get ID from the URL and attach the name & email from user
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

export { addOrderItems, getOrderById }