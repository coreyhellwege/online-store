import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

const LoginScreen = () => {
    const location = useLocation(), dispatch = useDispatch(), navigate = useNavigate()
    const [email, setEmail] = useState(''), [password, setPassword] = useState('') // set component level state
    const userLogin = useSelector(state => state.userLogin), { loading, error, userInfo } = userLogin // get user login state and destructure attrs
    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        userInfo && navigate(redirect)
    }, [userInfo, navigate, redirect])

    const submitHandler = e => {
        e.preventDefault() // prevent page from reloading
        dispatch(login(email, password))
    }

    return <FormContainer>
        <h1>Sign In</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder='Enter email' value={email} onChange={e => setEmail(e.target.value)}></Form.Control>
            </Form.Group>  
            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter password' value={password} onChange={e => setPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>Sign In</Button>
        </Form>
        <Row className='py-3'>
            <Col>New customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link></Col>
        </Row>
    </FormContainer>
};

export default LoginScreen