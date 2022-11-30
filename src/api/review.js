import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE a review- token required
export const reviewCreate = (user, petsitterOwner, petownerId, reviewCreate) => {

    console.log('review', reviewCreate)
	const ownerId = { owner: user.id }
	const review = {...reviewCreate, ...ownerId, ...petsitterOwner, ...petownerId}

	return axios({
		url: `${apiUrl}/reviews/`,
		method: 'POST',
        headers: {
			Authorization: `Token ${user.token}`,
		},
		data: { review: review }
	})
}

// INDEX reviews - no token
export const reviewIndex = (user) => {

	return axios({
		url: apiUrl + `/reviews/`,
		method: 'GET',
        headers: {
			Authorization: `Token ${user.token}`,
		},
	})
}

// UPDATE a review - token Required
export const reviewUpdate = (user, petsitterOwner, updatedReview) => {
	const ownerId = { owner: user._id }
	const review = {...updatedReview, ...petsitterOwner, ...ownerId}

	return axios({
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
