import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { petSitterShow, petSitterDelete } from '../../api/petSitter'
import { Container, Button, Image } from 'react-bootstrap'
import ReviewCreate from '../reviews/ReviewCreate'
import PetSitterUpdate from './PetSitterUpdate'
import ReviewShow from '../reviews/ReviewShow'
import BookingCreate from '../booking/BookingCreate'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDog, faCat, faFish, faWorm, faDove, faPrescriptionBottleMedical } from '@fortawesome/free-solid-svg-icons'
import { reviewIndex } from '../../api/review'


const PetSitterShow = ({ user }) => {
    const [petSitter, setPetSitter] = useState(null)
    const [deleted, setDeleted] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    const [reviews, setReviews] = useState([])


    useEffect(() => {
        petSitterShow(user, id)
            .then(res => {
                setPetSitter(res.data.pet_sitter)
            })
            .catch(() => { navigate(`/error`) })
    }, [updated])

    const handleDeletePetSitter = () => {
        petSitterDelete(user, id)
            .then(() => {
                setDeleted(true)
            })
            .catch(() => { navigate(`/error`) })
    }


    useEffect(() => {
        reviewIndex(user)
            .then((res) => {
                setReviews(res.data.reviews)
            })
    }, [updated])


    const reviewCards = () => {
        return reviews.filter(review => review.pet_sitter.owner === petSitter.owner).map(review => (
            <div>
                <ReviewShow
                    key={review.id}
                    review={review}
                    petSitter={petSitter}
                    user={user}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            </div>
        ))
    }

    // formats string to include a comma to separate a string of list items
    const formatString = string => {
        return string.split(' ').map(l => l.charAt(0).toUpperCase() + l.substring(1)).join(' ').replace(/ /g, ', ')
    }

    // formats time string to remove last 3 elements (the seconds)
    const formatTime = string => {
        return string.slice(0, -3)
    }

    if (deleted) navigate('/petsitters')

    if (petSitter) {
        if (petSitter.owner === null) {
            return (
                <div className='container-fluid text-center mt-5'>
                    <h5>Oh No! You don't have a PawSitter profile with us.</h5>
                    <p>You can register to be a PawSitter anytime.</p>

                    <Link to='/petsitters/create' className='btn btn-outline-info mx-1'>Become a PawSitter</Link>
                </div>
            )
        } else {
            return (
                <div className='pet-sitter-show container-md text-center d-flex'>
                    <div className='bio-container container-fluid'>
                        <div>
                            {
                                petSitter.image !== ''
                                    ?
                                    <Image src={petSitter.image} alt='profile pic' className='profile-pic-show border mt-2' />
                                    :
                                    <Image src='/defaultProfilePic.jpg' alt='profile pic' className='profile-pic-show border mt-2' />
                            }

                            <h2 className='page-heading mt-2'>{petSitter.first_name} {petSitter.last_name}</h2>
                            (PawSitter)
                            <p>Has been a PawSitter since <i>{moment(petSitter.created_at).format("MMM Do YY")}</i></p>
                        </div>

                        <div>
                            {
                                petSitter.dog_walking
                                    ?
                                    <h5>Dog walking </h5>
                                    :
                                    null
                            }
                            <p><FontAwesomeIcon icon={faDog} size='md' className='icon' />Dog</p>
                        </div>

                        {
                            petSitter.pet_sitting
                                ?
                                <h5>Pet Sitting</h5>
                                :
                                null
                        }
                        <div className='d-flex justify-content-around'>
                            {
                                petSitter.pet_sitting && petSitter.dog
                                    ?
                                    <p><FontAwesomeIcon icon={faDog} size='md' className='icon' />Dog </p>
                                    :
                                    null
                            }
                            {
                                petSitter.pet_sitting && petSitter.cat
                                    ?
                                    <p><FontAwesomeIcon icon={faCat} size='md' className='icon' />Cat </p>
                                    :
                                    null
                            }
                            {
                                petSitter.pet_sitting && petSitter.small_animal
                                    ?
                                    <p><FontAwesomeIcon icon={faFish} size='md' className='icon' />Small Animal </p>
                                    :
                                    null
                            }
                            {
                                petSitter.pet_sitting && petSitter.reptile
                                    ?
                                    <p><FontAwesomeIcon icon={faWorm} size='md' className='icon' />Reptile</p>
                                    :
                                    null
                            }
                            {
                                petSitter.pet_sitting && petSitter.bird
                                    ?
                                    <p><FontAwesomeIcon icon={faDove} size='md' className='icon' />Bird </p>
                                    :
                                    null
                            }
                        </div>
                        <div>
                            <h5>Rate</h5>
                            <p>$ {petSitter.rate} / hour</p>
                        </div>
                        <div>
                            <h5>Availability</h5>
                            {formatString(petSitter.availability)} <br />
                            <p><i>Time</i>: {formatTime(petSitter.from_time)} - {formatTime(petSitter.to_time)}</p>
                        </div>
                        <div className='mb-4 border-bottom'>
                            <h5>Biography / Additional Info</h5>
                            {
                                petSitter.medicine
                                    ?
                                    <p><FontAwesomeIcon icon={faPrescriptionBottleMedical} size='lg' className='icon' />I'm willing to give pet medicine if instructed by owner. </p>
                                    :
                                    null
                            }
                            <p>{petSitter.bio}</p>
                        </div>

                        <Container className='mb-3'>
                            {
                                user && petSitter.owner === user.id
                                    ?
                                    <>
                                        <Link to='/dashboard' className='btn btn-info'>My Dashboard</Link>
                                        <Button onClick={() => setEditModalShow(true)} className="m-2"
                                            variant="info"
                                        >
                                            Edit Profile
                                        </Button>
                                        <Button onClick={() => handleDeletePetSitter()}
                                            className="m-2"
                                            variant="outline-info"
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
                            triggerRefresh={() => setUpdated(prev => !prev)}
                            handleClose={() => setEditModalShow(false)}
                        />
                        {
                            user && user.id !== petSitter.owner ?
                                <Container style={{ width: '40rem' }}>
                                    <ReviewCreate
                                        user={user}
                                        petSitter={petSitter}
                                        triggerRefresh={() => setUpdated(prev => !prev)}
                                    />
                                </Container>
                                :
                                user && user.id === petSitter.owner ?
                                    null
                                    :
                                    <h5 className='text-center'><i>Please sign in if you would like to leave a review or booking request for this paw sitter.</i></h5>
                        }
                        <Container>
                            <h3 className='my-5'>All of {petSitter.first_name} {petSitter.last_name}'s reviews:</h3>
                            {
                                reviewCards().length > 0
                                    ?
                                    <>
                                        {reviewCards()}
                                    </>
                                    :
                                    <h5 className='text-center'>This pet sitter does not have any reviews yet. Be the first to review!</h5>
                            }


                        </Container>
                    </div>

                    {
                        user && user.id !== petSitter.owner
                            ?
                            <div className='booking-container'>
                                <Container>
                                    <BookingCreate
                                        user={user}
                                        petSitter={petSitter}
                                        triggerRefresh={() => setUpdated(prev => !prev)}
                                    />
                                </Container>
                            </div>
                            :
                            null
                    }
                </div>
            )
        }
    }
}



export default PetSitterShow