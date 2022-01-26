import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'

const HomeScreen = () => {
    // First arg 'products' is what you want to call the state.
    // Second arg 'setProducts' is the function you want to manipulate the state.
    // useState takes a default value for 'products'.
    const [products, setProducts] = useState([])

    // useEffect runs as soon as the component loads.
    // Second arg is an array of dependencies which you want to trigger useEffect when they change.
    useEffect(() => {
        // Use async/await along with Axios when making backend requests.
        const fetchProducts = async () => {
            const { data } = await axios.get('/api/products')
            setProducts(data)
        }

        fetchProducts()
    }, [])

    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomeScreen
