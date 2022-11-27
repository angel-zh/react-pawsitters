import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import BookingForm from '../shared/BookingForm'
import { bookingUpdate } from '../../api/booking'
import messages from '../shared/AutoDismissAlert/messages'


const BookingEdit = (props) => {
    const { 
        user, show, handleClose, 
        msgAlert, triggerRefresh, pet_owner
    } = props

    const [booking, setBooking] = useState(props.booking)

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

        bookingUpdate(user, pet_owner._id, booking)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.updateBookingSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: messages.updateBookingFailure + error,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton/>
            <Modal.Body>
                <BookingForm 
                    booking={booking}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    // triggerRefresh={() => setPicture(prev => !prev)}
                    heading="Edit booking"
                />
            </Modal.Body>
        </Modal>
    )
}

export default BookingEdit