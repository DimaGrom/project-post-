const axios = require('axios')

// Проверяем пользователя по базе данных
const checkUserInBD = async (username) => {
	const request = await axios.get('http://localhost:5000/users')
	const response = await request.data
	const checkUser = await response.findIndex(index => index.name === username)
	if(checkUser === -1) {
		return false
	} else {
		return true
	}
}

// Сохраняем нового пользователя
const saveNewUserInBD = async (newUser) => {
	await axios.post('http://localhost:5000/users', newUser)
}

const chackNameAndPassword = async (username, password) => {
	const request = await axios.get('http://localhost:5000/users')
	const response = await request.data
	const checkUser = await response.findIndex(index => index.name=== username && index._password === password)
	if(checkUser === -1) {
		return false
	} else {
		return true
	}
}

const userdate = async (username, password) => {
	const {data} = await axios.get('http://localhost:5000/users')
	const user = await data.find(item => item.name=== username && item._password === password)
	return user
}

const findUserById = async (id) => {
	const request = await axios.get('http://localhost:5000/users')
	const response = await request.data
	const user = await response.find(item => item.id === id)
	return await user
}

const findUser = async (id) => {
	const request = await axios.get(`http://localhost:5000/users/${id}`)
	const response = await request.data
	return await response
}

const saveAvatar = async (avatar, id) => {
	await axios.put(`http://localhost:5000/users/${id}`, avatar)
}


module.exports = {
	checkUserInBD,
	saveNewUserInBD,
	chackNameAndPassword,
	userdate,
	findUserById,
	findUser,
	saveAvatar
}