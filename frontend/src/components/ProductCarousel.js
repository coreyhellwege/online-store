import React, { useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopRatedProducts } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'

const ProductCarousel = () => {
    const dispatch = useDispatch()
    const productTopRated = useSelector(state => state.productTopRated), { loading, error, products } = productTopRated

    useEffect(() => {
        dispatch(listTopRatedProducts())
    }, [dispatch])
    
    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Carousel pause='hover'>
            {products.map(product => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Carousel.Caption className='carousel-caption'>
                            <h2>{product.name}</h2> 
                        </Carousel.Caption>
                        <Image src={product.image} alt={product.name} fluid />
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default ProductCarousel