import React, { useEffect } from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, ListGroupItem, Card, Button, FormControl } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartScreen = () => {
    const { id } = useParams(), { search } = useLocation(), dispatch = useDispatch(), navigate = useNavigate()
    const qty = new URLSearchParams(search).get('qty')
    const cart = useSelector(state => state.cart), { cartItems } = cart // get cart state and destructure attrs

    useEffect(() => {
        id && dispatch(addToCart(id, qty))
    }, [dispatch, id, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping')
    }
    
    return <Row>
        <Col md={8}>
            <h1>Shopping Cart</h1>
            {
                cartItems.length === 0 ? <Message>Cart is empty <Link to='/'>View products</Link></Message> :
                <ListGroup variant='flush'>
                    {cartItems.map(item => (
                        <ListGroupItem key={item.product}>
                            <Row>
                                <Col md={2}><Image src={item.image} alt={item.name} fluid rounded /></Col>
                                <Col md={3}><Link to={`/product/${item.product}`}>{item.name}</Link></Col>
                                <Col md={2}>${item.price}</Col>
                                <Col md={2}>
                                    <FormControl as='select' value={item.qty} onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                        {[...Array(item.countInStock).keys()].map(x => <option key={x + 1} value={x + 1}>{x + 1}</option>)}
                                    </FormControl>
                                </Col>
                                <Col md={2}><Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}><i className='fas fa-trash'></i></Button></Col>
                            </Row>  
                        </ListGroupItem>
                    ))}
                </ListGroup>
            }
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroupItem>
                        <h2>Subtotal ({cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}) items</h2>
                        ${cartItems.reduce((acc, item) => acc + Number(item.qty) * Number(item.price), 0).toFixed(2)}
                    </ListGroupItem>
                    <ListGroupItem>
                        <Button type='button' className='btn-block w-100' disabled={cartItems.length === 0} onClick={checkoutHandler}>Proceed to checkout</Button>
                    </ListGroupItem>
                </ListGroup>
            </Card>
        </Col>
    </Row>
}

export default CartScreen
