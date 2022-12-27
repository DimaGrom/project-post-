const {Router} = require('express')
const checkAuth = require('../utils/checkAuth.js')
const {
	createRouter,
	getAllComments,
	getAvatar
} = require('../controller/commentController.js')

const router = new Router()

// Create comment
//http://localhost:3002/api/comment'
router.post('/', checkAuth, createRouter)
// Получение комментариев к определенному посту
router.post('/for', checkAuth, getAllComments)
router.post('/avatar', checkAuth, getAvatar)

module.exports = router