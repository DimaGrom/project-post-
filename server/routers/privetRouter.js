const {Router} = require('express')
const {createAvatar} = require('../controller/prevetController.js')
const checkAuth = require('../utils/checkAuth.js')

const router = new Router()

// Создаем аватра пользователя
//http://localhost:3002/api/privet'
router.post('/', checkAuth, createAvatar)
	
	 		

module.exports = router