import React from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

const PetSitterForm = (props) => {
    const { petSitter, handleChange, heading, handleSubmit, handleSelect, dayOptions, availability } = props
   
    const animatedComponents = makeAnimated()    
    return (
        <Container className="justify-content-center">
            <h3 className='mt-3'>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label>First Name:</Form.Label>
                <Form.Control
                    placeholder="First Name"
                    name="first_name"
                    id="first_name"
                    value={petSitter.first_name}
                    onChange={handleChange}
                />
                <Form.Label>Last Name:</Form.Label>
                <Form.Control
                    placeholder="Last Name"
                    name="last_name"
                    id="last_name"
                    value={petSitter.last_name}
                    onChange={handleChange}
                />
                <Form.Label>Age:</Form.Label>
                <Form.Control
                    type='number'
                    name="age"
                    id="age"
                    min='18'
                    value={petSitter.age}
                    onChange={handleChange}
                />
                <Form.Label>Please check the services you would like to provide:</Form.Label>
                <Form.Check
                    label="Dog walking"
                    name="dog_walking"
                    defaultChecked={petSitter.dog_walking}
                    onChange={handleChange}
                />
                <Form.Check
                    label="Pet sitting"
                    name="pet_sitting"
                    defaultChecked={petSitter.pet_sitting}
                    onChange={handleChange}
                />

                <Form.Label>Please check the types of pets you accept:</Form.Label>
                <Form.Group as={Col}>
                    <Form.Check
                        label="Dog"
                        name="dog"
                        defaultChecked={petSitter.dog}
                        onChange={handleChange}
                    />
                    <Form.Check
                        label="Cat"
                        name="cat"
                        defaultChecked={petSitter.cat}
                        onChange={handleChange}
                    />
                    <Form.Check
                        label="Small Animal"
                        name="small_animal"
                        defaultChecked={petSitter.small_animal}
                        onChange={handleChange}
                    />
                    <Form.Check
                        label="Reptile"
                        name="reptile"
                        defaultChecked={petSitter.reptile}
                        onChange={handleChange}
                    />
                    <Form.Check
                        label="Bird"
                        name="bird"
                        defaultChecked={petSitter.bird}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Label>Hourly Rate:</Form.Label>
                <Form.Control
                    type="number"
                    name="rate"
                    id="rate"
                    min="0"
                    step="0.01"
                    value={petSitter.rate}
                    onChange={handleChange}
                />
                <Form.Label>Available Days:</Form.Label>
                <Select 
                    isMulti
                    defaultValue={availability}
                    name='availability'
                    className='basic-multi-select'
                    classNamePrefix='select'
                    components={animatedComponents}
                    closeMenuOnSelect={false}
                    options={dayOptions} 
                    onChange={handleSelect}
                />
                <Form.Label>Start Time:</Form.Label>
                <Form.Control
                    type="time"
                    name="from_time"
                    id="from_time"
                    value={petSitter.from_time}
                    onChange={handleChange}
                />
                <Form.Label>End Time:</Form.Label>
                <Form.Control
                    type="time"
                    name="to_time"
                    id="to_time"
                    value={petSitter.to_time}
                    onChange={handleChange}
                />
                <Form.Label>Are you willing to administer pet medicine if necessary?</Form.Label>
                <Form.Check
                    label="Yes, I am."
                    name="medicine"
                    defaultChecked={petSitter.medicine}
                    onChange={handleChange}
                />

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
                <Button className='btn btn-success' type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default PetSitterForm