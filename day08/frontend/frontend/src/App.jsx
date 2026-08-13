import { useState } from 'react'
import axios from 'axios'


function App() {

  const [notes, setnotes] = useState([
    {
      title: "This is my first note",
      description: "This is my first note description"
    },
    {
      title: "This is my second note",
      description: "This is my second note description"
    },
    {
      title: "This is my third note",
      description: "This is my third note description"
    },
  ]);

  axios.get('http://localhost:3000/api/notes')
  .then((res)=>{
   setNotes(res.data.notes);
  }
  )

  return (
    <> <div className="notes">
      {
       notes.map((note) => {
          
         return <div className="note">
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
