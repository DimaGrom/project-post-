const axios = require('axios')

const saveComment = async (param) => {
	const request = await axios.post('http://localhost:5000/comments', param)
	const response = await request.data
	return await response
}

const getComments = async (id) => {
	const request = await axios.get('http://localhost:5000/comments')
	const response = await request.data
	const comments = await response.filter(f => f.adressComment === id).sort((a, b) => b.datecreate - a.datecreate)
	return await comments
}

const avatarGet = async (id) => {
	const request = await axios.get(`http://localhost:5000/users/${id}`)
	const response = await request.data
	const avatar = await response
	if(await avatar.avatar) {
		return await avatar.avatar
	} else {
		return await ''
	}	
}

module.exports = {
	saveComment,
	getComments,
	avatarGet
}