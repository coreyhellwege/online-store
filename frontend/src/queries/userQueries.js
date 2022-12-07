import { gql } from '@apollo/client'

const GET_USERS = gql`
    query getUsers {
        users {
            id
            name
            email
            isAdmin
        }
    }
`

export { GET_USERS }