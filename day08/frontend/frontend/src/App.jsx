import { useState } from 'react'
import {useEffect} from 'react'
import axios from 'axios'


function App() {

  const [notes, setnotes] = useState([
    {}
  ]);
function fetchNotes(){
axios.get('http://localhost:3000/api/notes')
  .then((res)=>{
   setnotes(res.data.notes);
  })
}
  console.log("Hello from frontend");

 useEffect(() => {
  fetchNotes();
}, [])

function handleSubmit(e){
 
  e.preventDefault()

 const {title,description} = e.target.elements

 axios.post("http://localhost:3000/api/notes",{
  title:title.value,
  description:description.value
 })
 .then(res=>{
  
  fetchNotes()
 })

}

function handleDeleteNote(noteId){
  console.log(noteId)
  axios.delete('http://localhost:3000/api/notes/'+noteId)
  .then(res=>{
    console.log(res.data)
    fetchNotes()
  })
}

  return (
    <> 
    
    <form className='note-create-form' onSubmit={handleSubmit}>
       <input name='title' type="text" placeholder='Enter title'/>
       <input name='description' type="text" placeholder='Enter description' />
       <button >Create Notes</button>
    </form>
    
    <div className="notes">
      {
       notes.map((note,key) => {
          
         return <div className="note" key={key}>
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <button onClick={()=>handleDeleteNote(note._id)}>Delete</button>
          </div>
        }
      )}

    </div>
    </>
  )
}

export default App
