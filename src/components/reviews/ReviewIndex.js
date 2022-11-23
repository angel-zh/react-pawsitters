import React, { useEffect, useState } from 'react' 
import { reviewIndex } from '../../api/review'

const ReviewIndex = ({ user, msgAlert, review }) => {

    const [allReviews, setAllReviews] = useState([])

    useEffect(() => {
        reviewIndex(user)
        .then(res => {
            console.log(res.data)
            setAllReviews(res.data.reviews)
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Index Reviews Failure' + error,
                variant: 'danger'
            })
        })
    }, [])

    const allReviewsJSX = allReviews.map(review => {
        return (
           
            <h1 >{review.comment}</h1>            
            
        )
    })

    return (
        <>
            {/* <h1 >Reviews: There are none yet</h1>     */}
            <ul>{allReviewsJSX}</ul>
        </>
    )
}

export default ReviewIndex