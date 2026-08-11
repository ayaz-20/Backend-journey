const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title:String,
    description:String,
}) //format

const notemodel = mongoose.model('notes',noteSchema) //for crud operations

module.exports = notemodel