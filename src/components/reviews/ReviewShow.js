import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { reviewDelete } from '../../api/review'
import ReviewEdit from '../reviews/ReviewEdit'
import moment from 'moment'
import StarRating from '../shared/StarRating'
import { useNavigate } from 'react-router-dom'

const ReviewShow = (props) => {

    const { review, petSitter, user, triggerRefresh } = props

    const [editModalShow, setEditModalShow] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const navigate = useNavigate()

    const handleDeleteReview = () => {
        reviewDelete(user, petSitter.owner, review.id)

            .then(() => {
                setDeleted(true)
                
            })
            .then(() => triggerRefresh())
            .then(() => navigate( '/reviews/'))
            .catch(() => {
                navigate('/error')    
            })
    }
    let date = moment(review.created_at).format('MMMM Do YYYY, h:mm a')

    return (

        <>
            <Card className="d-flex justify-content-between" style={{ backgroundColor: '#56596e' }}>
                <Card.Header className='d-flex justify-content-between'>
                    <p>{review.pet_owner} said:</p>
                    <StarRating
                        value={review.rating}
                        style={{ fontSize: 15 }}
                    />
                </Card.Header>
                <Card.Body>
                    <b>"{review.comment}"</b><br/>
                    <div className='review-img fluid rounded'>
                        <img
                            style={{ width: 170, borderRadius: '10px' }}
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
                triggerRefresh={triggerRefresh}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
            />
        </>

    )
}

export default ReviewShow


