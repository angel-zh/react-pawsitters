import React, { useEffect, useState } from 'react' 
import { useParams, useNavigate } from 'react-router-dom'
import { petOwnerDelete, petOwnerShow, petOwnerUpdate } from '../../api/petOwner'
import { Container, Button, Image, } from 'react-bootstrap'


const PetOwnerShow = ({ user, msgAlert }) => {

    const [petOwner, setPetOwner] = useState({
        first_name: '',
        last_name:'',
        pet_name:'',
        pet_type:'',
        images:'',
    })
    const [isUpdateShown, setIsUpdateShown] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [updated, setUpdated] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        
        if (user){ petOwnerShow(user, id)
        .then((res) => {
            console.log("petOwner", res.data)
            setPetOwner(res.data.pet_owner)
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Show Pet Owner Failure' + error,
                variant: 'danger'
            })
        })}
    }, [updated])

    const toggleShowUpdate = () => {
        setIsUpdateShown(prevUpdateShown => !prevUpdateShown)
    }

    const handleChange = (event) => {
        // to keep the values as users input info 
        // first spread the current petowner
        // then comma and modify the key to the value you need
        setPetOwner({...petOwner, [event.target.name]: event.target.value})
    }

    const handleUpdatePetOwner = (res) => {
        if (user) {petOwnerUpdate(res.data.pet_owner)
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
        })}
    }
const handleDeletePetOwner = (res) => {
        petOwnerDelete(user, res.data.pet_owner.id)
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
    
if (deleted) navigate('/petsitters/')
    return (
			<>
            <div className='text-center mb-5'>Pet Owner Profile Page</div>
            <Container className='text-center mb-5'>
                
				<h3>Pet Owner' Name: {petOwner.first_name} {petOwner.last_name}</h3>
				<p>Pet Type: {petOwner.pet_type}</p>
                <p>Pet's Name:{petOwner.pet_name}</p>
                <p>Pet Photo: {petOwner.images}</p>
				<Button onClick={() =>toggleShowUpdate()}> Update</Button>
				{isUpdateShown && (
					<petOwnerUpdate
						petOwner={petOwner}
						handleChange={handleChange}
						handleUpdatePetOwner={handleUpdatePetOwner}
                        // triggerRefresh={() => setUpdated(prev => !prev)}

					/>

				)}
                <Button onClick={() =>handleDeletePetOwner()}>Delete</Button>
                </Container>
			</>
		)
}

export default PetOwnerShow