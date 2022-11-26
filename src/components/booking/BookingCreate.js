import React, { useState }from 'react'
import BookingForm from '../shared/BookingForm'
import { bookingCreate } from '../../api/booking'

const BookingCreate = (props) => {
    const {
        user, petSitter, msgAlert, triggerRefresh
    } = props

    const [booking, setBooking] = useState({
        note: '',
        start_day: '',
        end_day: '',
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
            start_day: '',
            end_day: '',
            start_time: '',
            end_time: ''
        })

        
        bookingCreate(user, petSitter.owner, updatedBooking)
            console.log(petSitter.owner, 'petSitter.owner')
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
