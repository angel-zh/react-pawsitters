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
            <p><b>Pet Sitter: </b> {review.pet_sitter}</p>
            <p><b>Pet Owner: </b> {review.pet_owner}</p>
            <p><b>Comment: </b> {review.comment}</p>
            <p><b>Rating: </b>
                <StarRating
                    value={review.rating}
                    style={{ fontSize: 17 }}
                />
            </p>
            <p className='d-flex justify-content-end'><i>Review created on {formatDate(review.created_at)} by {user.email}
            </i></p>
        </div>
    ))

    const allBookingsJSX = allBookings.map(booking => (
        <div>
            <p><b>Pet Sitter: </b> {booking.pet_sitter}</p>
            <p><b>Pet Owner: </b> {booking.pet_owner}</p>
            <p><b>Date: </b> {formatDate(booking.start_day)} to {formatDate(booking.end_day)}</p>
            <p><b>Note: </b> {booking.note}</p>
            <p className='d-flex justify-content-end'><i>Booking created on {formatDate(booking.created_at)} by {user.email}
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
        <div className='dashboard mt-5 container-fluid'>
            <h2 className='page-heading text-center'>My Dashboard</h2>

            <div className='row mx-5'>
                <div className='col-3 ms-5 db-div-0'>
                    <h5 className='container-fluid mb-3'><b>Account</b></h5>
                    <p className='text-center'>Logged in as {user.email}<br /></p>
                    <h5 className='mt-3 container-fluid mb-3'><b>My Links</b></h5>
                    <Link className='link' to='/petowners'><FontAwesomeIcon icon={faBone} size='md' className='icon' />My Pet Owner Profile</Link> <br />
                    <Link className='link' to={petSitterLink}><FontAwesomeIcon icon={faBone} size='md' className='icon' />My PawSitter Profile</Link> <br />
                    <Link className='link' to='/petsitters'><FontAwesomeIcon icon={faBone} size='md' className='icon' />Find PawSitters</Link><br />
                    <Link className='link' to='/change-password'><FontAwesomeIcon icon={faBone} size='md' className='icon' />Change My Password</Link>
                </div>
                {/* <div className='col db-div-1'> */}
                    <Calendar
                        tileClassName={tileClassName}
                    />
                {/* </div> */}
            </div>
            <div className='row mx-5 mt-3'>
                <div className='col db-div-2'>
                    <Link className='link float-end mt-2' to='/reviews'><FontAwesomeIcon icon={faStar} size='md' className='icon' />My Reviews</Link>
                    <h5 className='container-fluid mb-3 mt-2'><b>Recent Review I Posted</b></h5>

                    {
                        allReviewsJSX.length > 0 ?
                            <div className='recent-review'>{allReviewsJSX[allReviewsJSX.length - 1]}</div>
                            :
                            <div className='recent-review pb-2'>No Reviews Yet</div>
                    }
                </div>

                <div className='col db-div-2'>
                    <Link className='link float-end mt-2' to='/bookings'><FontAwesomeIcon icon={faCalendarAlt} size='md' className='icon' />My Bookings</Link>
                    <h5 className='container-fluid mb-3 mt-2'><b>Recent Booking I Requested</b></h5>
                    {
                        allBookingsJSX.length > 0 ?
                            <div className='recent-booking'>{allBookingsJSX[allBookingsJSX.length - 1]}</div>
                            :
                            <div className='recent-booking'>No Bookings Yet</div>
                    }
                </div>
            </div>

        </div >
    )
}

export default Dashboard