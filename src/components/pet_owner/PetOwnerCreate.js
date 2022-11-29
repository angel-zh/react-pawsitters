import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { petOwnerCreate } from '../../api/petOwner'
import PetOwnerForm from '../shared/PetOwnerForm'

const PetOwnerCreate = (props) => {
    const {user, msgAlert, triggerRefresh  } = props

    const navigate = useNavigate()
    // const triggerRefresh = triggerRefresh()
    const defaultPetOwner = {
        first_name: '',
        last_name: '',
        pet_type: '',
        pet_name: '',
        owner: '',
        pet_bio: '',
        images: '',
    }

    const [petOwner, setPetOwner] = useState(defaultPetOwner)
    const [picture, setPicture] = useState('')
    const [imageSelected, setImageSelected] = useState('')

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
    const handleImageChange = (images) => {
        setPetOwner(prevPetOwner => {
            const name = 'images'
            const updatedPetOwner = {[name]: images}
            return {
                ...prevPetOwner, ...updatedPetOwner
            }
        })
    } 

    // const handleSelect = event => {
    //     setPetOwner(prevPetOwner => {
    //         console.log(event)
    //         let updatedValue = ''
    //         event.map((e, index) => {
    //             if (index === 0) {
    //                 updatedValue += e.value
    //             } else {
    //                 updatedValue += ` ${e.value}`
    //             }
    //         })
    //         return { ...prevPetOwner, availability: updatedValue }
    //     })
    // }

    const handleCreatePetOwner = event => {
        event.preventDefault()
        console.log(petOwner, user)
        petOwnerCreate(petOwner, user)
            // .then(res => { navigate(`/`) })
           
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'Created Pet Owner Profile',
                    variant: 'success'
                })
            })
            .then(() => {
                setPicture('')
                setImageSelected('')
            })
            // .then(() => triggerRefresh())
            // .catch(error => {
            //     msgAlert({
            //         heading: 'Failure',
            //         message: 'Create Pet Owner Profile Failure' + error,
            //         variant: 'danger'
            //     })
            // })
    }

    return (
        <PetOwnerForm
            imageSelected={imageSelected}
            setImageSelected={setImageSelected}
            picture={picture}
            setPicture={setPicture}
            petOwner={petOwner}
            handleChange={handleChange}
            handleSubmit={handleCreatePetOwner}
            // handleSelect={handleSelect}
            // handleCreatePetOwner={handleCreatePetOwner}
            triggerRefresh={() => setPicture(prev => !prev)}
            handleImageChange={handleImageChange}
            heading="Sign Up to be a Pet Owner"
            
        />
    )
}


export default PetOwnerCreate