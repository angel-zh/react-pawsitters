import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE a booking - token required
export const bookingCreate = (user, petsitterId, newBooking) => {
	const ownerId = { owner: user._id }
	const booking = {...newBooking, ...ownerId}

	return axios({
		url: `${apiUrl}/bookings/${petsitterId}/`,
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
export const bookingUpdate = (user, petsitterId, updatedBooking) => {
	const ownerId = { owner: user._id }
	const booking = {...updatedBooking, ...ownerId}

	return axios({
		url: `${apiUrl}/bookings/${petsitterId}/${booking.id}/`,
		method: 'PATCH',
		headers: {
			Authorization: `Token ${user.token}`,
		},
		data: { booking: booking }
	})
}

// DELETE booking - token required
export const bookingDelete = (user, petsitterId, bookingId) => {
	return axios({
		url: `${apiUrl}/bookings/${petsitterId}/${bookingId}/`,
		method: 'DELETE',
		headers: {
			Authorization: `Token ${user.token}`,
		}
	})
}