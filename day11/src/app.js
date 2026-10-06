const express = require("express")
const app = express()
const appRoutes = require('./routes/auth')
const cookieParser = require("cookie-parser")


app.use(express.json())

app.use(cookieParser());

app.use('/api/auth',appRoutes)


module.exports = app