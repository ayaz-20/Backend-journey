const express = require('express');
const app = express();


const notes =[];

app.post('/notes',(req,res)=>{

    console.log(req.body)

    res.send('Notes added successfully')
})

 app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})