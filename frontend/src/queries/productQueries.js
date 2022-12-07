import { gql } from '@apollo/client'

const GET_PRODUCTS = gql`
    query getProducts {
        products {
            id
            name
            image
            brand
            category
            description
            price
            countInStock
            rating
            numReviews
        }
    }
`

const GET_PRODUCT = gql`
    query getProduct($id: ID!) {
        product(id: $id) {
            id
            name
            image
            brand
            category
            description
            price
            countInStock
            rating
            numReviews
            user {
                id
                name
                email
                isAdmin
            }
            reviews {
                id     
                name   
                qty    
                image  
                price  
                product
            }
        }
    }
`

export { GET_PRODUCTS, GET_PRODUCT }