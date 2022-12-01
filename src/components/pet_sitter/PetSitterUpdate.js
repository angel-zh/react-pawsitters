import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { petSitterUpdate } from '../../api/petSitter'
import PetSitterForm from '../shared/PetSitterForm'
import { useNavigate } from 'react-router-dom'

const PetSitterUpdate = (props) => {
    const {
        user, show, handleClose, triggerRefresh
    } = props

    const dayOptions = [
        { value: 'monday', label: 'Monday' },
        { value: 'tuesday', label: 'Tuesday' },
        { value: 'wednesday', label: 'Wednesday' },
        { value: 'thursday', label: 'Thursday' },
        { value: 'friday', label: 'Friday' },
        { value: 'saturday', label: 'Saturday' },
        { value: 'sunday', label: 'Sunday' }
    ]

    const navigate = useNavigate()
    const [petSitter, setPetSitter] = useState(props.petSitter)
    const [picture, setPicture] = useState(props.petSitter.image) 
    const [imageSelected, setImageSelected] = useState(props.imageSelected)


    const handleChange = event => {
        setPetSitter(prevPetSitter => {
            const updatedName = event.target.name
            // check input type
            // if input type = checkbox, assign event.target.checked (boolean)
            let updatedValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value

            const updatedPetSitter = { [updatedName]: updatedValue }
            return { ...prevPetSitter, ...updatedPetSitter }
        })
    }

    // handleSelect function for 'react-select' select input
    const handleSelect = event => {
        setPetSitter(prevPetSitter => {
            let updatedValue = ''
            // formats the multi-selected input into a string separated by a space
            event.map((e, index) => {
                if (index === 0) {
                    updatedValue += e.value
                } else {
                    updatedValue += ` ${e.value}`
                }
            })
            return { ...prevPetSitter, availability: updatedValue }
        })
    }

    const handleImageChange = (image) => {
        setPetSitter(prevPetSitter => {
            const name = 'image'
            const updatedPetSitter = {[name]: image}
            return {
                ...prevPetSitter, ...updatedPetSitter
            }
        })
    } 

    const handleSubmit = event => {
        event.preventDefault()
        petSitterUpdate(petSitter, user, props.petSitter.owner)
            .then(() => handleClose())
            .then(() => triggerRefresh())
            .catch(() => { navigate(`/error`) })
    }

    // returns an array of days to repopulate the select input form in manner specified by 'react-select' library
    function getDayOptions() {
        // split string at space
        const splitAvailabilities = petSitter.availability.split(" ")
        let days = []
        dayOptions.forEach((e) => {
            // compare with dayOptions and push matching element to array
            const found = splitAvailabilities.find(element => element === e.value)
            if (!!found) days.push(e)
        })
        return days
    }
    const availability = petSitter ?
        getDayOptions() :
        null


    return (
        <Modal size='lg' show={show} onHide={handleClose}>
            <Modal.Header closeButton className='head-modal'/>
            <Modal.Body className='body-modal'>
                <PetSitterForm
                    petSitter={petSitter}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleSelect={handleSelect}
                    imageSelected={imageSelected}
                    setImageSelected={setImageSelected}
                    picture={picture}
                    triggerRefresh={() => setPicture(prev => !prev)}
                    handleImageChange={handleImageChange}
                    setPicture={setPicture}
                    dayOptions={dayOptions}
                    availability={availability}
                    heading="Update Your Pet Sitter Profile"
                />
            </Modal.Body>
        </Modal>
    )
}

export default PetSitterUpdate