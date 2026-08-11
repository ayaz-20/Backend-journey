const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect("mongodb+srv://alamayaz68_db_user:QkTFfdwFRWosH9n4@cohort.bmtgc94.mongodb.net/day-07")
    .then(()=>{
        console.log("Database connected successfully")
    })
};

module.exports = connectDB