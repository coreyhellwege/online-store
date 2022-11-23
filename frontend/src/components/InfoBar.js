import React from 'react'
import { Row } from 'react-bootstrap'

const InfoBar = ({ message }) => {
    return <>
        <div className='info-bar d-flex justify-content-center'>
            <Row className='m-2'>
                <small>{message}</small>
            </Row>
        </div>
    </>
}

export default InfoBar
