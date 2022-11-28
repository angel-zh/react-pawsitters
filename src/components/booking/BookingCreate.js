import React, { useState }from 'react'
import BookingForm from '../shared/BookingForm'
import { bookingCreate } from '../../api/booking'

// petOwner doesn't need to be included here bc they are the user??

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
        console.log(petSitter, 'petSitter')
        let updatedBooking = booking
        updatedBooking.ownerEmail = user.email
        // let anotherUpdate = booking
        // anotherUpdate.pet_sitter = petSitter.owner
        // let bookingUpdate = booking
        // bookingUpdate.pet_owner = user.id
        setBooking({
            note: '',
            start_day: '',
            end_day: '',
            start_time: '',
            end_time: ''
        })
        console.log('new booking', booking)
        
        bookingCreate(user, petSitter.owner, updatedBooking)
            .then(() => {
                msgAlert({
                    heading: 'Thanks!',
                    message: 'Pawsitter booked!',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
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
            booking={booking}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            heading="Pawsitter Booking Request Form"
        />
    )
}

export default BookingCreate
