import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'


function App() {

  const [notes, setnotes] = useState([
    {}
  ]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  function fetchNotes() {
    axios.get('https://backend-journey-v1f8.onrender.com/api/notes')
      .then((res) => {
        setnotes(res.data.notes);
      })
  }
  console.log("Hello from frontend");

  useEffect(() => {
    fetchNotes();
  }, [])

  function handleSubmit(e) {

    e.preventDefault()

    const { title, description } = e.target.elements

    axios.post("https://backend-journey-v1f8.onrender.com/api/notes", {
      title: title.value,
      description: description.value
    })
      .then(res => {

        fetchNotes()
      })

  }

  function handleDeleteNote(noteId) {
    console.log(noteId)
    axios.delete('https://backend-journey-v1f8.onrender.com/api/notes/' + noteId)
      .then(res => {
        console.log(res.data)
        fetchNotes()
      })
  }

  function handleUpdate(note) {
    console.log(note)
    setEditingNoteId(note._id)
    setNewTitle(note.title)
    setNewDescription(note.description)

  }

  function update() {
    axios.patch('https://backend-journey-v1f8.onrender.com/api/notes/' + editingNoteId, {
      title: newTitle,
      description: newDescription
    })
      .then(() => {
        setEditingNoteId(null)
        fetchNotes()
      })
      .catch((err) => {
        console.log(err)
      })
  }


  return (
    <>

      <form className='note-create-form' onSubmit={handleSubmit}>
        <input name='title' type="text" placeholder='Enter title' />
        <input name='description' type="text" placeholder='Enter description' />
        <button >Create Notes</button>
      </form>

      <div className="notes">
        {
          notes.map((note, key) => {

            return <div className="note" key={key}>
              {editingNoteId === note._id ? (
                <> <div className="upt_form">
                  <input value={newTitle} onChange={(e) => { setNewTitle(e.target.value) }} />
                  <input value={newDescription} onChange={(e) => { setNewDescription(e.target.value) }} />
                  <button onClick={() => {
                    update()
                  }}>Submit</button>
                </div>

                </>
              ) : (
                <>
                  <h1>{note.title}</h1>
                  <p>{note.description}</p>
                  <div className="btn"><button onClick={() => handleDeleteNote(note._id)} className='del'>Delete</button>
                    <button onClick={() => { handleUpdate(note) }} className='update'>Update</button></div>
                </>
              )
              }


            </div>
          }
          )}

      </div>
    </>
  )
}

export default App
