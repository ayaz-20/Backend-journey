
const app = require("./src/app");

const notes =[];

/* 
POST /notes
*/

app.post("/notes",(req,res)=>{

    console.log(req.body);

    notes.push(req.body);

    console.log(notes);

    res.send("Note created successfully");
})

/* 
GET /notes
*/

app.get("/notes",(req,res)=>{
    res.send(notes);
})

/* 
DELETE /notes
params
*/

app.delete("/notes/:index",(req,res)=>{
 delete notes[req.params.index];

 res.send("Note deleted successfully");
})

/*
PATCH /notes
req.body = {
    description: "new description"
}
*/
app.patch("/notes/:index",(req,res)=>{
    const idx = req.params.index;
    notes[idx].description = req.body.description;
    res.send("Notes updated successfully");
})




app.listen(3000, () => {
  console.log("Server is running on port 3000");
}  )
