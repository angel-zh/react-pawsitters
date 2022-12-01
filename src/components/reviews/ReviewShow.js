import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { reviewDelete } from '../../api/review'
import ReviewEdit from '../reviews/ReviewEdit'
import moment from 'moment'
import StarRating from '../shared/StarRating'

const ReviewShow = (props) => {

    const { review, petSitter, user, msgAlert, triggerRefresh } = props

    const [editModalShow, setEditModalShow] = useState(false)
    const [deleted, setDeleted] = useState(false)


    const handleDeleteReview = () => {
        reviewDelete(user, petSitter.owner, review.id)
        // const navigate = useNavigate()
            .then(() => {
                setDeleted(true)
                msgAlert({
                    heading: 'Success: Review Deleted',
                    message: "We'll never speak of it again",
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch((error) => {
                msgAlert({
                    heading: 'Oops',
                    message: 'Delete Review Fail: ' + error,
                    variant: 'danger'
                })
            })
    }
    let date = moment(review.created_at).format('MMMM Do YYYY, h:mm a')

    return (

        <>
            <Card className="d-flex justify-content-between" style={{ backgroundColor: '#56596e' }}>
                <Card.Header className='d-flex justify-content-between'>
                {/* style= {{color: '#3f4257'}} */}
                    <p>{review.owner_email} said:</p>
                    <StarRating
                        value={review.rating}
                        style={{ fontSize: 15 }}
                    />
                </Card.Header>
                <Card.Body>
                    <b>"{review.comment}"</b><br/>
                    <div className='review-img fluid rounded'>
                        <img
                            // styling inline so that the border only appears when the image does
                            style={{ width: 500, borderRadius: '10px', border: '2px solid #757d90' }}
                            src={review.image}
                            alt={""}
                        />
                    </div>
                    
                </Card.Body>
                <Card.Footer className='mb-3'>
                    {
                        user && user.email === review.owner_email
                            ?
                            <>
                                <Button
                                    className='m-2'
                                    variant='info'
                                    onClick={() => setEditModalShow(true)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    className='m-2'
                                    variant="outline-info"
                                    onClick={() => handleDeleteReview()}
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
            <ReviewEdit
                user={user}
                petSitter={petSitter}
                review={review}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
            />
        </>

    )
}

export default ReviewShow


