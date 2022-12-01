import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { petOwnerCreate, petOwnerShow } from '../../api/petOwner'
import PetOwnerForm from '../shared/PetOwnerForm'
import { Link } from 'react-router-dom'

const PetOwnerCreate = (props) => {
    const {user, msgAlert, triggerRefresh,  } = props

    const navigate = useNavigate()
    
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
    const [exists, setExists] = useState(false)

    useEffect(() => {
        petOwnerShow(user, user.id)
            .then(res => {
                if (res.data.pet_owner.owner !== null)
                setExists(true)
            })
            .catch((error) => {
              
                navigate('/error')
            })
    }, [])

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

    const handleCreatePetOwner = event => {
        event.preventDefault()
        
        petOwnerCreate(petOwner, user)
            .then(res => { navigate(`/petowners/`) })
           
            .then(() => {
                setPicture('')
                setImageSelected('')
            })
            .catch((error) => {
            
                navigate('/error')
            })
    }
    
    return (
        <>
            {
                exists
                    ?
                    <div className='container-fluid text-center mt-5'>
                        <h5>You already have an existing Pet Owner profile with us.</h5>
                        <Link to={ `/petowners/` } className='btn btn-outline-info mx-1'>My Pet Owner Profile</Link>

                    </div> 
                
                    

                
                :
                <PetOwnerForm
                    imageSelected={imageSelected}
                    setImageSelected={setImageSelected}
                    picture={picture}
                    setPicture={setPicture}
                    petOwner={petOwner}
                    handleChange={handleChange}
                    handleSubmit={handleCreatePetOwner}
                    triggerRefresh={() => setPicture(prev => !prev)}
                    handleImageChange={handleImageChange}
                    heading="Sign Up to be a Pet Owner"
                />
            }
        </>

    )
}

export default PetOwnerCreate