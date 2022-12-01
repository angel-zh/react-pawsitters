import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ReviewForm from '../shared/ReviewForm'
import { reviewUpdate } from '../../api/review'
import messages from '../shared/AutoDismissAlert/messages'


const ReviewEdit = (props) => {
    const { 
        user, show, handleClose, 
        msgAlert, triggerRefresh, petSitter
    } = props

    const [review, setReview] = useState(props.review)
    const [updated, setUpdated] = useState(false)
    const [picture, setPicture] = useState(props.review.image)
    const [imageSelected, setImageSelected] = useState(props.imageSelected)
    const navigate = useNavigate()

    const handleChange = (e) => {
        console.log('this is the beginging of handlechange review', review)
        setReview(prevReview => {
            const name = e.target.name
            let value = e.target.value

            const updatedReview = { [name]: value }

            return {
                ...prevReview, ...updatedReview
            }
        })
        console.log('this is the endof handlechange review', review)
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
        // console.log('this is handlesubmit review', review)
        e.preventDefault()

        reviewUpdate(user, petSitter.owner, review)
        .then(() => handleClose())
        .then(() => {
            msgAlert({
                heading: 'Success',
                message: messages.updateReviewSuccess,
                variant: 'success'
            })
        })
        .then(() => triggerRefresh())
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: messages.updateReviewFailure + error,
                variant: 'danger'
            })
        })
        console.log('this is review at the end of handle submit', review)
    }

    // if (updated) navigate('/')

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton/>
            <Modal.Body>
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