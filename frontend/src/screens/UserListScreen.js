import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser } from '../actions/userActions'

const UserListScreen = () => {
    const dispatch = useDispatch(), navigate = useNavigate()
    const userList = useSelector(state => state.userList), { loading, error, users } = userList // Get list of users from the global state
    const userLogin = useSelector(state => state.userLogin), { userInfo } = userLogin
    const userDelete = useSelector(state => state.userDelete), { success: successDelete } = userDelete // rename success from the state to successDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers()) // Dispatch action to retrieve the users data
        } else {
            navigate('/login')
        }
    }, [dispatch, userInfo, navigate, successDelete])

    const deleteHandler = (user) => {
        if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
            dispatch(deleteUser(user._id))
        }
    }
    
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
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                            <td>
                                {user.isAdmin ? 
                                    (<i className="fa fa-check" style={{ color: 'green' }} />) :
                                    (<i className="fa fa-times" style={{ color: 'red' }} />)}
                            </td>
                            <td>
                                <LinkContainer to={`./user/${user._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit' />
                                    </Button>
                                </LinkContainer>
                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user)}>
                                    <i className='fas fa-trash' />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
    </>
}

export default UserListScreen