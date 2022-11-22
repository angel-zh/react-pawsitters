import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { petSitterCreate } from '../../api/petSitter'
import PetSitterForm from '../shared/PetSitterForm'


const PetSitterCreate = ({ user, msgAlert }) => {
    const navigate = useNavigate()

    const defaultPetSitter = {
        name: '',
        type: '',
        address: '',
        telephone: '',
        isUserRestaurantOwner: false,
        delivery: false,
        reservations: false,
        takeout: false,
        catering: false,
        acceptsCreditCard: false,
        parking: false,
        wifi: false,
        masksRequired: false,
        alcohol: false,
        vegan: false
    }

    const [petSitter, setPetSitter] = useState(defaultPetSitter)


    const handleChange = event => {
        setPetSitter(prevPetSitter => {
            const updatedName = event.target.name
            // check input type
            // if input type = checkbox, assign event.target.checked (boolean)
            let updatedValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value

            const updatedPetSitter = { [updatedName]: updatedValue }
            return { ...prevPetSitter, ...updatedPetSitter }
        })
    }

    const handleCreatePetSitter = event => {
        event.preventDefault()
        petSitterCreate(petSitter, user)
            .then(res => { navigate(`/petsitters/${res.data.petSitter._id}`) })
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'Created Restaurant',
                    variant: 'success'
                })
            })
            .catch(error => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Create Restaurant Failure' + error,
                    variant: 'danger'
                })
            })
    }

    return (
        <PetSitterForm
            petSitter={petSitter}
            handleChange={handleChange}
            heading="Sign Up to be a Pet Sitter"
            handleSubmit={handleCreatePetSitter}
        />
    )
}


export default PetSitterCreate