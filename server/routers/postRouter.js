const {Router} = require('express')
const checkAuth = require('../utils/checkAuth.js')
const {
	createPost,
	getAllPost,
	getPostById,
	getMyPosts,
	deletePost, 
	updatePost
} = require('../controller/postController')

const router = new Router()

// Создание поста
router.post('/', checkAuth,  createPost)

// Получение всех постов
router.get('/', getAllPost)

// Получение поста по id
router.get('/:id', getPostById)

// Получение всех моих постов
router.get('/user/me', checkAuth, getMyPosts)

// Удаление поста
router.delete('/:id', checkAuth, deletePost)

// Редактирование поста
//http://localhost:3002/api/posts/:id'
router.put('/:id', checkAuth, updatePost)

module.exports = router