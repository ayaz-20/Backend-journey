const express = require('express')
const {followUserController,
    unfollowUserController,
statusUserController,
updateStatusUserController} = require('../controllers/user.controller')

const identifyUser = require('../middlewares/auth.middleware')

const userRouter = express.Router()
console.log(typeof followUserController);
console.log(typeof unfollowUserController);
console.log(typeof identifyUser);

userRouter.post("/follow/:username",identifyUser,followUserController)
userRouter.post("/unfollow/:username",identifyUser,unfollowUserController)
userRouter.get("/status/",identifyUser,statusUserController)
userRouter.patch("/update/:username",identifyUser,updateStatusUserController)


module.exports= userRouter