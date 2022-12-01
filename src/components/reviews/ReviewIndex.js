import React, { useEffect, useState } from 'react'
import { reviewIndex } from '../../api/review'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import StarRating from '../shared/StarRating'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

const ReviewIndex = ({ user }) => {

    const [allReviews, setAllReviews] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        reviewIndex(user)

        .then(res => {
            setAllReviews(res.data.reviews)
        })
        .catch(() => {
            navigate('/error')
        })


    }, [])

    // Filter and map through the reviews by owner of the review to produce cards to display
    const userReviews = allReviews.filter(review => review.owner === user.id)

    const allReviewsJSX = userReviews.map(review => (

        <Card key={review.id} style={{ width: '25rem', height: '30rem', margin: 10, backgroundColor: '#56596e', borderRadius: '10px', border: '2px solid #757d90' }}>
            <Card.Img variant="top" style={{ height: '8rem' }} src="https://i.imgur.com/8sFqoTk.png" />
            <Card.Header className='d-flex justify-content-between'>
                <Link className='link' to={`/petsitters/${review.pet_sitter.owner}`}><b>{review.pet_sitter.first_name} {review.pet_sitter.last_name}</b></Link>
                    <StarRating
                        value={review.rating}
                        style={{ fontSize: 15, display: 'right' }}
                    />
                
            </Card.Header>
            <Card.Body style={{ textAlign: 'center', }}>

                    <small>My Review:<br />{review.comment}</small><br />
                    <img style={{ width: 170, borderRadius: '10px' }}
                        src={review.image}
                        alt={""} />
                    <br />
                    
            </Card.Body>
            <Card.Footer>Posted on {moment(review.created_at).format('MMMM Do YYYY, h:mm a')}</Card.Footer>
        </Card>
    ))

    return (
        <div className='container-md'>
            <h1 className='text-center my-3 page-heading'> My Posted Reviews</h1>

            <div className='container-md mt-2 index-review d-flex justify-content-center'>
                {allReviewsJSX}
            </div>
        </div>
    )
}

export default ReviewIndex