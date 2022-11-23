import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = ({ history }) => { // destructure props and get history
    const dispatch = useDispatch(), navigate = useNavigate()
    const cart = useSelector(state => state.cart), { shippingAddress } = cart
    // add state for the form
    const [address, setAddress]   = useState(shippingAddress.address),
          [city, setCity]         = useState(shippingAddress.city),
          [postCode, setPostCode] = useState(shippingAddress.postCode),
          [country, setCountry]   = useState(shippingAddress.country)

    const submitHandler = e => {
        e.preventDefault() // prevent page from reloading
        dispatch(saveShippingAddress({ address, city, postCode, country }))
        navigate('/payment') // then navigate to the payment page
    }
    
    // Pass the current and previous steps to CheckoutSteps
    return <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control type='text' placeholder='Enter address' value={address} onChange={e => setAddress(e.target.value)} required></Form.Control>
            </Form.Group> 
            <Form.Group controlId='city' className='mt-2'>
                <Form.Label>City</Form.Label>
                <Form.Control type='text' placeholder='Enter city' value={city} onChange={e => setCity(e.target.value)} required></Form.Control>
            </Form.Group> 
            <Form.Group controlId='postCode' className='mt-2'>
                <Form.Label>Post Code</Form.Label>
                <Form.Control type='text' placeholder='Enter postcode' value={postCode} onChange={e => setPostCode(e.target.value)} required></Form.Control>
            </Form.Group> 
            <Form.Group controlId='country' className='mt-2'>
                <Form.Label>Country</Form.Label>
                <Form.Control type='text' placeholder='Enter country' value={country} onChange={e => setCountry(e.target.value)} required></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary' className='mt-4'>Continue</Button>
        </Form>
    </FormContainer>
}

export default ShippingScreen
