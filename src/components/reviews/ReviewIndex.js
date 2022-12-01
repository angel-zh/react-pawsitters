import React, { useEffect, useState } from 'react' 
import { reviewIndex } from '../../api/review'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import StarRating from '../shared/StarRating'
import { useNavigate } from 'react-router-dom'


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

        <Card key={ review.id } style={{ width: '25rem',  margin: 5, backgroundColor: '#56596e', borderRadius: '10px', border: '2px solid #757d90'  }}>      
            <Card.Img variant="top" style={{height: '8rem'}} src="https://i.imgur.com/8sFqoTk.png" />
            <Card.Header className='d-flex justify-content-between'>
                <Link style={{color: 'white', textDecoration: 'none', fontWeight: 'bold' }} to={ `/petsitters/${review.pet_sitter.owner}` }
                >View { review.pet_sitter.first_name } { review.pet_sitter.last_name }'s Profile       
                <br></br>
                <StarRating
                value={review.rating}
                style={{ fontSize: 15, display: 'right'}}
            /></Link>
            </Card.Header>
            <Card.Body style= {{ textAlign: 'center', }}>
                <Card.Text>
                    
                    <small>My Review:<br/>{review.comment}</small><br/>
                    <img style={{ width: 200, borderRadius: '10px', border: '2px solid #757d90'  }}
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