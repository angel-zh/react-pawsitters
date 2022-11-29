import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import BookingForm from '../shared/BookingForm'
import { bookingUpdate } from '../../api/booking'
import messages from '../shared/AutoDismissAlert/messages'


const BookingUpdate = (props) => {
    const { 
        user, show, handleClose, 
        msgAlert, petSitter
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
        console.log('regular string')

        e.preventDefault()
        // let updatedBooking = booking
        // updatedBooking.pet_sitter = petSitter.owner
        // updatedBooking.pet_owner = user.id
        // updatedBooking.owner = user.id
        // if(this.booking === undefined) {return}

        // petSitter gives a 405 error
        console.log(petSitter, 'petSitter')
        bookingUpdate(user, petSitter.owner, booking)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.updateBookingSuccess,
                    variant: 'success'
                })
            })
            // .then(() => triggerRefresh())
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: messages.updateBookingFailure + error,
                    variant: 'danger'
                })
            })
    }

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