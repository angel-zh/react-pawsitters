import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { petSitterShow, petSitterDelete } from '../../api/petSitter'
import { Container, Button  } from 'react-bootstrap'
import ReviewCreate from '../reviews/ReviewCreate'
import PetSitterUpdate from './PetSitterUpdate'
// import ReviewShow from '../reviews/ReviewShow'
import BookingCreate from '../booking/BookingCreate'

const PetSitterShow = ({ user, msgAlert }) => {
    const [petSitter, setPetSitter] = useState(null)
    const [deleted, setDeleted] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    // scroll to top on page load
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, []);

    useEffect(() => {
        petSitterShow(user, id)
            .then(res => {
                console.log('Pet Show Page:', res.data)
                setPetSitter(res.data.pet_sitter)
            })
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Show Pet Sitter Failed' + error,
                    variant: 'danger'
                })
            })
    }, [updated])

    const handleDeletePetSitter = () => {
        petSitterDelete(user, id)
            .then(() => {
                setDeleted(true)
                msgAlert({
                    heading: 'Success',
                    message: 'Deleting Pet Sitter Profile',
                    variant: 'success'
                })
            })
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Deleting Pet Sitter Profile Fail: ' + error,
                    variant: 'danger'
                })
            })
    }

    // let reviewCards
    // if (petSitter) {
    //     if (petSitter.reviews.length > 0) {
    //         reviewCards = petSitter.reviews.map(review => (
    //             <div>
    //                 <ReviewShow
    //                     key={review._id}
    //                     review={review}
    //                     petSitter={petSitter}
    //                     user={user}
    //                     msgAlert={msgAlert}
    //                     triggerRefresh={() => setUpdated(prev => !prev)}
    //                 />
    //             </div>
    //         ))
    //     }
    // }

    if (deleted) navigate('/petsitters')

    if (!petSitter) {
        return (
            <>
                Loading
            </>
        )
    }


    return (
        <div className='container-md text-center'>
            <i>Pet Sitter Show Page <br /> -Under Construction-</i>
            <h2>{petSitter.first_name} {petSitter.last_name}</h2>
            <h3>Services Provided: </h3>
            {
                petSitter.dog_walking
                    ?
                    <h5>Dog walking</h5>
                    :
                    null
            }
            {
                petSitter.pet_sitting
                    ?
                    <h5>Pet Sitting</h5>
                    :
                    null
            }

            <Container className='mb-5'>
                {
                    user && petSitter.owner === user.id
                        ?
                        <>
                            <Button onClick={() => setEditModalShow(true)} className="m-2"
                                variant="success"
                            >
                                Edit Profile
                            </Button>
                            <Button onClick={() => handleDeletePetSitter()}
                                className="m-2"
                                variant="danger"
                            >
                                Delete Profile
                            </Button>
                        </>
                        :
                        null
                }
            </Container>
            <PetSitterUpdate
                    user={user}
                    petSitter={petSitter}
                    show={editModalShow}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                    handleClose={() => setEditModalShow(false)}
                />

            {
                user
                    ?
                    <>
                        <Container style={{ width: '40rem' }}>
                            <BookingCreate
                                user={user}
                                petSitter={petSitter}
                                msgAlert={msgAlert}
                                triggerRefresh={() => setUpdated(prev => !prev)}
                            />
                        </Container>
                        <Container style={{ width: '40rem' }}>
                            <ReviewCreate
                                user={user}
                                petSitter={petSitter}
                                msgAlert={msgAlert}
                                triggerRefresh={() => setUpdated(prev => !prev)}
                            />
                        </Container>
                    </>
                    :
                    <h5 className='text-center'><i>Please sign in if you would like to leave a review or booking request for this pawsitter.</i></h5>
            }
        </div>
    )
}



export default PetSitterShow