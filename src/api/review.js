import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE a review- token required
export const reviewCreate = (user, petsitterOwner, petownerId, reviewCreate) => {
    // console.log('user', user)
    console.log('review', reviewCreate)
	const ownerId = { owner: user.id }
	const review = {...reviewCreate, ...ownerId, ...petsitterOwner, ...petownerId}
	// does the s in petsiiter have to be capitalized?
	return axios({
		url: `${apiUrl}/reviews/`,
		// url: apiUrl + `/reviews/`,
		// url: `${apiUrl}/reviews/${petsitterOwner}/`,
		method: 'POST',
        headers: {
			Authorization: `Token ${user.token}`,
		},
		data: { review: review }
	})
}

// INDEX reviews - no token
export const reviewIndex = (user) => {
	
    // console.log(user.token)
	return axios({
		url: apiUrl + `/reviews/`,
		method: 'GET',
        headers: {
			Authorization: `Token ${user.token}`,
		},
	})
}

// INDEX reviews - no token
// export const reviewCards = (user, petsitterOwner, reviewIndex) => {
// 	// const reviews = {...reviewIndex, ...petsitterOwner}
//     // console.log(user.token)
// 	return axios({
// 		url: apiUrl + `/reviews/`,
// 		method: 'GET',
//         // headers: {
// 		// 	Authorization: `Token ${user.token}`,
// 		// },
// 		// data: {reviews: reviews}
// 	})
// }


// UPDATE a review - token Required
export const reviewUpdate = (user, petsitterOwner, updatedReview) => {
	const ownerId = { owner: user._id }
	const review = {...updatedReview, ...petsitterOwner, ...ownerId}

	return axios({
		// url: `${apiUrl}/reviews/${petsitterId}/${review.id}/`,
		url: `${apiUrl}/reviews/${review.id}/`,
		method: 'PATCH',
		headers: {
			Authorization: `Token ${user.token}`,
		},
		data: { review: review }
	})
}

// DELETE review - token required
export const reviewDelete = (user, petsitterId, reviewId) => {
	return axios({
		url: `${apiUrl}/reviews/${reviewId}/`,
		method: 'DELETE',
		headers: {
			Authorization: `Token ${user.token}`,
		}
	})
}
