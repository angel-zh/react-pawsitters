import React from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'

const BookingForm = (props) => {
    const { booking, handleChange, handleSubmit, heading, petsitter } = props

    return (

        <Container className="justify-content-center">
            <h3 className='mt-3'>{heading}</h3> 
            <Form onSubmit={handleSubmit}>
                <Form.Label>Request Note:</Form.Label>
                <Form.Control
                    placeholder="A sentence or two about why you need a petsitter."
                    type='textbox'
                    id="textbox"
                    value={booking.pet_sitter_name}
                    onChange={handleChange}
                />
                {/* <Form.Label className='mt-2'>Rating:</Form.Label>
                    <Col sm={4}>
                        <Form.Select
                            aria-label="rating"
                            name="rating"
                            value={booking.rating}
                            onChange={handleChange}
                        >
                            <option>Select an option</option>
                            <option value="5">5 - Excellent</option>
                            <option value="4">4 - Great</option>
                            <option value="3">3 - Average</option>
                            <option value="2">2 - Bad</option>
                            <option value="1">1 - Terrible</option>
                        </Form.Select>
                    </Col> */}
                {/* <hr class="bg-success border-2 border-top border-success" />
                <hr class="bg-success border-2 border-top border-success" /> */}
                <Button variant='success' type="submit">Submit</Button>

            </Form>
        </Container>
    )
}

export default BookingForm