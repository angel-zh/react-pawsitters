import React, { useEffect, useState } from 'react' 
import { useParams, useNavigate } from 'react-router-dom'
import { petOwnerDelete, petOwnerShow, petOwnerUpdate } from '../../api/petOwner'
import { Container, Button, Image, } from 'react-bootstrap'

const PetOwnerShow = ({ user, msgAlert }) => {

    const [petOwner, setPetOwner] = useState(  {
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
            console.log("ppetOwner", res.data)
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

    // let petOwnerCards
    // if (petOwner) {
    //     if (petOwner.length > 0) {
    //         // map over the reviews
    //         // produce one ShowReview component for each of them
    //         petOwnerCards = petOwner.map(petOwner => (
    //             <Container>
    //                 <PetOwnerShow
    //                     petOwner={petOwner}
    //                     user={user}
    //                     msgAlert={msgAlert}
    //                     triggerRefresh={() => setUpdated(prev => !prev)}
    //                 />
    //             </Container>
    //         ))
    //     }
    // }

  

if (deleted) navigate('/petsitters/')
    return (
			<>
            "hello"
            <Container classba='text-center mb-5'>
                
				<h3>Pet Owner' Name: {petOwner.first_name} {petOwner.last_name}</h3>
				<p>Pet Type: {petOwner.pet_type}</p>
                <p>Pet's Name:{petOwner.pet_name}</p>
                <p>Pet Photo: {petOwner.images}</p>
				<Button onClick={toggleShowUpdate}> Update</Button>
				{isUpdateShown && (
					<petOwnerUpdate
						petOwner={petOwner}
						handleChange={handleChange}
						handleUpdatePetOwner={handleUpdatePetOwner}
					/>

				)}
                <Button onClick={handleDeletePetOwner}>Delete</Button>
                </Container>
			</>
		)
}

export default PetOwnerShow