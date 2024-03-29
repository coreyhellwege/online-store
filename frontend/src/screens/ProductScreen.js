import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, ListGroupItem, Card, Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductDetails, createProductReview } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

const ProductScreen = () => {
    const { id } = useParams(), dispatch = useDispatch(), navigate = useNavigate()
    const productDetails = useSelector(state => state.productDetails), { loading, error, product } = productDetails,
          productReviewCreate = useSelector(state => state.productReviewCreate), { success: successProductReview, error: errorProductReview } = productReviewCreate,
          userLogin = useSelector(state => state.userLogin), { userInfo } = userLogin
    const [qty, setQty] = useState(1), // set component level state
          [rating, setRating] = useState(0),
          [comment, setComment] = useState('')

    useEffect(() => {
        if (successProductReview) {
            alert('Review submitted')
            // After a review is submitted, reset the component and global state
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }

        dispatch(listProductDetails(id))
    }, [dispatch, id, successProductReview])

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(id, { rating, comment }))
    }

    return <>
        <Link className='btn btn-light my-3' to='/'>Go Back</Link>
        {
            loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
            <>
                <Meta title={product.name} />
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroupItem><h3>{product.name}</h3></ListGroupItem>
                            <ListGroupItem><Rating value={product.rating} text={`${product.numReviews} reviews`} /></ListGroupItem>
                            <ListGroupItem>Price: ${product.price}</ListGroupItem>
                            <ListGroupItem className='mt-4'>Description: {product.description}</ListGroupItem>
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
                                {product.countInStock > 0 && (
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col>
                                                <FormControl as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                                    {[...Array(product.countInStock).keys()].map(x => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))}
                                                </FormControl>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                )}
                                <ListGroupItem>
                                    <Button className='w-100' onClick={addToCartHandler} disabled={product.countInStock === 0}>Add To Cart</Button>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} className='mt-5'>
                        <h2>Reviews</h2>
                        {product.reviews.length === 0 && <Message>No reviews</Message>}
                        <ListGroup variant='flush'>
                            {product.reviews.map(review => (
                                <ListGroupItem key={review._id}>
                                    <strong>{review.name}</strong>
                                    <Rating value={review.rating} />
                                    <p>{review.createdAt.substring(0, 10)}</p>
                                    <p>{review.comment}</p>
                                </ListGroupItem>
                            ))}
                            <ListGroupItem>
                                <h4>Write a review</h4>
                                {errorProductReview && ( <Message variant='danger'>{errorProductReview}</Message> )}
                                {userInfo ? (
                                    <Form onSubmit={submitHandler}>
                                        <FormGroup controlId='rating' className='mt-2'>
                                            <FormLabel>Rating</FormLabel>
                                            <FormControl as='select' value={rating} onChange={e => setRating(Number(e.target.value))}>
                                                <option value=''>Select...</option>
                                                <option value='1'>1 - Poor</option>
                                                <option value='2'>2 - Fair</option>
                                                <option value='3'>3 - Good</option>
                                                <option value='4'>4 - Very Good</option>
                                                <option value='5'>5 - Excellent</option>
                                            </FormControl>
                                        </FormGroup>
                                        <FormGroup controlId='comment' className='mt-2'>
                                            <FormLabel>Comment</FormLabel>
                                            <FormControl as='textarea' row='3' value={comment} onChange={e => setComment(e.target.value)}></FormControl>
                                        </FormGroup>
                                        <Button type='submit' variant='primary' className='mt-4'>Submit</Button>
                                    </Form>
                                ) : <Message>Please <Link to='/login'>Sign in</Link> to write a review</Message>}
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                </Row>
            </>
        }
    </>
}

export default ProductScreen
