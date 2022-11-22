import React, { useEffect, useState } from 'react' 
import { useParams, useNavigate } from 'react-router-dom'
import { petOwnerDelete, petOwnerShow, petOwnerUpdate } from '../../api/petOwner'


const PetOwnerShow = ({ user, msgAlert }) => {

    const [petOwner, setPetOwner] = useState({})
    const [isUpdateShown, setIsUpdateShown] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    
    useEffect(() => {
        petOwnerShow(user, id)
        .then((res) => {
            setPetOwner(res.data.petOwner)
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Show Pet Owner Failure' + error,
                variant: 'danger'
            })
        })
    }, [])

    const toggleShowUpdate = () => {
        setIsUpdateShown(prevUpdateShown => !prevUpdateShown)
    }

    const handleChange = (event) => {
        // to keep the values as users input info 
        // first spread the current petowner
        // then comma and modify the key to the value you need
        setPetOwner({...petOwner, [event.target.name]: event.target.value})
    }

    const handleUpdatePetOwner = () => {
        petOwnerUpdate(petOwner, user, id)
        .then(() => {
            msgAlert({
                heading: 'Success',
                message: 'Updating Pet Owner',
                variant: 'success'
            })
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Update Pet Owner Failure' + error,
                variant: 'danger'
            })
        })
    }
const handleDeletePetOwner = () => {
        petOwnerDelete(user, id)
        .then(() => {
            setDeleted(true)
            msgAlert({
                heading: 'Success',
                message: 'Updating Pet Owner',
                variant: 'success'
            })
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'deleted Pet sitter Failure' + error,
                variant: 'danger'
            })
        })
}
    // logical &&
    // both sides of this check NEED to be truthy values = true
    // logical ||
    // only one side of this check needs to be truthy = true
if (deleted) navigate('/petsitters')
    return (
			<>
				<h3>Name: {petOwner.first_name} {petOwner.last_name}</h3>
				<p>Pet: {petOwner.pet_type}{petOwner.pet_name}</p>
				<button onClick={toggleShowUpdate}> Update</button>
				{isUpdateShown && (
					<petOwnerUpdate
						petOwner={petOwner}
						handleChange={handleChange}
						handleUpdatePetOwner={handleUpdatePetOwner}
					/>
                    
				)}
                <button onClick={handleDeletePetOwner}>Delete</button>
               
			</>
		)
}

export default PetOwnerShow