const mongoose = require('mongoose')

function ConnectToDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("conneted to DB")
    })
}
mongoose.connection.once("open", () => {
    console.log("Database:", mongoose.connection.name);
});

module.exports= ConnectToDB