const { default: mongoose } = require('mongoose')
const userModel = require('../model/user.model')
const express = require('express')
const crypto = require('crypto')
const authRoutes = express.Router()
const jwt = require('jsonwebtoken')





authRoutes.post('/register', async (req, res) => {

    const { name, email, password } = req.body

    const isUserAlreadyExist = await userModel.findOne({ email })

    if (isUserAlreadyExist) {
        return res.status(409).json({
            message: "user already exist"
        })
    }

    const user = await userModel.create({
        name,
        email,
        password: crypto.createHash('sha256').update(password).digest('hex')
    })

    const token = jwt.sign(
        { id: user._id }
        , process.env.JWT_SECRET, { expiresIn: "1hr" })

    res.cookie("token", token)

    res.status(201).json({
        message: "user registered succesfully",
        user: {
            name: user.name,
            email: user.email,
        }

    })

})


authRoutes.get('/get-me', async (req, res) => {

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET)

    const user = await userModel.findById(decode.id)

    res.json({
        name: user.name,
        email: user.email
    })
})

authRoutes.post('/login', async (req, res) => {
    const { email, password } = req.body

    const checkUser = await userModel.findOne({ email })

    if (!checkUser) {
        return res.status(404).json({
            message: "user not found"
        })
    }
const hash = crypto.createHash('sha256').update(password).digest('hex')
    if (checkUser.password !== hash ) {

        return res.status(401).json({
            message: "password is incorrect",

        })

    }

    const token = jwt.sign({
        id: checkUser._id
    }, process.env.JWT_SECRET, { expiresIn: "1hr" })

    res.cookie("token", token)

    res.status(200).json({
        message: "welcome",

    })
}
)

module.exports = authRoutes
