import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, ListGroupItem, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductDetails } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ProductScreen = () => {
    const { id } = useParams(),
        dispatch = useDispatch(),
        productDetails = useSelector(state => state.productDetails),
        { loading, error, product } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(id))
    }, [dispatch, id])

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            {
                loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h3>{product.name}</h3>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                            </ListGroupItem>
                            <ListGroupItem>
                                Price: ${product.price}
                            </ListGroupItem>
                            <ListGroupItem>
                                Description: {product.description}
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col><strong>{product.price}</strong></Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Button className='w-100' disabled={product.countInStock === 0}>
                                        Add To Cart
                                    </Button>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            }
        </>
    )
}

export default ProductScreen
