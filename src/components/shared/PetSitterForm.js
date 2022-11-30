import React from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";

const PetSitterForm = (props) => {
    const { petSitter, handleChange, heading, handleSubmit, handleSelect, dayOptions, availability, handleImageChange, picture, setPicture, imageSelected, setImageSelected } = props

    const animatedComponents = makeAnimated()
    return (
        
        <Container className="mt-3 d-flex justify-content-center">
            
            <Form onSubmit={handleSubmit} className="pet-sitter-form">
                <h3 className='mb-3'>{heading}</h3>
                <Row>
                    <Col xs='auto'>
                        <Form.Label>First Name:</Form.Label>
                        <Form.Control
                            placeholder="First Name"
                            name="first_name"
                            id="first_name"
                            value={petSitter.first_name}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs='auto'>
                        <Form.Label>Last Name:</Form.Label>
                        <Form.Control
                            placeholder="Last Name"
                            name="last_name"
                            id="last_name"
                            value={petSitter.last_name}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs='auto'>
                        <Form.Label>Age:</Form.Label>
                        <Form.Control
                            placeholder='Minimum age is 18'
                            type='number'
                            name="age"
                            id="age"
                            min='18'
                            value={petSitter.age}
                            onChange={handleChange}
                        />
                    </Col>
                    <>
                    <Form.Label>Upload an Image:</Form.Label>
                    <CloudinaryUploadWidget
                        handleImageChange={handleImageChange}
                        picture={picture}
                        setPicture={setPicture}
                        imageSelected={imageSelected}
                        setImageSelected={setImageSelected}
                    />
                </>
                </Row>
                <Form.Label>Please check the services you would like to provide:</Form.Label>
                <Row>
                    <Col xs='auto'>
                        <Form.Check
                            label="Dog walking"
                            name="dog_walking"
                            defaultChecked={petSitter.dog_walking}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs='auto'>
                        <Form.Check
                            label="Pet sitting"
                            name="pet_sitting"
                            defaultChecked={petSitter.pet_sitting}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>
                <Form.Label>Please check the types of pets you accept:</Form.Label>
                <Row>
                    <Col xs='auto'>
                        <Form.Check
                            label="Dog"
                            name="dog"
                            defaultChecked={petSitter.dog}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs='auto'>
                        <Form.Check
                            label="Cat"
                            name="cat"
                            defaultChecked={petSitter.cat}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs='auto'>
                        <Form.Check
                            label="Small Animal"
                            name="small_animal"
                            defaultChecked={petSitter.small_animal}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs='auto'>
                        <Form.Check
                            label="Reptile"
                            name="reptile"
                            defaultChecked={petSitter.reptile}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs='auto'>
                        <Form.Check
                            label="Bird"
                            name="bird"
                            defaultChecked={petSitter.bird}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>
                <Form.Label>Are you willing to administer pet medicine if necessary?</Form.Label>
                <Form.Check
                    label="Yes, I am."
                    name="medicine"
                    defaultChecked={petSitter.medicine}
                    onChange={handleChange}
                />
                <Row>
                    <Col xs='auto'>
                        <Form.Label>Hourly Rate:</Form.Label>
                        <Form.Control
                            type="number"
                            name="rate"
                            id="rate"
                            min="0"
                            step="0.50"
                            value={petSitter.rate}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col>
                        <Form.Label>Available Days:</Form.Label>
                        <Select
                            isMulti
                            defaultValue={availability}
                            name='availability'
                            className='basic-multi-select text-dark'
                            classNamePrefix='select'
                            components={animatedComponents}
                            closeMenuOnSelect={false}
                            options={dayOptions}
                            onChange={handleSelect}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs='auto'>
                        <Form.Label>Start Time:</Form.Label>
                        <Form.Control
                            type="time"
                            name="from_time"
                            id="from_time"
                            value={petSitter.from_time}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs='auto'>
                        <Form.Label>End Time:</Form.Label>
                        <Form.Control
                            type="time"
                            name="to_time"
                            id="to_time"
                            value={petSitter.to_time}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>

                <Form.Label>Biography / Additional Information:</Form.Label>
                <Form.Control
                    placeholder="Let us know more about you!"
                    name="bio"
                    id="bio"
                    value={petSitter.bio}
                    onChange={handleChange}
                    as="textarea"
                    rows={3}
                />
                <Button variant='outline-info' className='mt-3' type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default PetSitterForm