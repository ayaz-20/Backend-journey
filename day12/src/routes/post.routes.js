const express = require('express')
const postController = require('../controllers/post.controller')


const postRouter = express.Router()

postRouter.post('/', postController.createpostController)
postRouter.get('/',postController.getPostController)

module.exports = postRouter