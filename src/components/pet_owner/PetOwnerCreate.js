import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { petOwnerCreate } from '../../api/petOwner'
import PetOwnerForm from '../shared/PetOwnerForm'

const PetOwnerCreate = ({ user, msgAlert }) => {
    const navigate = useNavigate()

    const defaultPetOwner = {
        first_name: '',
        last_name: '',
        pet_type: '',
        pet_name: '',
        owner: '',
        images: '',
    }

    const [petOwner, setPetOwner] = useState(defaultPetOwner)


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


    const handleSelect = event => {
        setPetOwner(prevPetOwner => {
            console.log(event)
            let updatedValue = ''
            event.map((e, index) => {
                if (index === 0) {
                    updatedValue += e.value
                } else {
                    updatedValue += ` ${e.value}`
                }
            })
            return { ...prevPetOwner, availability: updatedValue }
        })
    }

    const handleCreatePetOwner = event => {
        event.preventDefault()
        petOwnerCreate(petOwner, user)
            .then(res => { navigate(`/`) })
           
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'Created Pet Owner Profile',
                    variant: 'success'
                })
            })
            .catch(error => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Create Pet Owner Profile Failure' + error,
                    variant: 'danger'
                })
            })
    }

    return (
        <PetOwnerForm
            petOwner={petOwner}
            handleChange={handleChange}
            heading="Sign Up to be a Pet Owner"
            handleSubmit={handleCreatePetOwner}
        />
    )
}


export default PetOwnerCreate