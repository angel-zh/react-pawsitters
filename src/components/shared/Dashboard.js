import React, { useEffect, useState } from 'react'
import { faLink, faBone, faAllergies } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { bookingIndex } from '../../api/booking'
import { reviewIndex } from '../../api/review'

const Dashboard = ({ user, msgAlert }) => {
    const petSitterLink = `/petsitters/${user.id}`
    const [allReviews, setAllReviews] = useState([])
    const [allBookings, setAllBookings] = useState([])
    // const [recentReview, setRecentReview] = useState([])

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
                console.log('Dashboard reviews', res.data)
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

    const allBookingsJSX = allBookings.map(booking => (
        <div> {booking.start_time} - {booking.end_time}</div>
    ))

    const allReviewsJSX = allReviews.map(review => (
        <div> {review.comment} {review.rating}</div>
    ))



    return (
        <div className='dashboard mt-5 container-fluid'>
            <h2 className='page-heading text-center'>My Dashboard</h2>

            <div className='row mx-5'>
                <div className='col-3 ms-5 db-div-0'>
                    <h5 className='container-fluid mb-3'><b>Account</b></h5>
                    <p className='text-center'>Logged in as {user.email}<br />
                        Member since {moment(user.createdAt).format("MMM Do YY")} ({moment(user.createdAt).startOf('day').fromNow()})</p>
                    <h5 className='mt-3 container-fluid mb-3'><b>My Links</b></h5>
                    <Link className='link' to='/petowners'><FontAwesomeIcon icon={faBone} size='md' className='icon' />View/Edit My Pet Owner Profile</Link> <br />
                    <Link className='link' to={petSitterLink}><FontAwesomeIcon icon={faBone} size='md' className='icon' />View/Edit My Pet Sitter Profile</Link> <br />
                    <Link className='link' to='/petsitters'><FontAwesomeIcon icon={faBone} size='md' className='icon' />Find Pet Sitters</Link><br />
                    <Link className='link' to='/change-password'><FontAwesomeIcon icon={faBone} size='md' className='icon' />Change My Password</Link>
                </div>
                <div className='col db-div-1'>
                    hello
                </div>
            </div>
            <div className='row mx-5 mt-3'>
                <div className='col db-div-2'>
                    <h5 className='container-fluid mb-3'><b>My Most Recent Review</b></h5>
                    {
                        allReviewsJSX.length > 0 ?
                            <div>{allReviewsJSX[allReviewsJSX.length - 1]}</div>
                            :
                            <p>No Reviews Yet</p>
                    }

                </div>
                <div className='col db-div-2'>
                    <h5 className='container-fluid mb-3'><b>My Most Recent Booking</b></h5>
                    {
                        allBookingsJSX.length > 0 ?
                            <div>{allBookingsJSX[allBookingsJSX.length - 1]}</div>
                            :
                            <p>No Bookings Yet</p>
                    }
                </div>
            </div>

        </div>
    )
}

export default Dashboard