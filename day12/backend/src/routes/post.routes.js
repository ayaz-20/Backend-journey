const express = require('express')
const postController = require('../controllers/post.controller')
const identifyUser = require('../middlewares/auth.middleware')

const postRouter = express.Router()

postRouter.post('/',identifyUser,postController.createpostController)
postRouter.get('/',identifyUser,postController.getPostController)

//api to return detail about specific post with the id.also check whether the post belong to the user that requested it
postRouter.get('/details/:postId',identifyUser,postController.getPostDetails)

postRouter.post('/likes/:postId',identifyUser,postController.likePostController)

module.exports = postRouter
