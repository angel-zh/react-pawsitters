import React from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'

const BookingForm = (props) => {
    const { booking, handleChange, handleSubmit, heading, petsitter } = props

    return (

        <Container className='justify-content-center booking-form'>
            <h3 className='mt-3'>{heading}</h3> 
            <Form onSubmit={handleSubmit}>

                <Form.Label>Request Note:</Form.Label>
                <Form.Control
                    placeholder='Please tell us the reason for your request.'
                    type='textbox'
                    as="textarea"
                    rows={3}
                    name='note'
                    id='note'
                    value={booking.note}
                    onChange={handleChange}
                />

                {/* Might use this later, but not right now. */}
                {/* <hr class="bg-success border-2 border-top border-success" /> */}

                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Start Date:</Form.Label>
                        <Form.Control
                            type='date'
                            name='start_day'
                            id='start_day'
                            value={booking.start_day}
                            onChange={handleChange}
                        />
                    </Form.Group>
                        <Form.Group as={Col}>
                        <Form.Label>End Date:</Form.Label>
                        <Form.Control
                            type='date'
                            name='end_day'
                            id='end_day'
                            value={booking.end_day}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Start Time:</Form.Label>
                        <Form.Control
                            type='time'
                            name='start_time'
                            id='start_time'
                            value={booking.start_time}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>End Time:</Form.Label>
                        <Form.Control
                            type='time'
                            name='end_time'
                            id='end_time'
                            value={booking.end_time}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Row>

                <Button variant='outline-info' className='mt-2' type="submit">Submit</Button>

            </Form>
        </Container>
    )
}

export default BookingForm