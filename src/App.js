import { useState } from 'react';
import './App.css';

const startNote = {
  content: '', author: ''
};

function App() {
  //States
  const [note, setNote] = useState(startNote);
  const [editNote, setEditNote] = useState(null);
  const [allNotes, setAllNotes] = useState([]);

  //Functions form inputs
  function onNoteValueChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      }
    });
  }
  function onEditNoteValueChange(event) {
    const { name, value } = event.target;
    setEditNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      }
    });
  }

  //Functions add, edit, delete
  function onNoteSubmit(event) {
    event.preventDefault();
    setAllNotes((prevAllNotes) => {
      const newNote = { ...note };
      newNote.id = Date.now().toString();
      return [newNote, ...prevAllNotes];
    });
    setNote(startNote);
  }

  function onEditNoteSubmit(event) {
    event.preventDefault();
    setAllNotes((prevAllNotes) => {
      return prevAllNotes.map((theNote) => {
        if(theNote.id !== editNote.id) return theNote;
        return editNote;
      });
    });
    setEditNote(null);
  }

  function onNoteDelete(noteId) {
    setAllNotes((prevAllNotes) => {
      return prevAllNotes.filter(theNote => theNote.id !== noteId);
    });
  }
  
  //Elements
  const noteElements = allNotes.map((theNote) => {
    return (
      <div key={theNote.id} className = "app-note">
        <p>{theNote.content}</p>
        <h5>{theNote.author}</h5>
        <p>
          <a onClick={() => {setEditNote(theNote)}}>Edit</a>
          <span>|</span>
          <a onClick={() => {onNoteDelete(theNote.id)}}>Delete</a>
        </p>
      </div>
    );
  });

  let editNoteElement = null;
  if (!!editNote) {
    editNoteElement = (
      <div className="app-edit-note">
        <form onSubmit={onEditNoteSubmit}>
        <p>
          <textarea 
            rows='3'
            placeholder='บันทึกข้อความในใจ'
            name='content'
            value={editNote.content}
            onChange={onEditNoteValueChange}
          />
        </p>
        <p>
          <input 
            type='text'
            placeholder='ลงชื่อผู้บันทึก'
            name='author'
            value={editNote.author}
            onChange={onEditNoteValueChange}
          />
        </p>
        <p>
          <button type='submit'>บันทึก</button>
        </p>
        </form>
      </div>
    )
  }

  return (
    <section className='app-section'>
      <div className='app-container'>
        <h3>My notes</h3>
        <form onSubmit={onNoteSubmit}>
        <p>
          <textarea 
            rows='3'
            placeholder='บันทึกข้อความในใจ'
            name='content'
            value={note.content}
            onChange={onNoteValueChange}
          />
        </p>
        <p>
          <input 
            type='text'
            placeholder='ลงชื่อผู้บันทึก'
            name='author'
            value={note.author}
            onChange={onNoteValueChange}
          />
        </p>
        <p>
          <button type='submit'>บันทึก</button>
        </p>
        </form>
        <div className='app-notes'>
          {noteElements}
        </div>
      </div>
      {editNoteElement}
    </section>
  );
}

export default App;
