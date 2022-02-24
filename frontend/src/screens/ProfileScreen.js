import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails } from '../actions/userActions'

const ProfileScreen = () => {
    const dispatch = useDispatch(), navigate = useNavigate()
    const [name, setName] = useState(''), 
          [email, setEmail] = useState(''), 
          [password, setPassword] = useState(''), 
          [confirmPassword, setConfirmPassword] = useState(''),
          [message, setMessage] = useState(null)
    const userDetails = useSelector(state => state.userDetails), { loading, error, user } = userDetails // get user details state and destructure attrs
    const userLogin = useSelector(state => state.userLogin), { userInfo } = userLogin // get user login state and destructure attrs

    useEffect(() => {
        if (!userInfo) {
            navigate('/login') // if user is not logged-in, redirect them to log in
        } else {
            if (!user.name) {
                // if there's no user name, pass 'profile' to getUserDetails (instead of an id) to get the logged-in user
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [userInfo, navigate, dispatch, user])

    const submitHandler = e => {
        e.preventDefault() // prevent page from reloading
        password !== confirmPassword ? setMessage('Passwords do not match') : console.log('hello') // dispatch update profile
    }

    return <Row>
        <Col md={3}>
            <h2>User Profile</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
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
        </Col>
    </Row>
}

export default ProfileScreen