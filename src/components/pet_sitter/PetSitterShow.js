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


const PetSitterShow = ({ user, msgAlert }) => {
    const [petSitter, setPetSitter] = useState(null)
    const [deleted, setDeleted] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    const [reviews, setReviews] = useState([])
    const [allReviews, setAllReviews] = useState([])
    
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


    useEffect(() => {
        reviewIndex(user)
            .then((res) => {
                console.log('this is res.data', res.data)
                setReviews(res.data.reviews)
            })
    }, [])

    // const userReviews = allReviews.filter(review => review.pet_sitter === petSitter.owner)
    const reviewCards = () => {
        // if (reviews.id) {
        console.log('reviews', reviews)
        return reviews.map(review => (
            <div>
                <ReviewShow
                    key={review.id}
                    review={review}
                    petSitter={petSitter}
                    user={user}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            </div>
        ))
    }

         
    const formatString = string => {
        return string.split(' ').map(l => l.charAt(0).toUpperCase() + l.substring(1)).join(' ').replace(/ /g, ', ')
    }

    const formatDate = string => {
        return string.slice(0, -3)
    }

    if (deleted) navigate('/petsitters')

    if (petSitter) {
        if (petSitter.first_name == '') {
            return (
                <div className='container-fluid text-center mt-5'>
                    <h5>Oh No! There is not yet a profile created for this PawSitter.</h5>
                    <p>Register to be a PawSitter with us!</p>

                    <Link to='/petsitters/create' className='btn btn-outline-info mx-1'>Become a PawSitter</Link>
                </div>
            )
        } else {
            return (
                <div className='pet-sitter-show container-md text-center d-flex'>
                    <div className='bio-container container-fluid'>
                        <div>
                            <Image src='/defaultProfilePic.jpg' alt='profile pic' className='profile-pic-show border mt-2' />
                            <h2 className='page-heading mt-2'>{petSitter.first_name} {petSitter.last_name}</h2>
                            <p>Has been a Paw Sitter since <i>{moment(petSitter.createdAt).format("MMM Do YY")} ({moment(petSitter.createdAt).startOf('day').fromNow()})</i></p>
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
                            <p><i>Time</i>: {formatDate(petSitter.from_time)} - {formatDate(petSitter.to_time)}</p>
                        </div>
                        <div className='mb-4'>
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
                            msgAlert={msgAlert}
                            triggerRefresh={() => setUpdated(prev => !prev)}
                            handleClose={() => setEditModalShow(false)}
                        />
                        {
                            user ?
                                <Container style={{ width: '40rem' }}>
                                    <ReviewCreate
                                        user={user}
                                        petSitter={petSitter}
                                        msgAlert={msgAlert}
                                        triggerRefresh={() => setUpdated(prev => !prev)}
                                    />
                                </Container>
                                :
                                <h5 className='text-center'><i>Please sign in if you would like to leave a review or booking request for this paw sitter.</i></h5>
                        }
                        <Container>
                            <h3 className='my-5'>All of {petSitter.first_name} {petSitter.last_name}'s reviews:</h3>
                            {
                                reviews.length > 0
                                    ?
                                    <>
                                        {reviewCards()}
                                    </>
                                    :
                                    <>
                                        <h5 className='text-center'>This pet sitter does not have any reviews yet. Be the first to review!</h5>
                                    </>
                            }


                        </Container>
                    </div>

                    {
                        user
                            ?
                            <div className='booking-container'>
                                {/* This is one way to show the Booking request */}
                                <Container>
                                    <BookingCreate
                                        user={user}
                                        petSitter={petSitter}
                                        msgAlert={msgAlert}
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