import React from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";

const PetOwnerForm = (props) => {
    const { petOwner, handleChange, heading, handleSubmit, handleImageChange, picture, setPicture, imageSelected, setImageSelected } = props

    return (
        <Container className="d-flex justify-content-center" >
            
            <Form onSubmit={handleSubmit} className="pet-owner-form">
                <h3 className='mt-3'>{heading}</h3>
                <Form.Label>Pet Owner's First Name:</Form.Label>
                <Form.Control
                    placeholder="Owner's First Name"
                    name="first_name"
                    id="first_name"
                    value={petOwner.first_name}
                    onChange={handleChange}
                />
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label className='mt-2'>Pet Owner's Last Name:</Form.Label>
                        <Form.Control
                            placeholder="Owner's Last Name"
                            name="last_name"
                            id="last_name"
                            value={petOwner.last_name}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Label className='mt-2'>Pet Type:</Form.Label>
                    <Col sm={6}>
                        <Form.Select
                            aria-label="Type of Pet"
                            name="pet_type"
                            id="pet_type"
                            value={petOwner.pet_type}
                            onChange={handleChange}
                        >
                            <option>Select a type</option>
                            <option value="Dog">Dog</option>
                            <option value="Cat">Cat</option>
                            <option value="Small_Animal">Small Animal</option>
                            <option value="Reptile">Reptile</option>
                            <option value="Bird">Bird</option>
                        </Form.Select>
                    </Col>
                </Row>

                <Form.Group>
                    <Form.Label className='mt-2'>Pet's Name:</Form.Label>
                    <Form.Control
                        placeholder="What is your Pet's Name?"
                        name="pet_name"
                        id="pet_name"
                        value={petOwner.pet_name}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label className='mt-2'>About Your Pet:</Form.Label>
                    <Form.Control
                        placeholder="Tell us about your Pet"
                        name="pet_bio"
                        id="pet_bio"
                        value={petOwner.pet_bio}
                        onChange={handleChange}
                    />
                </Form.Group>
                <>
                    <Form.Label className='mt-2'>Upload an Image of you and your pet (or just your pet):</Form.Label>
                    <CloudinaryUploadWidget
                        handleImageChange={handleImageChange}
                        picture={picture}
                        setPicture={setPicture}
                        imageSelected={imageSelected}
                        setImageSelected={setImageSelected}
                    />
                </>



                <Row>

                </Row>
                <Button variant='outline-info' className='mt-3' type="submit">Submit</Button>

            </Form>
        </Container>
    )
}

export default PetOwnerForm