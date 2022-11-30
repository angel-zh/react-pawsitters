import React, { useEffect, useState } from 'react' 
import { Card, Button } from 'react-bootstrap'
// import { Link } from 'react-router-dom'
import { bookingIndex } from '../../api/booking'
import BookingShow from './BookingShow'
// import PetImages from '../shared/PetImages'


const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

// const linkStyle = {
//     color: 'black',
//     textDecoration: 'none'
// }

const BookingIndex = ({ user, msgAlert, petOwner }) => {

    const [allBookings, setAllBookings] = useState([])

    useEffect(() => {
        bookingIndex(user)
            .then(res => {
                // console.log(res.data)
                setAllBookings(res.data.bookings)

            })
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Index Failure: ' + error,
                    variant: 'danger'
                })
            })
    }, [])
    

    const allBookingsJSX = allBookings.map(booking => (
        
        <Card key={ booking.id } style={{ margin: 5, backgroundColor: '#56596e' }}> 
        {/* <Card.Img variant="top" src={PetImages[`${petOwner.pet_type}`]} style={{ height: '300px' }} alt={petOwner.pet_type} /> */}
            <BookingShow 
                user={user}
                booking={booking}
                msgAlert={msgAlert}
                petSitter={booking.pet_sitter}
                
            />     
        </Card>
    ))    

    return (
        <div className='text-center mt-3'>
            <h2>All My Bookings</h2>
            <i>~currently under construction~</i>

            <div className='container-md text-center' style={ cardContainerLayout }>
                { allBookingsJSX }
            </div>
        </div>
    )
}

export default BookingIndex