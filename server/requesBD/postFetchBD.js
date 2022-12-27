const axios = require('axios')
const fs = require('fs')
const postURL = 'http://localhost:5000/posts'
const path = require('path')

const savePost = async (newPost) => {
	const request = await axios.post('http://localhost:5000/posts', newPost)
} 

const getPosts = async () => {
	const request = await axios.get('http://localhost:5000/posts')
	const response = await request.data
	const posts = await response.sort((a, b) => b.datecreate - a.datecreate )
	return await posts
}

const getPopularPosts = async () => {
	const request = await axios.get('http://localhost:5000/posts')
	const response = await request.data
	const popularPosts = await response.sort((a, b) => b.views > a.views).slice(0, 5)
	return await popularPosts
}

const getPost = async (id) => {
	const request = await axios.get(`http://localhost:5000/posts/${id}`)
	const response = await request.data
	const {data} = await axios.put(`http://localhost:5000/posts/${id}`, {...response, views: response.views + 1})
	return await data
}

const myPosts = async (id) => {
	const request = await axios.get('http://localhost:5000/posts')
	const response = await request.data
	const posts = await response.filter(f => f.author === id).sort((a, b) => b.datecreate - a.datecreate)
	return await posts
}

const deletPostById = async (id) => {
	const request = await axios.get(`http://localhost:5000/posts/${id}`)
	const response = await request.data
	const fileName = await response.imageURL
	// Удаляем картинки из папки uploads
	if(await fileName) {
		fs.unlink(path.join('./uploads/' + fileName), (err) => console.log(err) )
	}
	await axios.delete(`http://localhost:5000/posts/${id}`)
}

const findePostById = async (id) => {
	const request = await axios.get(`http://localhost:5000/posts/${id}`)
	const response = await request.data
	return await response
}

const removeOldImage = async (id) => {
	const request = await axios.get(`http://localhost:5000/posts/${id}`)
	const response = await request.data
	const fileName = await response.imageURL
	if(await fileName) {
		fs.unlink(path.join('./uploads/' + fileName), (err) => console.log(err) )
	} 
}

const saveChangePost = async (post, id) => {
	await axios.put(`http://localhost:5000/posts/${id}`, post)
}

module.exports = {
	savePost,
	getPosts,
	getPopularPosts,
	getPost,
	myPosts,
	deletPostById,
	findePostById,
	removeOldImage,
	saveChangePost
}