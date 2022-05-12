import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers } from '../actions/userActions'

const UserListScreen = () => {
    const dispatch = useDispatch()
    const userList = useSelector(state => state.userList), { loading, error, users } = userList // Get list of users from the global state

    useEffect(() => {
      dispatch(listUsers()) // Dispatch action to retrieve the users data
    }, [dispatch])
    
  return <>
    <h1>Users</h1>
    {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Admin</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                
            </tbody>
        </Table>
    )}
  </>
}

export default UserListScreen