import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

const RegisterScreen = () => {
    const location = useLocation(), dispatch = useDispatch(), navigate = useNavigate()
    const [name, setName] = useState(''), 
          [email, setEmail] = useState(''), 
          [password, setPassword] = useState(''), 
          [confirmPassword, setConfirmPassword] = useState(''),
          [message, setMessage] = useState(null)
    const userRegister = useSelector(state => state.userRegister), { loading, error } = userRegister // get user register state and destructure attrs
    const userLogin = useSelector(state => state.userLogin), { userInfo } = userLogin // get user login state and destructure attrs
    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        userInfo && navigate(redirect) // if a user is already logged in, redirect them
    }, [userInfo, navigate, redirect])

    const submitHandler = e => {
        e.preventDefault() // prevent page from reloading
        password !== confirmPassword ? setMessage('Passwords do not match') : dispatch(register(name, email, password))
    }

    return <FormContainer>
        <h1>Sign Up</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='mt-2'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='name' placeholder='Enter name' value={name} onChange={e => setName(e.target.value)}></Form.Control>
            </Form.Group>  
            <Form.Group controlId='email' className='mt-2'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder='Enter email' value={email} onChange={e => setEmail(e.target.value)}></Form.Control>
            </Form.Group>  
            <Form.Group controlId='password' className='mt-2'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter password' value={password} onChange={e => setPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmPassword' className='mt-2'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary' className='mt-4'>Register</Button>
        </Form>
        <Row className='py-3'>
            <Col>Have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link></Col>
        </Row>
    </FormContainer>
}

export default RegisterScreen