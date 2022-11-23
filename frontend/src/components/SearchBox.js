import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, FormControl } from 'react-bootstrap'

const SearchBox = () => {
    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        keyword.trim() ? navigate(`/search/${keyword}`) : navigate('/')
    }

    return (
        <Form onSubmit={submitHandler} className='d-flex mb-3'>
            <FormControl type='text' name='q' onChange={e => setKeyword(e.target.value)} placeholder='Search treats...' className='mr-sm-2 ml-sm-5' />
            <Button type='submit' variant='primary' className='ms-2 p-2'><i className='fas fa-search'></i></Button>
        </Form>
    )
}

export default SearchBox