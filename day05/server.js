const app = require('./src/app');


const notes = []

app.post('/notes',(req,res)=>{
   
    notes.push(req.body);
   
    res.status(201).json({
        message: "Notes created successfully",
    })
})

app.get('/notes',(req,res)=>{
    res.status(200).json({
        message: "Notes fetched successfully",
        notes: notes
    })
})

app.delete('/notes/:index',(req,res)=>{
    delete notes[req.params.index];
    res.status(204).send("note deleted successfully");
})

app.patch('/notes/:index',(req,res)=>{
    notes[req.params.index].description = req.body.description;
    res.status(200).json({
        message: "Notes updated successfully",
        notes: notes
    })
})

app.listen(3000,()=>(console.log('Server is running on port 3000')));