import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE a booking - token required
export const bookingCreate = (user, petSitter, newBooking) => {
	const ownerId = { owner: user._id }
	const booking = {...newBooking, ...ownerId}

	return axios({
		url: `${apiUrl}/bookings/${petSitter.owner}/`,
		method: 'POST',
		data: { booking: booking }
	})
}

// INDEX bookings - no token
export const bookingIndex = (user) => {
    console.log(user.token)
	return axios({
		url: apiUrl + `/bookings/`,
		method: 'GET',
        headers: {
			Authorization: `Token ${user.token}`,
		},
	})
}

// UPDATE a booking - token Required
export const bookingUpdate = (user, petSitter, updatedBooking) => {
	const ownerId = { owner: user._id }
	const booking = {...updatedBooking, ...ownerId}

	return axios({
		url: `${apiUrl}/bookings/${petSitter.owner}/${booking.id}/`,
		method: 'PATCH',
		headers: {
			Authorization: `Token ${user.token}`,
		},
		data: { booking: booking }
	})
}

// DELETE booking - token required
export const bookingDelete = (user, petSitter, bookingId) => {
	return axios({
		url: `${apiUrl}/bookings/${petSitter.owner}/${bookingId}/`,
		method: 'DELETE',
		headers: {
			Authorization: `Token ${user.token}`,
		}
	})
}