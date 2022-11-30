import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { petSitterCreate } from '../../api/petSitter'
import PetSitterForm from '../shared/PetSitterForm'


const PetSitterCreate = ({ user, msgAlert }) => {
    const navigate = useNavigate()

    const defaultPetSitter = {
        first_name: '',
        last_name: '',
        age: '',
        dog_walking: '',
        pet_sitting: false,
        dog: false,
        cat: false,
        small_animal: false,
        reptile: false,
        bird: false,
        medicine: false,
        rate: '',
        availability: '',
        from_time: '',
        to_time: '',
        bio: '',
        image: '',
    }

    const [petSitter, setPetSitter] = useState(defaultPetSitter)
    const [picture, setPicture] = useState('')
    const [imageSelected, setImageSelected] = useState('')


    const dayOptions = [
        { value: 'monday', label: 'Monday' },
        { value: 'tuesday', label: 'Tuesday' },
        { value: 'wednesday', label: 'Wednesday' },
        { value: 'thursday', label: 'Thursday' },
        { value: 'friday', label: 'Friday' },
        { value: 'saturday', label: 'Saturday' },
        { value: 'sunday', label: 'Sunday' }
    ]


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

    const handleSelect = event => {
        setPetSitter(prevPetSitter => {
            console.log(event)
            let updatedValue = ''
            event.map((e, index) => {
                if (index === 0) {
                    updatedValue += e.value
                } else {
                    updatedValue += ` ${e.value}`
                }
            })
            return { ...prevPetSitter, availability: updatedValue }
        })
    }

    const handleImageChange = (images) => {
        setPetSitter(prevPetSitter => {
            const name = 'images'
            const updatedPetSitter = {[name]: images}
            return {
                ...prevPetSitter, ...updatedPetSitter
            }
        })
    } 
    const handleCreatePetSitter = event => {
        event.preventDefault()
        petSitterCreate(petSitter, user)
            .then(res => console.log('Created Pet Sitter:', res.data))
            .then(res => { navigate(`/dashboard`) })
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'Created Pet Sitter Profile',
                    variant: 'success'
                })
            })
            .then(() => {
                setPicture('')
                setImageSelected('')
            })
            .catch(error => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Create Pet Sitter Profile Failure' + error,
                    variant: 'danger'
                })
            })
    }

    return (

        <PetSitterForm
            imageSelected={imageSelected}
            setImageSelected={setImageSelected}
            picture={picture}
            setPicture={setPicture}    
            petSitter={petSitter}
            handleChange={handleChange}
            heading="Sign Up to be a Pet Sitter"
            handleSubmit={handleCreatePetSitter}
            handleImageChange={handleImageChange}
            handleSelect={handleSelect}
            dayOptions={dayOptions}
        />
    )
}


export default PetSitterCreate