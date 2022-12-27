const axios = require('axios')
const path = require('path')
const {findUser, saveAvatar} = require('../requesBD/auth.js')


const createAvatar = async (req, res) => {
	try {
		const id = req.userId
		const user = await findUser(id)
		if(req.files) {
			const avatar = req.files.avatar
			const avatarName = encodeURI(Date.now() + '_' + avatar.name)
			avatar.mv(path.join('./avatar/' + avatarName))
			user.avatar = avatarName
			await saveAvatar(user, id)
		}
	} catch(err) {
		console.log(err)
	}
}

module.exports = {
	createAvatar
}