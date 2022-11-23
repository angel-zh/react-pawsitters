import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { reviewDelete } from '../../api/review'
import BookingEdit from './BookingEdit'
import moment from 'moment'
import StarRating from '../shared/StarRating'

const BookingShow = (props) => {
    const { review, restaurant, user, msgAlert, triggerRefresh } = props

    const [editModalShow, setEditModalShow] = useState(false)


    const handleDeleteBooking = () => {
        reviewDelete(user, restaurant._id, review.id)

            .then(() => {
                msgAlert({
                    heading: 'Success: Booking Deleted',
                    message: "We'll never speak of it again",
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
    let date = moment(review.createdAt).format('MMMM Do YYYY, h:mm a')

    return (

        <>
            <Card className="m-2" style={{ backgroundColor: '#f2f6ec' }}>
                <Card.Header className='d-flex justify-content-between' style={{ backgroundColor: '#f9ffee' }}>
                    <p>{review.username} said:</p>
                    <StarRating
                        value={review.rating}
                        style={{ fontSize: 15 }}
                    />
                </Card.Header>
                <Card.Body>
                    <small>Comments: </small>
                    <p>{review.comment}</p>
                    <img
                        style={{ width: 200 }}
                        src={review.image}
                        alt={""}
                    />
                </Card.Body>
                <Card.Footer>
                    {
                        user && user.email === review.ownerEmail
                            ?
                            <>
                                <Button
                                    className='m-2'
                                    variant='success'
                                    onClick={() => setEditModalShow(true)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDeleteBooking()}
                                >
                                    Delete
                                </Button>
                            </>
                            :
                            <></>
                    }
                    <div className='float-end'>{date}</div>
                </Card.Footer>
            </Card>
            <BookingEdit
                user={user}
                restaurant={restaurant}
                review={review}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
            />
        </>

    )
}

export default BookingShow

