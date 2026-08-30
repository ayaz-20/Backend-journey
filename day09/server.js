// const { connect } = require('mongoose')
require('dotenv').config()

const app = require('./src/app')

const userModel = require('./src/models/user.models')

const connectDB = require('./src/config/database')

connectDB()



app.listen(3000,()=>{
    console.log('server is running on port 3000')
})