import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const ProfileScreen = () => {
    const dispatch = useDispatch(), navigate = useNavigate()
    const [name, setName] = useState(''), 
          [email, setEmail] = useState(''), 
          [password, setPassword] = useState(''), 
          [confirmPassword, setConfirmPassword] = useState(''),
          [message, setMessage] = useState(null)

    // get state and destructure attrs
    const userDetails = useSelector(state => state.userDetails), { loading, error, user } = userDetails
    const userLogin = useSelector(state => state.userLogin), { userInfo } = userLogin 
    const userUpdateProfile = useSelector(state => state.userUpdateProfile), { success } = userUpdateProfile
    const myOrders = useSelector(state => state.myOrders), { loading: loadingOrders, error: errorOrders, orders } = myOrders

    useEffect(() => {
        if (!userInfo) {
            navigate('/login') // if user is not logged-in, redirect them to log in
        } else {
            if (!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile')) // if there's no user name, pass 'profile' to getUserDetails (instead of an id) to get the logged-in user
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [userInfo, navigate, dispatch, user, success])

    const submitHandler = e => {
        e.preventDefault() // prevent page from reloading
        password !== confirmPassword ? setMessage('Passwords do not match') : dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }

    return <Row>
        <Col md={3}>
            <h2>User Profile</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Profile Updated</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='name' placeholder='Enter name' value={name} onChange={e => setName(e.target.value)}></Form.Control>
                </Form.Group>  
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' value={email} onChange={e => setEmail(e.target.value)}></Form.Control>
                </Form.Group>  
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password' value={password} onChange={e => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Update</Button>
            </Form>
        </Col>
        <Col md={9}>
            <h2>My Orders</h2>
            {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0,10)}</td> 
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0,10) : <i className='fas fa-times' style={{color: 'red'}}></i>}</td>
                                <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : <i className='fas fa-times' style={{color: 'red'}}></i>}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button className='btn-sm' variant='light'>Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Col>
    </Row>
}

export default ProfileScreen