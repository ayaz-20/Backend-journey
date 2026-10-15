const express = require('express')
const postController = require('../controllers/post.controller')


const postRouter = express.Router()

postRouter.post('/', postController.createpostController)
postRouter.get('/',postController.getPostController)

//api to return detail about specific post with the id.also check whether the post belong to the user that requested it
postRouter.get('/details/:postId',postController.getPostDetails)

module.exports = postRouter