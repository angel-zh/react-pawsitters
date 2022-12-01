import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { petSitterCreate, petSitterShow } from '../../api/petSitter'
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
    const petSitterLink = `/petsitters/${user.id}`

    const [petSitter, setPetSitter] = useState(defaultPetSitter)
    const [picture, setPicture] = useState('')
    const [imageSelected, setImageSelected] = useState('')
    const [exists, setExists] = useState(false)

    useEffect(() => {
        petSitterShow(user, user.id)
            .then(res => {
                if (res.data.pet_sitter.owner !== null) setExists(true)
            })
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Show Pet Sitter Failed' + error,
                    variant: 'danger'
                })
            })
    }, [])

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

    const handleImageChange = (image) => {
        setPetSitter(prevPetSitter => {
            const name = 'image'
            const updatedPetSitter = { [name]: image }
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
        <>
            {
                exists
                    ? 
                    <div className='container-fluid text-center mt-5'>
                    <h5>You already have an existing PawSitter profile with us.</h5>
                    <Link to={petSitterLink} className='btn btn-outline-info mx-1'>My PawSitter Profile</Link>
                </div>
                    : 
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
            }
        </>
    )
}


export default PetSitterCreate