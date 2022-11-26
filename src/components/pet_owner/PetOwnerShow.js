import React, { useEffect, useState } from 'react' 
import { useParams, useNavigate } from 'react-router-dom'
import { petOwnerDelete, petOwnerShow } from '../../api/petOwner'
import { Container, Button } from 'react-bootstrap'
import PetOwnerUpdate from './PetOwnerUpdate'

const PetOwnerShow = ({ user, msgAlert }) => {

    const [petOwner, setPetOwner] = useState({
        first_name: '',
        last_name:'',
        pet_name:'',
        pet_type:'',
        images:'',
         })
    const [deleted, setDeleted] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
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

    // const toggleShowUpdate = () => {
        // setIsUpdateShown(prevUpdateShown => !prevUpdateShown)
    // const handleChange = (event) => {
    //     // to keep the values as users input info 
    //     // first spread the current petowner
    //     // then comma and modify the key to the value you need
    //     setPetOwner({...petOwner, [event.target.name]: event.target.value})
    // }

    // const handleUpdatePetOwner = (res) => {
    //     if (user) {petOwnerUpdate(res.data.pet_owner)
    //     .then(() => {
    //         msgAlert({
    //             heading: 'Success',
    //             message: 'Updating Pet Owner',
    //             variant: 'success'
    //         })
    //     })
    //     .catch((error) => {
    //         msgAlert({
    //             heading: 'Failure',
    //             message: 'Update Pet Owner Failure' + error,
    //             variant: 'danger'
    //         })
    //     })}
    // }
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
    
    if (deleted) navigate('/petsitters/')

    return (
        <div className='container-md text-center'>
             <i>Pet Owner Profile Page <br /> -Under Construction-</i>
            <h2>{petOwner.first_name} {petOwner.last_name}</h2>


        <Container className='mb-5'>

            {
                    <>
                        <Button onClick={() => setEditModalShow(true)} className="m-2"
                            variant="success"
                        >
                            Edit Profile
                        </Button>
                        <Button onClick={() => handleDeletePetOwner()}
                            className="m-2"
                            variant="danger"
                        >
                            Delete Profile
                        </Button>
                    </>     
            }
        </Container>
        <PetOwnerUpdate
                user={user}
                petOwner={petOwner}
                show={editModalShow}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)}
            />

        {
            user
                ?
                <Container style={{ width: '40rem' }}>
                        user={user}
                        petOwner={petOwner}
                        msgAlert={msgAlert}
                        triggerRefresh={() => setUpdated(prev => !prev)}
                
                </Container>
                :
                <h5 className='text-center'><i>Please sign in if you would like to leave a review.</i></h5>
        }
    </div>
)
}

export default PetOwnerShow