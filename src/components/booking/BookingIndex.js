import React, { useEffect, useState } from 'react' 
import { Card, Button } from 'react-bootstrap'
// import { Link } from 'react-router-dom'
import { bookingIndex } from '../../api/booking'
import BookingShow from './BookingShow'


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
    const [deleted, setDeleted] = useState(false)

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
    }, [deleted])
    

    const allBookingsJSX = allBookings.map(booking => (
        
        <Card key={ booking.id } style={{ width: 'auto', margin: 10, backgroundColor: '#56596e' }}> 
            <BookingShow 
                user={user}
                booking={booking}
                msgAlert={msgAlert}
                petSitter={booking.pet_sitter}
                deleted={deleted}
                setDeleted={setDeleted}
                
            />     
        </Card>
    ))    

    return (
        <div className='container-md'>
            <h2 className='text-center my-3 page-heading'>All My Bookings</h2>

            <div className='container-md mt-2 booking-index' style={ cardContainerLayout }>
                { allBookingsJSX }
            </div>
        </div>
    )
}

export default BookingIndex