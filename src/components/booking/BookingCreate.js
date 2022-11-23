import React, { useState }from 'react'
import Accordion from 'react-bootstrap/Accordion';
import BookingForm from '../shared/BookingForm'
import { bookingCreate } from '../../api/booking'

const BookingCreate = (props) => {
    const {
        user, pet_sitter, pet_owner, msgAlert, triggerRefresh
    } = props

    const [booking, setBooking] = useState({
        comment: '',
        rating: '',
        image: ''
    })

    // These states are to clear the image data from the booking form after a booking submit
    // They are set here and then used as props in CloudinaryUploadWidget.js, BookingForm.js, and EditBooking.js
    // Shoutout to Timm and Aisha for helping with this tricky part
    const [picture, setPicture] = useState('')
    const [imageSelected, setImageSelected] = useState('')

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
        let updatedBooking = booking
        updatedBooking.ownerEmail = user.email
        setBooking({
            comment: '',
            rating: '',
            image: ''
        })

        
        bookingCreate(user, pet_sitter._id, pet_owner.id, updatedBooking)
            .then(() => {
                msgAlert({
                    heading: 'Thanks!',
                    message: 'Pawsitter booked! Your pets thank you for taking the time to care.',
                    variant: 'success'
                })
            })
            // sets the image preview back to an empty string
            .then(() => {
                setPicture('')
                setImageSelected('')
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

        <Accordion>
            <Accordion.Item style={{ backgroundColor: '#f2f6ec' }} eventKey="0">
                <Accordion.Header>Book a Pawsitter</Accordion.Header>
                <Accordion.Body style={{ backgroundColor: '#f2f6ec' }}>
                    <BookingForm
                        imageSelected={imageSelected}
                        setImageSelected={setImageSelected}
                        picture={picture}
                        setPicture={setPicture}
                        booking={booking}
                        handleChange={handleChange}
                        handleImageChange={handleImageChange}
                        handleSubmit={handleSubmit}
                        heading="Would you like to book this pawsitter?"
                    />
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>

    )
}

export default BookingCreate
