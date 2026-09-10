const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('connnected to db')
    })
}

module.exports = connectDB