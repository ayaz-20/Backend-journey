
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







app.listen(3000, () => {
  console.log("Server is running on port 3000");
}  )
