import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { PetOwnerUpdate } from '../../api/petOwner'
import PetOwnerForm from '../shared/PetOwnerForm'

const PetOwnerUpdate = (props) => {
    const {
        user, show, handleClose,
        msgAlert, triggerRefresh
    } = props

    const [petOwner, setPetOwner] = useState(props.petOwner)

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

    const handleSubmit = event => {
        event.preventDefault()

        PetOwnerUpdate(petOwner, user, props.petOwner._id)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'Updated Pet Owner Profile',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(error => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Failed to Update Pet Owner Profile' + error,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal size='lg' show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <PetOwnerForm
                    petOwner={petOwner}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Update Your Pet Owner Profile"
                />
            </Modal.Body>
        </Modal>
    )
}

export default PetOwnerUpdate