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
export const bookingUpdate = (user, petSitter, updatedBooking, id) => {
	const ownerId = { owner: user.id }
	const booking = {...updatedBooking, ...ownerId, ...petSitter}
	// console.log(booking, 'THIS IS THE booking') // returns with full data, but doesn't help update anything
	// console.log(updatedBooking, 'UPDATEDBOOKING') // returns with full data, but doesn't help update anything
	// console.log(id, 'BOOKING ID') // returns undefined
	// include /${updatedBooking.id}/?
	return axios({
		method: 'PATCH',
		url: `${apiUrl}/bookings/` + id `/`,
		headers: {
			Authorization: `Token ${user.token}`,
		},
		data: { booking: booking }
	})
}

// DELETE booking - token required
export const bookingDelete = (user, petSitter, bookingId) => {
	return axios({
		url: `${apiUrl}/bookings/`,
		method: 'DELETE',
		headers: {
			Authorization: `Token ${user.token}`,
		}
	})
}