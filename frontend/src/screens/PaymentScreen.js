import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = ({ history }) => { // destructure props and get history
    const dispatch = useDispatch(), navigate = useNavigate()
    const cart = useSelector(state => state.cart), { shippingAddress } = cart
    const [paymentMethod, setPaymentMethod] = useState('PayPal') // set PayPal as default payment method for component level state

    !shippingAddress && navigate('/shipping') // if there's no address, redirect back to shipping screen

    const submitHandler = e => {
        e.preventDefault() // prevent page from reloading
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }
    
    return <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                    <Form.Check checked type='radio' label='PayPal or Credit Card' id='PayPal' name='paymentMethod' value='PayPal' onChange={e => setPaymentMethod(e.target.value)}></Form.Check>
                    <Form.Check type='radio' label='Stripe' id='Stripe' name='paymentMethod' value='Stripe' onChange={e => setPaymentMethod(e.target.value)}></Form.Check>
                </Col>
            </Form.Group>
            <Button type='submit' variant='primary'>Continue</Button>
        </Form>
    </FormContainer>
}

export default PaymentScreen
