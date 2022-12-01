import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ReviewForm from '../shared/ReviewForm'
import { reviewUpdate } from '../../api/review'



const ReviewEdit = (props) => {
    const { 
        user, show, handleClose, triggerRefresh, petSitter
    } = props

    const [review, setReview] = useState(props.review)
    const [picture, setPicture] = useState(props.review.image)
    const [imageSelected, setImageSelected] = useState(props.imageSelected)
    const navigate = useNavigate()

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

        reviewUpdate(user, petSitter.owner, review)
        .then(() => handleClose())
        .then(() => triggerRefresh())
        // .then(() => navigate( '/reviews/' ))
        .catch(() => {
            navigate('/error')
        })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className='head-modal' />
            <Modal.Body className='body-modal'>
                <ReviewForm 
                    imageSelected={imageSelected}
                    setImageSelected={setImageSelected}
                    picture={picture}
                    setPicture={setPicture}
                    review={review}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    triggerRefresh={() => setPicture(prev => !prev)}
                    handleImageChange={handleImageChange}
                    heading="Edit this review!"
                />
            </Modal.Body>
        </Modal>
    )
}

export default ReviewEdit