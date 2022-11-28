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

const BookingIndex = ({ user, msgAlert }) => {

    const [allBookings, setAllBookings] = useState([])

    useEffect(() => {
        bookingIndex(user)
            .then(res => {
                console.log(res.data)
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
            <BookingShow 
                user={user}
                booking={booking}
                msgAlert={msgAlert}
                
            />     
            {/* <Card.Img variant="top" src="https://i.imgur.com/dujfkLL.jpg" />
            <Card.Header>
                <small>Pet Owner: {booking.pet_owner}</small><br/>
                <small>Pawsitter: {booking.pet_sitter}</small><br/>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    <small>
                        Note: {booking.note}
                    </small><br/>
                    <small>
                        {booking.start_day} - {booking.end_day}
                    </small><br/>
                    <small>
                        {booking.start_time} - {booking.end_time}
                    </small><br/>
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <Button
                    className='m-2'
                    style={{ backgroundColor: '#aa501a', outline: 'none !important' }}
                    onClick={() => setEditModalShow(true)}
                >
                    Edit
                </Button>
                <Button
                    className='m-2'
                    style={{ backgroundColor: '#a32131', outline: 'none !important' }}
                    onClick={() => handleDeleteBooking()}
                >
                    Delete
                </Button>

            </Card.Footer> */}
        </Card>
    ))    

    return (
        <div>
            <h2 className='text-center mt-3'>All My Bookings</h2>

            <div className='container-md text-center' style={ cardContainerLayout }>
                { allBookingsJSX }
            </div>
        </div>
    )
}

export default BookingIndex