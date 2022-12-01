import React, { useEffect, useState } from 'react' 
import { useParams, useNavigate } from 'react-router-dom'
import { petOwnerDelete, petOwnerShow } from '../../api/petOwner'
import { Image, Card, Container, Button } from 'react-bootstrap'
import PetOwnerUpdate from './PetOwnerUpdate'
import ReviewCreate from '../reviews/ReviewCreate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFeatherPointed, faDog, faCat, faFish, faDove, faWorm } from '@fortawesome/free-solid-svg-icons'
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
        if (user){ 
            petOwnerShow(user, id)
                .then((res) => {
                    console.log("petOwner", res.data)
                    setPetOwner(res.data.pet_owner)
                })
            .catch((error) => {
                console.log("error", error)
                msgAlert({
                    heading: 'Failure',
                    message: 'Show Pet Owner Failure' + error,
                    variant: 'danger'
                })
            })
        }
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
                message: 'Pet Owner Deleted',
                variant: 'success'
            })
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'deleted Pet Owner Failure' + error,
                variant: 'danger'
            })
        })
}

    if (deleted) navigate('/')
    
   
    return (
        <>
       {petOwner.first_name == '' ? 
         <>
         <h5>create pet owner account</h5>
  
     
     
     <h5 className='text-center'><i></i></h5>
     </>:
       
        <div className= 'container-md' >
            <div style= {{border:'2px rounded black'}}>
        <Card key={petOwner.owner} style={{ width: '48em', margin: 10, backgroundColor: '#afc2f2'}} >
            <Card.Body>
                <Image src='https://i.imgur.com/2y0Ysu1.jpg' className='profile-pic float-start border'></Image>
                <Card.Text>
                    <h3 className='mb-2'>Pet Owner Profile</h3>
                    <h3>Pet Owner's Name: {petOwner.first_name} {petOwner.last_name} <br /> Type of Pet: {petOwner.pet_type} <br />  </h3>
                    <h3>Pet's Name: {petOwner.pet_name} </h3>
                    <h3>About {petOwner.pet_name} : <br/> {petOwner.pet_bio}</h3>
                    
                </Card.Text>
            </Card.Body>
            <Card.Body>
                    <img
                        style={{ width: 600 }}
                        src={petOwner.images}
                        alt={""}
                    />
                </Card.Body>
        </Card>
        
        <div className='container-md text-center'>
             <div className='="container-md' style= {{border: '2px solid black'}}>
             
            

</div>
<br/>
        <Container className='mb-5'>
            {
                user && petOwner.owner === user.id
                    ?
                    <>
                        <Button onClick={() => setEditModalShow(true)} className='btn btn-outline-info mx-1'
                            // variant="success"
                        >
                            Edit Profile
                        </Button>
                        <Button onClick={() => handleDeletePetOwner()}
                            className='btn btn-outline-info mx-1'
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