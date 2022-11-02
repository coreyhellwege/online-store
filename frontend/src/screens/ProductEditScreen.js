import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = () => {
    const { id } = useParams(), dispatch = useDispatch(), navigate = useNavigate()
    const [name, setName] = useState(''), 
          [price, setPrice] = useState(0), 
          [image, setImage] = useState(''),
          [brand, setBrand] = useState(''),
          [category, setCategory] = useState(''),
          [countInStock, setCountInStock] = useState(0),
          [description, setDescription] = useState(''),
          [uploading, setUploading] = useState(false)
    const productDetails = useSelector(state => state.productDetails), { loading, error, product } = productDetails,
          productUpdate = useSelector(state => state.productUpdate), { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate,
          userLogin = useSelector(state => state.userLogin), { userInfo } = userLogin


    useEffect(() => {
        if (successUpdate) {
            // After a product has been updated, clear the state and redirect back to the product list
            dispatch({ type: PRODUCT_UPDATE_RESET })
            navigate('/admin/productlist')
        } else {
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
        }
    }, [dispatch, navigate, product, id, successUpdate])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
    
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${userInfo.token}`
                }
            }

            const { data } = await axios.post('/api/upload', formData, config)

            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const submitHandler = e => {
        e.preventDefault() // prevent page from reloading
        // Call the updateProduct action and pass it the form data from the component state
        dispatch(updateProduct({ _id: id, name, price, image, brand, category, countInStock, description }))
    }

    return <>
        <Link to='/admin/productlist/' className='btn btn-light my-3'>Go Back</Link>
        <FormContainer>
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
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
                        <Form.Control type='file' label='Choose file' onChange={uploadFileHandler} custom></Form.Control>
                        {uploading && <Loader />}
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