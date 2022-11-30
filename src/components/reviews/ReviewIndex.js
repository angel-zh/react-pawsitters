import React, { useEffect, useState } from 'react' 
import { reviewIndex } from '../../api/review'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

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
            // console.log(res.data)
            console.log('review index', reviews)    
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

    const usersReviews = allReviews.filter(review => review.owner === user.id)
    const reviewCards = usersReviews.map(review => (
        <Card key={ review.id } style={{ width: '25rem',  margin: 5, backgroundColor: '#f2f6ec' }}>      
            <Card.Img variant="top" style={{height: '10rem'}}src="https://i.imgur.com/dujfkLL.jpg" />
            <Card.Header>
                <Link style={{color: '#ba7a5f', textDecoration: 'none', fontWeight: 'bold' }} to={ `/petsitters/${review.pet_sitter.owner}` }
                // link is not functioning fully
                >View { review.pet_sitter} </Link>
            </Card.Header>
            <Card.Body>
                <Card.Text style= {{color: '#3f4257'}}>
                    
                    <small>Comments: {review.comment}</small><br/>
                    <small>Rating: {review.rating}</small><br/>
                    {/* <small>{review.pet_sitter}</small><br/> */}
                    <small>Owner: {review.pet_owner}</small><br/>
                    <small>Image: {review.image}</small><br/>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    return (
        <>
            <h1 > All of my reviews:</h1>    
            <ul>{reviewCards}</ul>
        </>
    )
}

export default ReviewIndex