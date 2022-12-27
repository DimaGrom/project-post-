const path = require('path')
const uniqid = require('uniqid')
const {findUserById} = require('../requesBD/auth.js')
const {
	savePost,
	getPosts,
	getPopularPosts,
	getPost,
	myPosts,
	deletPostById,
	findePostById,
	removeOldImage,
	saveChangePost
} = require('../requesBD/postFetchBD.js')

// Create post
const createPost = async (req, res) => {
	try {
		const {title, text} = req.body
		const user = await findUserById(req.userId)
			if(req.files) {
				const image = req.files.image
				const fileName = encodeURI(Date.now() + '_' + image.name)

				const newPostWithImage = {
					userName: user.name,
					id: uniqid(),
					title,
					text,
					views: 0,
					imageURL: fileName,
					author: req.userId,
					comments: 0,
					datecreate: Date.now(),
					datedate: new Date(),
		      timestamps: true
				}

				savePost(newPostWithImage)

				image.mv(path.join('./uploads/' + fileName))
				return res.send({
					message: 'Пост создан', 
					post: newPostWithImage
				})
			}

			const newPostWithoutImage = {
				userName: user.name,
				id: uniqid(),
				title,
				text,
				views: 0,
				imageURL: '',
				author: req.userId,
				comments: 0,
				datecreate: Date.now(),
				datedate: new Date(),
	      timestamps: true
			}

			savePost(newPostWithoutImage)
			return res.send({
				message: 'Пост создан', 
				post: newPostWithoutImage
			})	
	} catch(err) {
		console.log(err)
	}
}

// Получение всех постов
const getAllPost = async (req, res) => {
	try {
		const posts = await getPosts()
		const popularposts = await getPopularPosts()
		res.send({posts, popularposts})
	} catch(err) {
		console.log(err)
	}
}

// Получение поста по id
const getPostById = async (req, res) => {
	try {
		const post = await getPost(req.params.id)
		res.send(post)
	} catch(err) {
		console.log(err)
	}
} 

// Получени всех моих постов
const getMyPosts = async (req, res) => {
	try {
		const myposts = await myPosts(req.userId)
		const popularposts = await getPopularPosts()
		res.send({myposts, popularposts})
	} catch(err) {
		console.log(err)
	}
}

// Удаление поста
const deletePost = async (req, res) => {
	try {
		await deletPostById(req.params.id)
		res.send({
			message: 'Пост удален'
		})
	} catch(err) {
		console.log(err)
	}
}

// Редактирование поста
const updatePost = async (req, res) => {
	try {
		const post = await findePostById(req.body.id)

		// Проверяем не удалил вообще фотографию
		if(!req.body.oldImage) {
			// Если удалил то удаляем фотографию из папки uploads
			await removeOldImage(req.body.id)
			// И обязательно обнуляем post.imageURL. Иначе на страничке будет отображение пустого окошечка картинки, т.к. будте ссылаться  на имя уже не существющей картинки, т.е. картинка удалена, а имя из базы данных не удалено. 
			post.imageURL = ''
		}
		if(req.files) {
			let fileName = encodeURI(Date.now() + '_' + req.files.newImage.name)
			req.files.newImage.mv(path.join('./uploads/' + fileName))
			post.imageURL = fileName || ''
			// Удаляем страрую картинку из папки uploads
			await removeOldImage(req.body.id)
		}

		// console.log('req.files', req.body.oldImage)

		post.title = req.body.title
		post.text = req.body.text

		await saveChangePost(post, req.body.id)
		res.send(post)

	} catch(err) {
		console.log(err)
	}
}

module.exports = {
	createPost,
	getAllPost,
	getPostById,
	getMyPosts,
	deletePost,
	updatePost
}