// import React, { useEffect, useState } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import { petSitterShow, petSitterDelete } from '../../api/petSitter'

// const PetSitterShow = ({ user, msgAlert }) => {
//     const [petSitter, setPetSitter] = useState(null)
//     const [deleted, setDeleted] = useState(false)
//     const [updated, setUpdated] = useState(false)
//     const { id } = useParams()
//     const navigate = useNavigate()
//     // scroll to top on page load
//     useEffect(() => {
//         window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
//     }, []);

//     // useEffect(() => {
//     //     petSitterShow(user, id)
//     //         .then(res => {
//     //             setPetSitter(res.data.petSitter)
//     //         })
//     //         .catch((error) => {
//     //             msgAlert({
//     //                 heading: 'Failure',
//     //                 message: 'Show Pet Sitter Failed' + error,
//     //                 variant: 'danger'
//     //             })
//     //         })
//     // }, [updated])

//     // const handleDeletePetSitter = () => {
//     //     petSitterDelete(user, id)
//     //         .then(() => {
//     //             setDeleted(true)
//     //             msgAlert({
//     //                 heading: 'Success',
//     //                 message: 'Deleting Pet Sitter Profile',
//     //                 variant: 'success'
//     //             })
//     //         })
//     //         .catch((error) => {
//     //             msgAlert({
//     //                 heading: 'Failure',
//     //                 message: 'Deleting Pet Sitter Profile Fail: ' + error,
//     //                 variant: 'danger'
//     //             })
//     //         })
//     // }

//     // let reviewCards
//     // if (petSitter) {
//     //     if (petSitter.reviews.length > 0) {
//     //         reviewCards = petSitter.reviews.map(review => (
//     //             <Container>
//     //                 <ShowReview
//     //                     key={review._id}
//     //                     review={review}
//     //                     petSitter={petSitter}
//     //                     user={user}
//     //                     msgAlert={msgAlert}
//     //                     triggerRefresh={() => setUpdated(prev => !prev)}
//     //                 />
//     //             </Container>
//     //         ))
//     //     }
//     // }

//     // if (deleted) navigate('/petsitters')

//     // if (!petSitter) {
//     //     return <LoadingScreen />
//     // }


//     return (
//         <>
//             Hello PetSitterShow
//         </>
//     )
// }



// export default PetSitterShow