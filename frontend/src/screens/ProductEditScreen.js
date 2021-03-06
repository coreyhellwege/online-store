import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails } from '../actions/productActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const ProductEditScreen = () => {
    const { id } = useParams(), dispatch = useDispatch(), navigate = useNavigate()
    const [name, setName] = useState(''), 
          [price, setPrice] = useState(0), 
          [image, setImage] = useState(''),
          [brand, setBrand] = useState(''),
          [category, setCategory] = useState(''),
          [countInStock, setCountInStock] = useState(0),
          [description, setDescription] = useState('')
    const productDetails = useSelector(state => state.productDetails), { loading, error, product } = productDetails

    useEffect(() => {
        if (!product.name || product._id !== id) {
            dispatch(listProductDetails(id))
        } else {
            // Pre-populate state with current product data
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
        }

    }, [dispatch, product, id])

    const submitHandler = e => {
        e.preventDefault() // prevent page from reloading
        // todo: update product
    }

    return <>
        <Link to='/admin/productlist/' className='btn btn-light my-3'>Go Back</Link>
        <FormContainer>
            <h1>Edit Product</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='name' placeholder='Enter name' value={name} onChange={e => setName(e.target.value)}></Form.Control>
                    </Form.Group>  
                    <Form.Group controlId='price'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control type='number' placeholder='Enter price' value={price} onChange={e => setPrice(e.target.value)}></Form.Control>
                    </Form.Group>  
                    <Form.Group controlId='image'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control type='text' placeholder='Enter image url' value={image} onChange={e => setImage(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='brand'>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type='text' placeholder='Enter brand' value={brand} onChange={e => setBrand(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='countInStock'>
                        <Form.Label>Count In Stock</Form.Label>
                        <Form.Control type='number' placeholder='Enter count in stock' value={countInStock} onChange={e => setCountInStock(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control type='text' placeholder='Enter category' value={category} onChange={e => setCategory(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type='text' placeholder='Enter description' value={description} onChange={e => setDescription(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'>Update</Button>
                </Form>
            )}
        </FormContainer>
    </>
}

export default ProductEditScreen