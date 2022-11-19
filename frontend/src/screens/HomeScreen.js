import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const HomeScreen = () => {
    const params = useParams(), dispatch = useDispatch()
    const productList = useSelector(state => state.productList), { loading, error, products } = productList

    useEffect(() => {
        dispatch(listProducts(params.keyword))
    }, [dispatch, params.keyword])

    return <>
        <h1>Latest Products</h1>
        {
            loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
            <Row>
                {products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        }
    </>
}

export default HomeScreen
