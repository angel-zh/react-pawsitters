// import React, { useState } from 'react'
// import { Modal } from 'react-bootstrap'
// import { petSitterCreate } from '../../api/petSitter'
// import PetSitterForm from '../shared/PetSitterForm'

// const PetSitterUpdate = (props) => {
//     const {
//         user, show, handleClose,
//         msgAlert, triggerRefresh
//     } = props

//     const [petSitter, setPetSitter] = useState(props.petSitter)

//     const handleChange = event => {
//         setPetSitter(prevPetSitter => {
//             const updatedName = event.target.name
//             // check input type
//             // if input type = checkbox, assign event.target.checked (boolean)
//             let updatedValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value

//             const updatedPetSitter = { [updatedName]: updatedValue }
//             return { ...prevPetSitter, ...updatedPetSitter }
//         })
//     }

//     const handleSubmit = event => {
//         event.preventDefault()

//         petSitterUpdate(petSitter, user, props.petSitter._id)
//             .then(() => handleClose())
//             .then(() => {
//                 msgAlert({
//                     heading: 'Success',
//                     message: 'Updated Pet Sitter Profile',
//                     variant: 'success'
//                 })
//             })
//             .then(() => triggerRefresh())
//             .catch(error => {
//                 msgAlert({
//                     heading: 'Failure',
//                     message: 'Failed to Update Pet Sitter Profile' + error,
//                     variant: 'danger'
//                 })
//             })
//     }

//     return (
//         <Modal size='lg' show={show} onHide={handleClose}>
//             <Modal.Header closeButton />
//             <Modal.Body>
//                 <PetSitterForm
//                     petSitter={petSitter}
//                     handleChange={handleChange}
//                     handleSubmit={handleSubmit}
//                     heading="Update Your Pet Sitter Profile"
//                 />
//             </Modal.Body>
//         </Modal>
//     )
// }

// export default PetSitterUpdate