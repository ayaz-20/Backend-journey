const express = require('express')

const userModel = require("../models/user.models")

const jwt = require('jsonwebtoken')

const authRoutes = express.Router()


authRoutes.post('/register', async (req, res) => {
    const { name, email, password } = req.body

    const isUserExists = await userModel.findOne({ email })

    if (isUserExists) {
        return res.status(409).json({
            message: "User already exists"
        })
    }
    const user = await userModel.create({
        email, password, name
    })

    const token = jwt.sign({
        id:user._id,
        email:user.email
    },process.env.JWT_SECRET)

    res.status(201).json({
        message: "user created successfully",
        user,
        token
    })

})

module.exports = authRoutes