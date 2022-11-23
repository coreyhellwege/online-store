import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import SearchBox from '../components/SearchBox'

const HomeScreen = () => {
    const params = useParams(), dispatch = useDispatch()
    const keyword = params.keyword,
          pageNumber = params.pageNumber || 1
    const productList = useSelector(state => state.productList), { loading, error, products, page, pages } = productList

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return <>
        <Meta />
        <SearchBox />
        {!keyword ? <ProductCarousel /> : <Link to='/' className='btn btn-light'>Go Back</Link>}
        <h2 className='mt-4 d-flex justify-content-center'>Latest Products</h2>
        {
            loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
            <>
                <Row>
                    {products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
                <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
            </>
        }
    </>
}

export default HomeScreen
