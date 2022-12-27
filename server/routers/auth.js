const { Router } = require('express')
const { 
	register,
	login,
	getMe
} = require('../controller/authController.js')
const checkAuth = require('../utils/checkAuth.js')

const router = new Router()

// Register
//http://localhost:3002/api/auth/register
router.post('/register', register)

// Login
//http://localhost:3002/api/auth/login
router.post('/login', login)

// Get me
//http://localhost:3002/api/auth/me
router.get('/me', checkAuth, getMe)

module.exports = router