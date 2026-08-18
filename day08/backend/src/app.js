const express = require('express');
const app = express();
const notemodel = require("./models/note.model")
const cors = require('cors');
const path = require('path');


app.use(cors());

app.use(express.json());

app.use(express.static('./public'))

app.post("/api/notes", async (req, res) => {

    const {title, description} = req.body;

    const newNote =await notemodel.create({title, description})

    res.status(201).json({
        message: "Note created successfully",
        newNote
    })
})

app.get("/api/notes", async (req,res)=>{
    const notes = await notemodel.find();
    res.status(200).json({
        message:"Notes fetched successfully",
        notes
    })
})

app.delete("/api/notes/:id", async (req,res)=>{
    const id = req.params.id;
    await notemodel.findByIdAndDelete(id);
    res.status(200).json({
        message:"Note deleted successfully"
    })

})

app.patch("/api/notes/:id",async (req,res)=>{
    const id =req.params.id;
    const {title,description} = req.body;
    await notemodel.findByIdAndUpdate(id,{title,description});
    res.status(200).json({
        message:"Note updated successfully"
    })
})

app.use('*name',(req,res)=>{
 res.sendFile(path.join(__dirname,"..",'/public/index.html',))
})

module.exports = app;