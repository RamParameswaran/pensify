import React, { useState, useEffect, Fragment } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Note from "./Note";
import NoteEditor from "./NoteEditor";

const App = () => {
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");

  const [notes, setNotes] = useState([]); // array of all notes (potentially infinite scroll (paginated) #TODO)
  const getNotes = () => {
    setLoad(false);
    const url = "api/notes/";
    axios
      .get(url)
      .then(res => {
        setNotes(res.data);
        setLoad(true);
      })
      .catch(err => {
        setError(err.message);
        setLoad(true);
      });
  };

  useEffect(() => {
    getNotes();
  }, []);

  const [currentNote, setCurrentNote] = useState(null); // dict containing current note info

  return (
    <Fragment>
      {/* Add new note form */}
      <NoteEditor currentNote={currentNote} setCurrentNote={setCurrentNote} />

      {/* List existing notes */}
      {notes.map((note, index) => (
        <Note
          note={note}
          index={index}
          key={note.id}
          setCurrentNote={setCurrentNote}
        />
      ))}
    </Fragment>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById("react-app"));
