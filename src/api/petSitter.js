import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE a pet sitter profile - token require
export const petSitterCreate = (data, user) => {
	return axios({
		method: 'POST',
		url: apiUrl + '/petsitters/',
		data: {
			pet_sitter: data,
		},
		headers: {
			Authorization: `Token ${user.token}`,
		},
	})
}

// INDEX all petSitters - no token require
export const petSitterIndex = (user) => {
	return axios({
		method: 'GET',
		url: apiUrl + '/petsitters/',
	})
}

// SHOW a petSitter - no token require
export const petSitterShow = (user, id) => {
	return axios({
		method: 'GET',
		url: apiUrl + '/petsitters/' + id + '/',
        // headers: {
		// 	Authorization: `Token ${user.token}`,
		// },
	})
}

// UPDATE a petSitter - token require
export const petSitterUpdate = (data, user, id) => {
	return axios({
		method: 'PATCH',
		url: apiUrl + '/petsitters/' + id + '/',
		data: {
			petSitter: data,
		},
		headers: {
			Authorization: `Token ${user.token}`,
		},
	})
}

// DELETE a petSitter - token require
export const petSitterDelete = (user, id) => {
	return axios({
		method: 'DELETE',
		url: apiUrl + '/petsitters/' + id + '/',
		headers: {
			Authorization: `Token ${user.token}`,
		},
	})
}