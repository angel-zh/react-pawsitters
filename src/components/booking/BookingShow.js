import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { bookingDelete } from '../../api/booking'
import BookingEdit from './BookingEdit'
import moment from 'moment'

const BookingShow = (props) => {
    const { booking, user, msgAlert, triggerRefresh, pet_owner, pet_sitter } = props

    const [editModalShow, setEditModalShow] = useState(false)

    const handleDeleteBooking = () => {
        bookingDelete(user, pet_owner._id, booking.id, pet_sitter._id)

            .then(() => {
                msgAlert({
                    heading: 'Success: Booking Deleted',
                    message: "Booking Deleted",
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch((error) => {
                msgAlert({
                    heading: 'Oops',
                    message: 'Delete Booking Fail: ' + error,
                    variant: 'danger'
                })
            })
    }

    let date = moment(booking.createdAt).format('MMMM Do YYYY, h:mm a')
    let dateStart = moment(booking.start_day).format('MMMM Do YYYY')
    let dateEnd = moment(booking.end_day).format('MMMM Do YYYY')
    let timeStart = moment(booking.start_time, 'HH:mm:ss').format('hh:mm A')
    let timeEnd = moment(booking.end_time, 'HH:mm:ss').format('hh:mm A')

    if(booking.length < 1){
        return "No Bookings scheduled yet"
    }

    return (

        <>
            <Card className="m-2" style={{ backgroundColor: '#56596e' }}>
                <Card.Header className='d-flex justify-content-between' style={{ backgroundColor: '#56596e' }}>
                    <p>{booking.pet_owner} has booked {booking.pet_sitter}</p>
                </Card.Header>
                <Card.Body>
                    <small>Note: </small>
                    <p>{booking.note}</p>
                    <small>Days: </small>
                    <p>{dateStart} - {dateEnd}</p>
                    <small>Time: </small>
                    <p>{timeStart} - {timeEnd}</p>
                </Card.Body>
                <Card.Footer>
                    <Button
                        className='m-2'
                        style={{ backgroundColor: '#E6aa501a', borderColor: '#aa501a' }}
                        onClick={() => setEditModalShow(true)}
                    >
                        Edit
                    </Button>
                    <Button
                        className='m-2'
                        style={{ backgroundColor: '#E6a32131', borderColor: '#a32131' }}
                        onClick={() => handleDeleteBooking()}
                    >
                        Delete
                    </Button>
                    
                    <div className='float-end'>Booked: <br/>{date}</div>
                </Card.Footer>
            </Card>
            <BookingEdit
                user={user}
                booking={booking}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
            />
        </>

    )
}

export default BookingShow


// {/* <Container>
//     <h3 className='my-5'>All of {restaurant.name}'s reviews:</h3>
//     {
//         restaurant.reviews.length > 0
//             ?
//             <>
//                 {reviewCards}
//             </>
//             :
//             <>
//                 <h5 className='text-center'>This restaurant does not have any reviews yet. Be the first to review!</h5>
//             </>
//     }

// </Container> */}
