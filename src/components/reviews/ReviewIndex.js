import React, { useEffect, useState } from 'react' 
import { reviewIndex } from '../../api/review'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}


const ReviewIndex = ({ user, msgAlert, pet_sitter}) => {

    const [allReviews, setAllReviews] = useState([])

    useEffect(() => {
        reviewIndex(user)
        .then(res => {
            console.log(res.data)
            setAllReviews(res.data.reviews)
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Index Reviews Failure' + error,
                variant: 'danger'
            })
        })
    }, [])

    const allReviewsJSX = allReviews.map(review => (
        
        <Card key={ review.id } style={{ width: '25rem',  margin: 5, backgroundColor: '#f2f6ec' }}>      
            <Card.Img variant="top" style={{height: '10rem'}}src="https://i.imgur.com/dujfkLL.jpg" />
            <Card.Header>
                <Link style={{color: '#ba7a5f', textDecoration: 'none', fontWeight: 'bold' }} to={ `/petsitters/${pet_sitter}` }
                // link is not functioing fully
                >View { review.pet_sitter} </Link>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    
                    <small>Comments: {review.comment}</small><br/>
                    <small>Rating: {review.rating}</small><br/>
                    <small>{review.pet_sitter}</small><br/>
                    <small>Owner: {review.pet_owner}</small><br/>
                    <small>Image: {review.image}</small><br/>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    return (
        <>
            <h1 > All of my reviews:</h1>    
            <ul>{allReviewsJSX}</ul>
        </>
    )
}

export default ReviewIndex