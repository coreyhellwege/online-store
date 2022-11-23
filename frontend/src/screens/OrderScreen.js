import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'

const OrderScreen = () => {
    const { id } = useParams(), dispatch = useDispatch(), navigate = useNavigate()
    const [ sdkReady, setSdkReady ] = useState(false) // Add state for when the PayPal SDK is ready
    const orderDetails = useSelector(state => state.orderDetails), { order, loading, error } = orderDetails, // Get orderDetails from the state and then extract data from orderDetails
          orderPay     = useSelector(state => state.orderPay), { loading: loadingPay, success: successPay } = orderPay, // rename state variables to avoid duplicates
          orderDeliver = useSelector(state => state.orderDeliver), { loading: loadingDeliver, success: successDeliver } = orderDeliver,
          userLogin    = useSelector(state => state.userLogin), { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } 

        // Build PayPal SDK config script
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')

            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => setSdkReady(true) // check if its ready
            document.body.appendChild(script) // add script to the DOM body
        }

        // check for the order and make sure the order ID matches the ID in the URL. If it doesn't, dispatch getOrderDetails() to fetch the order from the URL.
        if (!order || order._id !== id || successPay || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET }) // dispatch the order_pay_reset action here otherwise there will be an infinite loop after an order is paid.
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(id))
        } else if (!order.isPaid) {
            !window.paypal ? addPayPalScript() : setSdkReady(true) // add the script if it isn't already there
        }
    }, [order, id, successPay, successDeliver, userInfo, dispatch, navigate]) 

    // Note: PayPal returns a payment result
    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(id, paymentResult)) // dispatch the payOrder action
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <>
        <div className='mt-2'>
            <h1>Order</h1>
            <small>Reference: {order._id}</small>
            <hr/>
        </div>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p><strong>Name: </strong>{order.user.name}</p>
                        <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                        <p>
                            <strong>Address: </strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postCode}, {order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message> : <Message variant='warning'>Not Delivered</Message>}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> : <Message variant='warning'>Not Paid</Message>}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 ? <Message>Order is empty</Message> : (
                            <ListGroup variant='flush'>
                                {order.orderItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}><Image src={item.image} alt={item.name} fluid rounded /></Col>
                                            <Col><Link to={`/product/${item.product}`}>{item.name}</Link></Col>
                                            <Col md={4}>{item.qty} x ${item.price} = ${item.qty * item.price}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${order.itemsPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${order.shippingPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${order.taxPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${order.totalPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>
                        {!order.isPaid && (
                            <ListGroup.Item className='mt-3'>
                                {loadingPay && <Loader />}
                                {!sdkReady ? <Loader /> : (
                                    <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                                )}
                            </ListGroup.Item>
                        )}
                        {loadingDeliver && <Loader />}
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item>
                                <Button type='button' className='btn btn-block' onClick={deliverHandler}>Mark as delivered</Button>
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
}

export default OrderScreen