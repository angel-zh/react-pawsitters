import React, { useState }from 'react'
import Accordion from 'react-bootstrap/Accordion';
import ReviewForm from '../shared/ReviewForm'
import { reviewCreate} from '../../api/review'
import { useNavigate } from 'react-router-dom'


const ReviewCreate = (props) => {
    const {
        user, petSitter, triggerRefresh, 
    } = props
    
    const navigate = useNavigate()
    
    const [review, setReview] = useState({
        owner: '',
        comment: '',
        rating: '',
        image: '',
        pet_sitter: '',
        pet_owner: '',
        owner_email: '',
        
        
    })
    
    // These states are to clear the image data from the review form after a review submit
    // They are set here and then used as props in CloudinaryUploadWidget.js, ReviewForm.js, and ReviewEdit.js
    // Shoutout to Timm and Aisha for helping with this tricky part from the good avocado project
    const [picture, setPicture] = useState('')
    const [imageSelected, setImageSelected] = useState('')
    
    // sets the new values for a new review
    const handleChange = (e) => {
        setReview(prevReview => {
            const name = e.target.name 
            let value = e.target.value
            const updatedReview = { [name]: value }
            return {
                ...prevReview, ...updatedReview
            }
        })
    }

    const handleImageChange = (image) => {
        setReview(prevReview => {
            const name = 'image'
            const updatedReview = {[name]: image}
            return {
                ...prevReview, ...updatedReview
            }
        })
    } 
    
    const handleSubmit = (e) => {

        e.preventDefault()
        let updatedReview = review
        updatedReview.owner_email = user.email
        updatedReview.pet_sitter = petSitter.owner
        updatedReview.pet_owner = user.id
        updatedReview.owner = user.id
    
        
        setReview({
            owner: '',
            comment: '',
            rating: '',
            image: '',
            pet_sitter: '',
            pet_owner: '',
            owner_email: '',
           
        })

        reviewCreate(user, petSitter.owner, user.id, updatedReview)
            // sets the image preview back to an empty string
            .then(() => {
                setPicture('')
                setImageSelected('')
            })
            .then(() => triggerRefresh())
            // .then(() => navigate('/reviews/'))
            .catch(() => {
                navigate('/error')
            })
    }

    return (

        <Accordion>
            <Accordion.Item style={{ backgroundColor: '56596e' }} eventKey="0">
                <Accordion.Header>Add a Review</Accordion.Header>
                <Accordion.Body style={{ backgroundColor: '#56596e', color: 'white' }}>
                    <ReviewForm
                        imageSelected={imageSelected}
                        setImageSelected={setImageSelected}
                        picture={picture}
                        setPicture={setPicture}
                        review={review}
                        handleChange={handleChange}
                        handleImageChange={handleImageChange}
                        handleSubmit={handleSubmit}
                        heading="Add a review for this pet sitter"
                    />
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>

    )
}

export default ReviewCreate
