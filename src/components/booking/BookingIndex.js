import React, { useEffect, useState } from 'react' 
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { bookingIndex } from '../../api/booking'

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const BookingIndex = ({ user, msgAlert, booking }) => {

    const [allBookings, setAllBookings] = useState([])

    useEffect(() => {
        bookingIndex(user)
        .then(res => {
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

    // Filters Bookings by owner
    const usersBookings = allBookings.filter(booking => booking.booking.ownerEmail === user.email)
    const bookingCards = usersBookings.map(booking => (
        
        <Card key={ booking.id } style={{ width: '25rem', margin: 5, backgroundColor: '#f2f6ec' }}>      
            <Card.Img variant="top" src="https://i.imgur.com/hEy5CGF.jpg" />
            <Card.Header>
                <Link style={{color: '#ba7a5f', textDecoration: 'none', fontWeight: 'bold' }} to={ `/restaurants/${booking.restaurant._id}` }>View { booking.restaurant.name } </Link>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    
                    <small>Pet Owner: {booking.pet_owner}</small><br/>
                    <small>Pet Sitter: {booking.pet_sitter}</small>
                    <small>Rating: {booking.start_date}</small><br/>
                </Card.Text>
            </Card.Body>
        </Card>
    ))    

    return (
        <div>
            <h2 className='text-center mt-3'>All My Bookings</h2>
            <div className='container-md text-center' style={ cardContainerLayout }>
                { bookingCards }
            </div>
        </div>
    )
}

export default BookingIndex