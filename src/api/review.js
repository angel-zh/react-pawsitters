import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE a review- token required
export const reviewCreate= (user, petsitterOwner, petownerId, reviewCreate) => {
    // console.log('user', user)
    // console.log('petsitter', petsitterOwner)
	const ownerId = { owner: user.id }
	const review = {...reviewCreate, ...ownerId, ...petsitterOwner, ...petownerId, ...review.Id}

	return axios({
		url: `${apiUrl}/reviews/${petsitterOwner}/`,
		method: 'POST',
        headers: {
			Authorization: `Token ${user.token}`,
		},
		data: { review: review }
	})
}

// INDEX reviews - no token
export const reviewIndex = (user) => {
    console.log(user.token)
	return axios({
		url: apiUrl + `/reviews/`,
		method: 'GET',
        headers: {
			Authorization: `Token ${user.token}`,
		},
	})
}

// UPDATE a review - token Required
export const reviewUpdate = (user, petsitterId, updatedReview) => {
	const ownerId = { owner: user._id }
	const review = {...updatedReview, ...ownerId}

	return axios({
		url: `${apiUrl}/reviews/${petsitterId}/${review.id}/`,
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
		url: `${apiUrl}/reviews/${petsitterId}/${reviewId}/`,
		method: 'DELETE',
		headers: {
			Authorization: `Token ${user.token}`,
		}
	})
}