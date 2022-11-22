// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { petSitterCreate } from '../../api/petSitter'
// import PetSitterForm from '../shared/PetSitterForm'


// const PetSitterCreate = ({ user, msgAlert }) => {
//     const navigate = useNavigate()

//     const defaultPetSitter = {
//         first_name: '',
//         last_name: '',
//         age: '',
//         dog_walking : '',
//         pet_sitting: false,
//         dog: false,
//         cat: false,
//         small_animal: false,
//         reptile: false,
//         bird: false,
//         medicine: false,
//         rate: '',
//         from_date: '',
//         to_date: '',
//         from_time: '',
//         to_time: '',
//         image: '',
//     }

//     const [petSitter, setPetSitter] = useState(defaultPetSitter)


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

//     const handleCreatePetSitter = event => {
//         event.preventDefault()
//         petSitterCreate(petSitter, user)
//             .then(res => { navigate(`/petsitters/${res.data.petSitter._id}`) })
//             .then(() => {
//                 msgAlert({
//                     heading: 'Success',
//                     message: 'Created Pet Sitter Profile',
//                     variant: 'success'
//                 })
//             })
//             .catch(error => {
//                 msgAlert({
//                     heading: 'Failure',
//                     message: 'Create Pet Sitter Profile Failure' + error,
//                     variant: 'danger'
//                 })
//             })
//     }

//     return (
//         <PetSitterForm
//             petSitter={petSitter}
//             handleChange={handleChange}
//             heading="Sign Up to be a Pet Sitter"
//             handleSubmit={handleCreatePetSitter}
//         />
//     )
// }


// export default PetSitterCreate