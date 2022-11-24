import React, { useState }from 'react'
import BookingForm from '../shared/BookingForm'
import { bookingCreate } from '../../api/booking'

const BookingCreate = (props) => {
    const {
        user, pet_sitter, pet_owner, msgAlert, triggerRefresh
    } = props

    const [booking, setBooking] = useState({
        note: '',
        start_date: '',
        end_date: '',
        start_time: '',
        end_time: ''
    })

    // sets the new values for a new booking
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
        let updatedBooking = booking
        updatedBooking.ownerEmail = user.email
        setBooking({
            note: '',
            start_date: '',
            end_date: '',
            start_time: '',
            end_time: ''
        })

        
        bookingCreate(user, pet_sitter._id, pet_owner.id, updatedBooking)
            .then(() => {
                msgAlert({
                    heading: 'Thanks!',
                    message: 'Pawsitter booked! Your pets thank you for taking the time to care.',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Something went wrong! Please try again',
                    variant: 'danger'
                })
            })
    }

    return (
        <BookingForm
            booking={booking}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            heading="Pawsitter Booking Request Form"
        />
    )
}

export default BookingCreate
