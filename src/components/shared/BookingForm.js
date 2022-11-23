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
                <Form.Label>Start Date:</Form.Label>
                <Form.Control
                    type='date'
                    id="start_date"
                    value={booking.start_date}
                    onChange={handleChange}
                />
                <Form.Label>End Date:</Form.Label>
                <Form.Control
                    type='date'
                    id="start_date"
                    value={booking.start_date}
                    onChange={handleChange}
                />

                <Form.Label>Start Time:</Form.Label>
                <Form.Control
                    type='time'
                    id="start_time"
                    value={booking.start_time}
                    onChange={handleChange}
                />

                <Form.Label>End Time:</Form.Label>
                <Form.Control
                    type='time'
                    id="end_time"
                    value={booking.end_time}
                    onChange={handleChange}
                />

                {/* <hr class="bg-success border-2 border-top border-success" />
                <hr class="bg-success border-2 border-top border-success" /> */}
                <Button variant='success' type="submit">Submit</Button>

            </Form>
        </Container>
    )
}

export default BookingForm