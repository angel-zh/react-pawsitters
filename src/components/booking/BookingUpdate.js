import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import BookingForm from '../shared/BookingForm'
import { bookingUpdate } from '../../api/booking'

const BookingUpdate = (props) => {
    const { 
        user, show, handleClose, triggerRefresh, updated, setUpdated
    } = props

    const [booking, setBooking] = useState(props.booking)
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
    console.log('updated', updated)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        bookingUpdate(user, booking)
        .then(() => handleClose())
        .then(() => triggerRefresh())
        // .then(() => navigate('/bookings'))
        .catch(() => {
            navigate('/error')
        })
    }
    
    console.log('updated', updated)

    // if(updated) {
    //     navigate('/dashboard')
    // }

    return (
        <Modal show={show} onHide={handleClose} >
            <Modal.Header className='head-modal' closeButton/>
            <Modal.Body className='body-modal'>
                <BookingForm 
                    booking={booking}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    triggerRefresh={triggerRefresh}
                    heading="Edit booking"
                />
            </Modal.Body>
        </Modal>
    )
}

export default BookingUpdate