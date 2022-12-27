const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const authRoute = require('./routers/auth.js')
const postRoute = require('./routers/postRouter.js')
const commentRoute = require('./routers/commentRouter.js')
const privetRoute = require('./routers/privetRouter.js')

const app = express()
dotenv.config()

// Constatse
const PORT = process.env.PORT || 3003

// Middleware
app.use(cors())
app.use(fileUpload({
	createParentPath: true
}))
app.use(express.json())
app.use(express.static('uploads'))
app.use(express.static('icons'))
app.use(express.static('avatar'))

//Routers
//http://localhost:3002/api/auth'
app.use('/api/auth', authRoute)
//http://localhost:3002/api/posts'
app.use('/api/posts', postRoute)
//http://localhost:3002/api/comment'
app.use('/api/comment', commentRoute)
//http://localhost:3002/api/privet'
app.use('/api/privet', privetRoute)

app.listen(PORT, () => console.log(`Server started on ${PORT}`))


// app.listen(3003, () => console.log(`Server started on 3003`))