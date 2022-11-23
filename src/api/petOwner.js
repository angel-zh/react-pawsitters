import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE a pet owner - token require
export const petOwnerCreate = (data, user) => {
	return axios({
		method: 'POST',
		url: apiUrl + '/petowners/',
		data: {
			pet_owner: data,
		},
		headers: {
			Authorization: `Token ${user.token}`,
		},
	})
}

// INDEX all pet owners - no token require
// export const petOwnerIndex = (user) => {
// 	return axios({
// 		method: 'GET',
// 		url: apiUrl + '/petowners/'
// 	})
// }

// SHOW a pet owner - no token require
export const petOwnerShow = (user, id) => {
	
	return axios({
		method: 'GET',
		url: apiUrl + '/petowners/' + user.id + "/",
		headers: {
			Authorization: `Token ${user.token}`,
		},
	})
}

// UPDATE a pet owner - token require
export const petOwnerUpdate = (data, user, id) => {
	return axios({
		method: 'PATCH',
		url: apiUrl + '/petowners/' + id + "/",
		data: {
			pet_owner: data,
		},
		headers: {
			Authorization: `Token ${user.token}`,
		},
	})
}

// DELETE a pet owner - token require
export const petOwnerDelete = (user, id) => {
	return axios({
		method: 'DELETE',
		url: apiUrl + '/petowners/' + id + "/",
		headers: {
			Authorization: `Token ${user.token}`,
		},
	})
}

//THIS IS TERRIBLE