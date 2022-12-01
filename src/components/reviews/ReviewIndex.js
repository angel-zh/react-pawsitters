import React, { useEffect, useState } from 'react' 
import { reviewIndex } from '../../api/review'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ReviewShow from './ReviewShow'
import StarRating from '../shared/StarRating'

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}


const ReviewIndex = ({ user, msgAlert, reviews }) => {

    const [allReviews, setAllReviews] = useState([])

    useEffect(() => {
        reviewIndex(user)
        .then(res => {
            console.log('this is res.data from indexReviews', res.data)
            setAllReviews(res.data.reviews)
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Index Reviews Failure' + error,
                variant: 'danger'
            })
        })
        console.log('reviewIndex console log for reviews', reviews)    
        console.log('reviewIndex console log for all reviews', allReviews) 
    }, [])

    const userReviews = allReviews.filter(review => review.owner === user.id)
    // const reviewCards = usersReviews.map(review => (
    const allReviewsJSX = userReviews.map(review => (

        <Card key={ review.id } style={{ width: '25rem',  margin: 5, backgroundColor: '#f2f6ec' }}>      
            <Card.Img variant="top" style={{height: '10rem'}} src="https://i.imgur.com/dujfkLL.jpg" />
            <Card.Header className='d-flex justify-content-between'>
                <Link style={{color: '#ba7a5f', textDecoration: 'none', fontWeight: 'bold' }} to={ `/petsitters/${review.pet_sitter.owner}` }
                // link is not functioning fully
                >View { review.pet_sitter.first_name } { review.pet_sitter.last_name }'s Profile       
                
                <StarRating
                value={review.rating}
                style={{ fontSize: 15, display: 'right'}}
            /></Link>
            </Card.Header>
            <Card.Body style= {{ textAlign: 'center'}}>
                <Card.Text style={{ color: '#3f4257' }}>
                    
                    <small>My Review:<br/>{review.comment}</small><br/>
                    <img style={{ width: 200 }}
                        src={review.image}
                        alt={""}/>
                    <br/>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    return (
        <>
            <div>
            <h1 style= {{ textAlign: 'center'}}> All of my reviews:</h1>  
                <ul>{allReviewsJSX}</ul>
            </div>
        </>
    )
}

export default ReviewIndex