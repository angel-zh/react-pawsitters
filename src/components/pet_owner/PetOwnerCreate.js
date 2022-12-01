import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { petOwnerCreate } from '../../api/petOwner'
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
        console.log(petOwner, user)
        petOwnerCreate(petOwner, user)
            .then(res => { navigate(`/petowners/`) })
           
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
            .catch((error) => {
                msgAlert({
                    heading: 'account already exists',
                    variant: 'danger'
                })
            })
            
     
    }
    console.log(petOwner.pet_owner, 'hello')
    return (
        
        <>
        {petOwner == petOwner.id
        // &&
        // petOwner.first_name == 'str'
        // petOwner.last_name !== '' &&
        // petOwner.pet_type!=='' &&
        // petOwner.pet_bio == '' &&
        // petOwner.images 
        ? 
        <>
        <h5>view pet owner account</h5>
        <Link style={{color: '#ba7a5f', textDecoration: 'none', fontWeight: 'bold' }} to={ `/petowners/` }
            >View {} </Link>

        </>:

            
            
            // <h5 className='text-center'><i></i></h5>
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