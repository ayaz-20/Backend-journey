import { useState } from 'react'
import {useEffect} from 'react'
import axios from 'axios'


function App() {

  const [notes, setnotes] = useState([
    {}
  ]);

  console.log("Hello from frontend");

 useEffect(() => {
  axios.get('http://localhost:3000/api/notes')
  .then((res)=>{
   setnotes(res.data.notes);
  })
}, [])

  

  return (
    <> <div className="notes">
      {
       notes.map((note,key) => {
          
         return <div className="note" key={key}>
            <h1>{note.title}</h1>
            <p>{note.description}</p>
          </div>
        }
      )}

    </div>
    </>
  )
}

export default App
