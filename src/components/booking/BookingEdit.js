import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import BookingForm from '../shared/BookingForm'
import { bookingUpdate } from '../../api/booking'
import messages from '../shared/AutoDismissAlert/messages'


const BookingEdit = (props) => {
    const { 
        user, show, handleClose, 
        msgAlert, triggerRefresh, restaurant
    } = props

    const [booking, setBooking] = useState(props.booking)
    const [picture, setPicture] = useState(props.booking.image)
    const [imageSelected, setImageSelected] = useState(props.imageSelected)

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

    const handleImageChange = (image) => {
        setBooking(prevBooking => {
            const name = 'image'
            const updatedBooking = {[name]: image}
            return {
                ...prevBooking, ...updatedBooking
            }
        })
    } 

    const handleSubmit = (e) => {
        e.preventDefault()

        bookingUpdate(user, restaurant._id, booking)
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
                    imageSelected={imageSelected}
                    setImageSelected={setImageSelected}
                    picture={picture}
                    setPicture={setPicture}
                    booking={booking}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    triggerRefresh={() => setPicture(prev => !prev)}
                    handleImageChange={handleImageChange}
                    heading="Edit this booking!"
                />
            </Modal.Body>
        </Modal>
    )
}

export default BookingEdit