import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders } from '../actions/orderActions'

const OrderListScreen = () => {
    const dispatch = useDispatch(), navigate = useNavigate()
    const orderList = useSelector(state => state.orderList), { loading, error, orders } = orderList // Get list of orders from the global state
    const userLogin = useSelector(state => state.userLogin), { userInfo } = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders()) // Dispatch action to retrieve the orders
        } else {
            navigate('/login')
        }
    }, [dispatch, userInfo, navigate])
    
    return <>
        <h1>Orders</h1>
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Delivered</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user && order.user.name}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>${order.totalPrice}</td>
                            <td>
                                {order.isPaid ? 
                                    (order.paidAt.substring(0, 10)) :
                                    (<i className="fa fa-times" style={{ color: 'red' }} />)}
                            </td>
                            <td>
                                {order.isDelivered ? 
                                    (order.deliveredAt.substring(0, 10)) :
                                    (<i className="fa fa-times" style={{ color: 'red' }} />)}
                            </td>
                            <td>
                                <LinkContainer to={`/order/${order._id}`}>
                                    <Button variant='light' className='btn-sm'>Details</Button>
                                </LinkContainer>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
    </>
}

export default OrderListScreen