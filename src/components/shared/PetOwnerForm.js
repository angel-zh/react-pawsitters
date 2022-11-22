import React from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'

const PetOwnerForm = (props) => {
    const { petOwner, handleChange, heading, handleSubmit } = props

    return (
        <Container className="justify-content-center rest-form" style={{ width: '48em', padding: '2rem' }} >
            <h3 className='mt-3'>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Pet Owner's First Name:</Form.Label>
                <Form.Control
                    placeholder="Owner's First Name"
                    name="First Name"
                    id="name"
                    value={petOwner.first_name}
                    onChange={handleChange}
                />
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label className='mt-2'>Pet Owner's Last Name:</Form.Label>
                        <Form.Control
                            placeholder="Owner's Last Name;"
                            name="last name"
                            id="last name"
                            value={petOwner.last_name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label className='mt-2'>Pet Type:</Form.Label>
                        <Form.Control
                            placeholder="Type of Pet"
                            name="Pet type"
                            id="type"
                            value={petOwner.pet_type}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Row>

                <Form.Group>
                    <Form.Label className='mt-2'>Pet's Name:</Form.Label>
                    <Form.Control
                        placeholder="What is your Pet's Name?"
                        name="Pet Name"
                        id="Pet Name"
                        value={petOwner.pet_name}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Row>
                
                </Row>
                <Button className='btn btn-light text-light mt-3' type="submit" style={{ backgroundColor: '#ba7a5f' }}>Submit</Button>

            </Form>
        </Container>
    )
}

export default PetOwnerForm