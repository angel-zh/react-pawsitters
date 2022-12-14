import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE a booking - token required
export const bookingCreate = (user, petsitterOwner, petownerId, bookingCreate) => {
	const ownerId = { owner: user.id }
	const booking = {...bookingCreate, ...ownerId, ...petsitterOwner, ...petownerId}

	return axios({
		url: `${apiUrl}/bookings/`,
		method: 'POST',
		headers: {
			Authorization: `Token ${user.token}`,
		},
		data: { booking: booking }
	})
}

// INDEX bookings - token Required
export const bookingIndex = (user) => {
    // console.log(user.token)
	return axios({
		url: apiUrl + `/bookings/`,
		method: 'GET',
        headers: {
			Authorization: `Token ${user.token}`,
		},
	})
}

// UPDATE a booking - token Required
export const bookingUpdate = (user, updatedBooking) => {
	const ownerId = { owner: user.id }
	const booking = {...updatedBooking, ...ownerId }

	return axios({
		method: 'PATCH',
		url: `${apiUrl}/bookings/${booking.id}/`,
		headers: {
			Authorization: `Token ${user.token}`,
		},
		data: { booking: booking }
	})
}

// DELETE booking - token required
export const bookingDelete = (user, booking) => {
	console.log('THIS IS THE BOOKING FOR DELETE', booking)
	return axios({
		url: `${apiUrl}/bookings/${booking.id}/`,
		method: 'DELETE',
		headers: {
			Authorization: `Token ${user.token}`,
		}
	})
}