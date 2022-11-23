import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
    return <Card className='my-3 p-3 rounded'>
        <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} variant='top' />
        </Link>
        <Card.Body>
            <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
                <Card.Title as='h5'>{product.name}</Card.Title>
            </Link>
        </Card.Body>
        <Card.Text as='div'>
            <Rating value={product.rating} text={` ${product.numReviews} reviews`} />
        </Card.Text>
        <Card.Text as='h4' className='mt-3'>${product.price}</Card.Text>
    </Card>
}

export default Product