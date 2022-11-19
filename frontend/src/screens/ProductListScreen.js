import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listProducts, createProduct, deleteProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductListScreen = () => {
    const dispatch = useDispatch(), navigate = useNavigate(), params = useParams()
    const pageNumber = params.pageNumber || 1
    const productList = useSelector(state => state.productList), { loading, error, products, pages, page } = productList // Get list of users from the global state
    const productCreate = useSelector(state => state.productCreate), { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate
    const productDelete = useSelector(state => state.productDelete), { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete
    const userLogin = useSelector(state => state.userLogin), { userInfo } = userLogin

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if (!userInfo.isAdmin) {
            navigate('/login')
        } 

        if (successCreate) {
            navigate(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts('', pageNumber))
        }
    }, [dispatch, userInfo, navigate, successCreate, createdProduct, successDelete, pageNumber])

    const deleteHandler = (product) => {
        if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
            dispatch(deleteProduct(product._id))
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }
    
    return <>
        <Row className='align-items-center'>
            <Col>
                <h1>Products</h1>
            </Col>
            <Col className='text-end'>
                <Button className='my-3' onClick={createProductHandler}>
                    <i className='fa fa-plus'></i>
                    &nbsp;Create Product
                </Button>
            </Col>
        </Row>
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {loadingDelete && <Loader />}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <>
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit' />
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product)}>
                                        <i className='fas fa-trash' />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Paginate pages={pages} page={page} isAdmin={true} />
            </>
        )}
    </>
}

export default ProductListScreen