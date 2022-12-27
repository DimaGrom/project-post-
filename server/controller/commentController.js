const uniqid = require('uniqid')
const {findePostById, saveChangePost} = require('../requesBD/postFetchBD.js')
const {findUserById} = require('../requesBD/auth.js')
const {
	saveComment,
	getComments,
	avatarGet
} = require('../requesBD/commentFetchBD.js')


// Create comment
const createRouter = async (req, res) => {
	try {
		const { id, comment} = req.body
		if(comment === '') {
			return res.send({message: 'Комментарий не может быть пустым'})
		}

		const user = await findUserById(req.userId)
		// console.log('user ', user)

		const newComment = {
			userName: user.name,
			adressComment: id,
			id: uniqid(),
			text: comment,
			authorID: req.userId,
			datecreate: Date.now(),
			datedate: new Date(),
      timestamps: true
		}

		// Получаю пост по id для изменения поля comments
		const post = await findePostById(id)
		// Добавляе 1 после добавления комментария
		post.comments += 1
		await saveChangePost(post, id)

		const comments = await saveComment(newComment)

		res.send({
			comment: newComment,
			comments,
			message: "Комент создан"
		})
	} catch(err) {
		console.log(err)
		res.send({message: 'Что-то пошло не так. createRouter commentController.js'})
	}
}

// Get All Comment
const getAllComments = async (req, res) => {
	try {
		const comments = await getComments(req.body.param)
		res.send({comments, message: 'Всё ок'})
	} catch(err) {
		console.log(err)
		res.send({message: 'Что-то пошло не так. createRouter commentController.js'})
	}
}

const getAvatar = async (req, res) => {
	try {
		const avatar = await avatarGet(req.body.param)
		res.send({avatar, comment: 'Ok'})
	} catch(err) {
		console.log(err)
	}
}

module.exports = {
	createRouter, 
	getAllComments,
	getAvatar
}