const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const uniqid = require('uniqid')
const {
	checkUserInBD,
	saveNewUserInBD,
	chackNameAndPassword,
	userdate,
	findUserById
} = require('../requesBD/auth.js')

// Register
const register = async (req, res) => {
	try {
		const {username, password} = req.body
		if(username === '' && password === '') {
			return res.send({message: 'Имя и пороль не могут быть пустыми строками'})
		}
		const userUse = await checkUserInBD(username)
		if(userUse) {
			return res.send({
				message: 'Данное имя уже используется. Поробуйте друге имя.'
			})
		}
		// хешуруем пароль
		const salt = bcrypt.genSaltSync(10)
		const hash = bcrypt.hashSync(password, salt)
		const newUser = {
			id: uniqid(),
			name: username,
			password: hash,
			_password: password,
			createtAt: new Date(),
			updatedAt: Date.now()
		}
		await saveNewUserInBD(newUser)
		const token = jwt.sign(
			{
				id: newUser.id
			}, 
			process.env.JWT_SECRIT,
			{expiresIn: '30d'}
		)
		res.json({
			user: newUser,
			token,
			message: 'Регистрация прошла успешно!'
		})
	} catch(err) {
		console.log(err)
		res.json({message: 'Ошибка при создании пользователя.'})
	}
}

// Login User
const login = async (req, res) => {
	try {	
		const {username, password} = req.body
		// Проверяем username, password
		const chack = await chackNameAndPassword(username, password)
		// Если неверно возращаме сообщение "неверно"
		if(!chack) {
			return res.send({message: 'Неверное имя или пароль.'})
		}
		// Получаем данные пользователя
		const user = await userdate(username, password)
		// Заново создаем токен
		const token = jwt.sign(
			{
				id: user.id
			}, 
			process.env.JWT_SECRIT,
			{expiresIn: '30d'}
		)
		res.send({
			user,
			token,
			message: 'Добро пожаловать!',
		})
	} catch(err) {
		console.log(err)
	}

}

// Get me
const getMe = async (req, res) => {
	try {
		const user = await findUserById(req.userId)
		if(!user) {
			return res.json({message: 'Доступа нет'})
		}
		const token = jwt.sign(
			{
				id: user.id
			},
			process.env.JWT_SECRIT,
			{expiresIn: '30d'}
		)
		res.send({user, token})
	} catch(err) {
		res.json({message: 'Нет доступа'})
	}
}

module.exports = {
	register,
	login,
	getMe
}