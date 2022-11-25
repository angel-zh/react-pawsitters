import React, { useEffect, useState } from 'react' 
import { Card } from 'react-bootstrap'
// import { Link } from 'react-router-dom'
import { bookingIndex } from '../../api/booking'

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

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
        
        <Card key={ booking.id } style={{ width: '25rem', margin: 5, backgroundColor: '#f2f6ec' }}>      
            <Card.Img variant="top" src="https://i.imgur.com/dujfkLL.jpg" />
            <Card.Header>
                {/* <Link style={{color: '#ba7a5f', textDecoration: 'none', fontWeight: 'bold' }} to={ `/restaurants/${booking.ownerEmail._id}` }>View { booking.ownerEmail.name } </Link> */}
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    <small>
                        Pet Owner: {booking.pet_owner}
                    </small><br/>
                    <small>
                        Pet Sitter: {booking.pet_sitter}
                    </small><br/>
                    <smal>
                        Note: {booking.note}
                    </smal><br/>
                    <small>
                        Start Date: {booking.start_date}
                    </small><br/>
                    <small>
                        End Date: {booking.end_date}
                    </small><br/>
                    <small>
                        Start Time: {booking.start_time}
                    </small><br/>
                    <small>
                        End Time: {booking.end_time}
                    </small><br/>
                </Card.Text>
            </Card.Body>
        </Card>
    ))    

    return (
        <div>
            <h2 className='text-center mt-3'>All My Bookings</h2>
            <ul>
                { allBookingsJSX }
            </ul>
            {/* <div className='container-md text-center' style={ cardContainerLayout }>
                { allBookingsJSX }
            </div> */}
        </div>
    )
}

export default BookingIndex