import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import BookingForm from '../shared/BookingForm'
import { bookingUpdate } from '../../api/booking'
import messages from '../shared/AutoDismissAlert/messages'


const BookingUpdate = (props) => {
    const { 
        user, show, handleClose
    } = props

    // triggerRefresh was not working as a prop - not sure why --> returns error: not a function

    const [booking, setBooking] = useState(props.booking)
    const [updated, setUpdated] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setBooking(prevBooking => {
            const name = e.target.name
            let value = e.target.value

            const updatedBooking = { [name]: value }

            return {
                ...prevBooking, ...updatedBooking
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        bookingUpdate(user, booking)
            .then(() => handleClose())
            .then(() => {
                setUpdated(true)
            })
            .then(() => navigate('/dashboard'))
            .catch(() => {
                navigate('/error')
            })
    }

    // if (updated) navigate('/')

    return (
        <Modal show={show} onHide={handleClose} >
            <Modal.Header className='head-modal' closeButton/>
            <Modal.Body className='body-modal'>
                <BookingForm 
                    booking={booking}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Edit booking"
                />
            </Modal.Body>
        </Modal>
    )
}

export default BookingUpdate