import React, { useState }from 'react'
import { useNavigate } from 'react-router-dom'
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
    const navigate = useNavigate()

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
        // console.log(petSitter, 'petSitter')
        let updatedBooking = booking
        updatedBooking.pet_sitter = petSitter.owner
        updatedBooking.pet_owner = user.id
        updatedBooking.owner = user.id

        setBooking({
            note: '',
            start_day: '',
            end_day: '',
            start_time: '',
            end_time: ''
        })
        // console.log('new booking', booking)
        
        bookingCreate(user, petSitter.owner, updatedBooking)
            .then(() => {
                msgAlert({
                    heading: 'Thanks!',
                    message: 'Pawsitter booked!',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .then(() => navigate('/bookings/'))
            .catch((error) => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Something went wrong! Please try again' + error,
                    variant: 'danger'
                })
            })
    }

    return (
        <BookingForm
            user={user} // added during button fix attempts
            petSitter={petSitter} // added during button fix attempts
            booking={booking}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            triggerRefresh={triggerRefresh} // added during button fix attempts
            heading="Pawsitter Booking Request Form"
        />
    )
}

export default BookingCreate
