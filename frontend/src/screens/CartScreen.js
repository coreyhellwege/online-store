import React, { useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'



const CartScreen = () => {
    const { id } = useParams(),
        { search } = useLocation(),
        dispatch = useDispatch(),
        qty = new URLSearchParams(search).get('qty'),
        cart = useSelector(state => state.cart),
        { cartItems } = cart

    useEffect(() => {
        if (id) {
            dispatch(addToCart(id, qty))
        }
    }, [dispatch, id, qty])
    
    return <div>
        Cart
    </div>;
};

export default CartScreen;
