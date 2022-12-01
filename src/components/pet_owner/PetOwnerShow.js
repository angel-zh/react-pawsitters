import React, { useEffect, useState } from 'react' 
import { useParams, useNavigate } from 'react-router-dom'
import { petOwnerDelete, petOwnerShow } from '../../api/petOwner'
import { Image, Container, Button } from 'react-bootstrap'
import PetOwnerUpdate from './PetOwnerUpdate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faDog, faCat, faFish, faDove, faWorm } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'


const PetOwnerShow = ({ user, msgAlert }) => {
    const [petOwner, setPetOwner] = useState({
        first_name: '',
        last_name:'',
        pet_name:'',
        pet_type:'',
        images:'',
         })
         //default pet owner is turned into created pet owner

    const [deleted, setDeleted] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (user){ 
            petOwnerShow(user, id)
                .then((res) => {
                    
                    setPetOwner(res.data.pet_owner)
                })
            .catch((error) => {
                navigate('/error')
              //navigate to error page instead of msg alert
            })
        }
    }, [updated])

    //deletes pet owner then navigates to home page
    const handleDeletePetOwner = () => {
        petOwnerDelete(user, id)
        .then(() => {
            setDeleted(true)
        })
      
        .catch(() => {
            navigate('/error')
        })
}

    if (deleted) navigate('/')

    return (
        //pet owner ternary operator to render different pages based on account status
        <>
       {petOwner.first_name == '' ? 
         <>
         <h5>create pet owner account</h5>
  
     
     
     <h5 className='text-center'><i></i></h5>
     </>:
       
        <div className='pet-owner-show container-md text-center d-flex'>
            <div className='bio-container container-fluid'>
                <div>
                    {
                        petOwner.images !== '' 
                        ?
                        <Image src={petOwner.images} alt='profile pic' className='profile-pic-show border mt-2' />
                        :
                        <Image src='/defaultProfilePic2.jpg' alt='profile pic' className='profile-pic-show border mt-2' />
                    }
                    
                    <h2 className='page-heading mt-2'>{petOwner.first_name} {petOwner.last_name}</h2>
                    <p>Has been working with PawSitters since <i>{moment(petOwner.created_at).format("MMM Do YY")}</i></p>
                </div>

                <div className='mb-4 border-bottom'>
                    <h5>The Pet Info</h5>
                    {
                        petOwner.pet_type === 'Dog'
                            ?
                            <FontAwesomeIcon icon={faDog} size='md' className='icon' />
                            :
                            null
                    }
                    {
                        petOwner.pet_type === 'Cat'
                            ?
                            <FontAwesomeIcon icon={faCat} size='md' className='icon' />
                            :
                            null
                    }
                    {
                        petOwner.pet_type === 'Small_Animal'
                            ?
                            <FontAwesomeIcon icon={faFish} size='md' className='icon' />
                            :
                            null
                    }
                    {
                        petOwner.pet_type === 'Reptile'
                            ?
                            <FontAwesomeIcon icon={faWorm} size='md' className='icon' />
                            :
                            null
                    }
                    {
                        petOwner.pet_type === 'Bird'
                            ?
                            <FontAwesomeIcon icon={faDove} size='md' className='icon' />
                            :
                            null
                    }

                    <h6>{petOwner.pet_name} the {petOwner.pet_type} </h6>
                    <h5>Biography</h5>
                    <p>{petOwner.pet_bio}</p>
                </div>
        
        <div className='container-md text-center'>
        <br/>
        <Container className='mb-3'>
            {
                user && petOwner.owner === user.id
                    ?
                    //display edit and delete buttons
                    <>
                        <Button 
                            onClick={() => setEditModalShow(true)} className='m-2'
                            variant="info"
                        >
                            Edit Profile
                        </Button>
                        <Button 
                            onClick={() => handleDeletePetOwner()}
                            className='m-2'
                            variant="outline-info"
                        >
                            Delete Profile
                        </Button>
                    </> 
                    :
                    null    
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
            

                </div>
            </div>
         </div>
         } 
     </>
    )
}


export default PetOwnerShow