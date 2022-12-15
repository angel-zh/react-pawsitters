import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { petOwnerUpdate } from '../../api/petOwner'
import PetOwnerForm from '../shared/PetOwnerForm'
import { useNavigate } from 'react-router-dom'

const PetOwnerUpdate = (props) => {
    const {
        user, show, handleClose, triggerRefresh
    } = props

    const [petOwner, setPetOwner] = useState(props.petOwner)
    //props for images for pet owner profile
    const [picture, setPicture] = useState(props.petOwner.images)
    const [imageSelected, setImageSelected] = useState(props.imageSelected)

    const navigate = useNavigate()
    //navigate for error page

    const handleChange = event => {
        setPetOwner(prevPetOwner => {
            const updatedName = event.target.name
            // check input type
            // if input type = checkbox, assign event.target.checked (boolean)
            let updatedValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value

            const updatedPetOwner = { [updatedName]: updatedValue }
            return { ...prevPetOwner, ...updatedPetOwner }
        })
    }
    //image change
    const handleImageChange = (images) => {
        setPetOwner(prevPetOwner => {
            const name = 'images'
            const updatedPetOwner = {[name]: images}
            return {
                ...prevPetOwner, ...updatedPetOwner
            }
        })
    } 
    
    //submit
    const handleSubmit = event => {
        event.preventDefault()
        petOwnerUpdate(petOwner, user, props.petOwner.owner)
            .then(() => handleClose())
            .then(() => triggerRefresh())
            .catch(() => {
                navigate('/error')
            })
    }

    return (
        //brings in pet owner form modal for updating profile

        <Modal size='lg' show={show} onHide={handleClose} >
            <Modal.Header closeButton className='head-modal' />
            <Modal.Body className='body-modal'>
                <PetOwnerForm
                    imageSelected={imageSelected}
                    setImageSelected={setImageSelected}
                    picture={picture}
                    setPicture={setPicture}
                    petOwner={petOwner}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    triggerRefresh={() => setPicture(prev => !prev)}
                    handleImageChange={handleImageChange}
                    heading="Update Your Pet Owner Profile"
                />
            </Modal.Body>
        </Modal>
    )
}

export default PetOwnerUpdate