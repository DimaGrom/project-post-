const jwt = require('jsonwebtoken')

const checkAuth = (req, res, next) => {
	const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
	if(token) {
		try {
			// расшифровываем тоукен
			const decoded = jwt.verify(token, process.env.JWT_SECRIT)
			// вшиваем id в req запрос
			req.userId = decoded.id
			next()
		} catch(err) {
			return res.send({message: 'Доступа нет!'})
		}
	} else {
		return res.send({message: 'Доступа нет!'})
	}
}

module.exports = checkAuth