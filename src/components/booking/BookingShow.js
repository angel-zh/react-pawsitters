import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { bookingDelete } from '../../api/booking'
import BookingUpdate from './BookingUpdate'

const BookingShow = (props) => {
    const { booking, user, msgAlert, triggerRefresh, petSitter, petOwner, deleted, setDeleted } = props

    const [editModalShow, setEditModalShow] = useState(false)
    const navigate = useNavigate()

    const handleDeleteBooking = () => {

        bookingDelete(user, booking)
            .then(() => {
                // "like light switch" - John
                setDeleted(!deleted)
                msgAlert({
                    heading: 'Success: Booking Deleted',
                    message: "Booking Deleted",
                    variant: 'success'
                })
            })
            // on success redirect/make new index
            .catch((error) => {
                msgAlert({
                    heading: 'Oops',
                    message: 'Delete Booking Fail: ' + error,
                    variant: 'danger'
                })
            })
    }

    // Formating Dates and times
    let date = moment(booking.created_at).format('MMMM Do YYYY, h:mm a')
    let dateStart = moment(booking.start_day).format('MMMM Do YYYY')
    let dateEnd = moment(booking.end_day).format('MMMM Do YYYY')
    let timeStart = moment(booking.start_time, 'HH:mm:ss').format('hh:mm A')
    let timeEnd = moment(booking.end_time, 'HH:mm:ss').format('hh:mm A')

    // if there is no booking, return this
    if(!booking){
        return (
            <>
                "No Bookings scheduled yet"
            </>
        )
    }

    return (

        <>
            <Card className='d-flex justify-content-between' style={{ backgroundColor: '#56596e' }}>
                <Card.Header>
                    <div className='booking-img'>
                        {
                        booking.pet_owner.images !== '' 
                        ?
                        <img src={booking.pet_owner.images} alt='pet owner profile pic' className='fluid rounded' style={{ width: 500 }} />
                        :
                        <img src='/defaultProfilePic3.jpg' alt="a cozy puppy being cradled in a person's arms" className='fluid rounded' style={{ width: 500 }} />
                        }

                    </div>
                </Card.Header>
                <Card.Body>
                    <div>
                        <small className='float-end'>Booked: {date}</small><br/>
                        <br/>
                        <b>{booking.pet_owner.first_name} {booking.pet_owner.last_name} has booked {booking.pet_sitter.first_name} {booking.pet_sitter.last_name}</b><br/><br/>
                        <b>Note:</b><br/> <i>{booking.note}</i><br/>
                        <br/>
                        <b>{dateStart} - {dateEnd}</b><br/>
                        <b>{timeStart} - {timeEnd}</b>
                    </div>
                </Card.Body>
                <Card.Footer className='mb-3'>
                    <Button
                        className='m-2'
                        variant="info"
                        onClick={() => setEditModalShow(true)}
                    >
                        Edit
                    </Button>
                    <Button
                        className='m-2'
                        variant="outline-info"
                        onClick={() => handleDeleteBooking()}
                    >
                        Delete
                    </Button>
                </Card.Footer>
            </Card>
            <BookingUpdate
                user={user}
                booking={booking}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                petSitter={petSitter}
                petOwner={petOwner}
            />
        </>

    )
}

export default BookingShow