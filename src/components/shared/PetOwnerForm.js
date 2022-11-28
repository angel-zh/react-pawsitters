import React from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
const PetOwnerForm = (props) => {
    const { petOwner, handleChange, heading, handleSubmit, handleSelect } = props
    const animatedComponents = makeAnimated() 
    return (
        <Container className= "justify-content-center rest-form" style={{ width: '48em', padding: '2rem', backgroundColor: '#56596e' }} >
            <h3 className='mt-3'>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Pet Owner's First Name:</Form.Label>
                <Form.Control
                    placeholder="Owner's First Name"
                    required= "true"
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
                            required= "true"
                            name="last_name"
                            id="last_name"
                            value={petOwner.last_name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    
                    <Form.Label className='mt-2'>Pet Type:</Form.Label>
                        <Col sm={4}>
                        <Form.Select
                            aria-label="Type of Pet"
                            required= "true"
                            name="pet_type"
                            id="pet_type"
                            value={petOwner.pet_type}
                            onChange={handleChange}
                        >
                        <option>Select an option</option>
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                        <option value="Small Animal">Small Animal</option>
                        <option value="Reptile">Reptile</option>
                        <option value="Bird">Bird</option>
                        
                        </Form.Select>
                    </Col>
                </Row>

                <Form.Group>
                    <Form.Label className='mt-2'>Pet's Name:</Form.Label>
                    <Form.Control
                        placeholder="What is your Pet's Name?"
                        required= "true"
                        name="pet_name"
                        id="pet_name"
                        value={petOwner.pet_name}
                        onChange={handleChange}
                    />
                </Form.Group>

                {/* <Form.Group>
                    <Form.Label className='mt-2'>Images:</Form.Label>
                    <Form.Control
                        placeholder="Image Link"
                        name=""
                        id=""
                        value={petOwner.images}
                        onChange={handleChange}
                    />
                </Form.Group> */}

                <Row>
                
                </Row>
                <Button className='btn btn-light text-light mt-3' type="submit" style={{ backgroundColor: '#ba7a5f' }}>Submit</Button>

            </Form>
        </Container>
    )
}

export default PetOwnerForm