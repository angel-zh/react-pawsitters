import React, { useEffect, useState } from 'react'
import { faBone, faCalendarAlt, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { bookingIndex } from '../../api/booking'
import { reviewIndex } from '../../api/review'
import StarRating from './StarRating'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';


const Dashboard = ({ user, msgAlert }) => {
    const petSitterLink = `/petsitters/${user.id}`
    const [allReviews, setAllReviews] = useState([])
    const [allBookings, setAllBookings] = useState([])

    useEffect(() => {
        bookingIndex(user)
            .then(res => {
                console.log('Dashboard bookings', res.data)
                setAllBookings(res.data.bookings)
            })
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Index Failure: ' + error,
                    variant: 'danger'
                })
            })
        reviewIndex(user)
            .then(res => {
                // console.log('Dashboard reviews', res.data)
                setAllReviews(res.data.reviews)
            })
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Index Failure: ' + error,
                    variant: 'danger'
                })
            })
    }, [])

    const formatDate = date => { return moment(date).format("MMM Do YY") }

    const allReviewsJSX = allReviews.map(review => (
        <div>
            <p><b>Pet Sitter: </b> {review.pet_sitter.first_name} {review.pet_sitter.last_name}<br />
                <b>Comment: </b> {review.comment} <br />
                <b>Rating: </b>
                <StarRating
                    value={review.rating}
                    style={{ fontSize: 15 }}
                />
            </p>
            <p className='d-flex justify-content-end'><i>Posted on {formatDate(review.created_at)} by me
            </i></p>
        </div>
    ))

    let ownerBookings = allBookings.filter(booking => booking.owner === user.id)
    let recipientBookings = allBookings.filter(booking => booking.owner !== user.id)

    const ownerBookingsJSX = ownerBookings.map(booking => (
        <div className='recent-booking'>
            <p><b>For Pet Sitter: </b> {booking.pet_sitter}<br />
                <b>Date: </b> {formatDate(booking.start_day)} to {formatDate(booking.end_day)}</p>
            <p className='d-flex justify-content-end'><i>Requested on {formatDate(booking.created_at)} by me
            </i></p>
        </div>
    ))

    const recipientBookingsJSX = recipientBookings.map(booking => (
        <div className='recent-booking'>
            <p><b>From Pet Owner: </b> {booking.pet_owner} <br />
                <b>Date: </b> {formatDate(booking.start_day)} to {formatDate(booking.end_day)}<br /><b>Note: </b> {booking.note}</p>
            <p className='d-flex justify-content-end'><i>Received on {formatDate(booking.created_at)} by {booking.pet_owner}
            </i></p>
        </div>
    ))



    const getDatesInRange = (startDate, endDate) => {
        if (!startDate || !endDate) return []

        const dateArray = []
        const formattedCurrentDate = new Date(startDate)
        const formattedEndDate = new Date(endDate)
        while (formattedCurrentDate <= formattedEndDate) {
            dateArray.push(formattedCurrentDate.toISOString().split('T')[0]);
            formattedCurrentDate.setDate(formattedCurrentDate.getDate() + 1);
        }
        return dateArray
    }


    function tileClassName({ date, view }) {
        const allDates = []
        allBookings.forEach((booking) => {
            const dateRange = getDatesInRange(booking.start_day, booking.end_day)
            allDates.push(...dateRange)
        })
        if (view === 'month') {
            if (allDates.find(currentDate => currentDate === date.toISOString().split('T')[0])) {
                return 'highlight';
            }
        }
    }


    return (
        <div className='dashboard mt-3 container-fluid'>
            <h2 className='page-heading text-center'>My Dashboard</h2>
            <div className='row'>
                <div className='col-2 db-div-0'>
                    <h5 className='container-fluid mb-3'><b>Account</b></h5>
                    <p className='text-center'>Logged in as {user.email}<br /></p>
                    <h5 className='mt-3 container-fluid mb-3'><b>My Links</b></h5>
                    <Link className='link' to='/petowners'><FontAwesomeIcon icon={faBone} size='md' className='icon' />My Pet Owner Profile</Link> <br />
                    <Link className='link' to={petSitterLink}><FontAwesomeIcon icon={faBone} size='md' className='icon' />My PawSitter Profile</Link> <br />
                    <Link className='link' to='/petsitters'><FontAwesomeIcon icon={faBone} size='md' className='icon' />Find PawSitters</Link><br />
                    <Link className='link' to='/change-password'><FontAwesomeIcon icon={faBone} size='md' className='icon' />Change My Password</Link>
                </div>
                <div className='col db-div-1'>
                    <h5 className='container-fluid mb-3 mt-2'><Link to='/reviews' className='link'><FontAwesomeIcon icon={faStar} size='md' className='icon' /><b>Most Recent Review Made</b></Link></h5>
                    {
                        allReviewsJSX.length > 0 ?
                            <div className='recent-review'>
                                {allReviewsJSX[allReviewsJSX.length - 1]}
                            </div>
                            :
                            <div className='recent-review pb-2'>No Reviews Yet</div>
                    }
                </div>
                <Calendar
                    tileClassName={tileClassName}
                />
                

            </div>
            <div className='row mx-5 mt-3'>
                <div className='col db-div-2'>
                    <p className='float-end mt-2'>(as pet owner)</p>
                    <h5 className='container-fluid mb-3 mt-2'><Link to='/bookings' className='link'><FontAwesomeIcon icon={faCalendarAlt} size='md' className='icon' /><b>Bookings Requested</b></Link></h5>

                    {
                        ownerBookingsJSX.length > 0 ?
                            <div>
                                {ownerBookingsJSX}
                            </div>
                            :
                            <div className='recent-booking pb-2'>No Bookings Requested</div>
                    }

                </div>

                <div className='col db-div-2'>
                    <p className='float-end mt-2'>(as paw sitter)</p>
                    <h5 className='container-fluid mb-3 mt-2'><Link to='/bookings' className='link'><FontAwesomeIcon icon={faCalendarAlt} size='md' className='icon' /><b>Bookings Received</b></Link></h5>
                    {
                        recipientBookingsJSX.length > 0 ?
                            <div>
                                {recipientBookingsJSX}
                            </div>
                            :
                            <div className='recent-booking'>No Bookings Received</div>
                    }
                </div>
            </div>

        </div >
    )
}

export default Dashboard