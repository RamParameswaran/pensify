import _ from "lodash";

import React, { useState, useEffect, Fragment } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import TopicBlock from "./Note";
import NoteEditor from "./NoteEditor";

function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach(item => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

const App = () => {
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");

  const [notes, setNotes] = useState([]); // array of all notes (potentially infinite scroll (paginated) #TODO)

  // Group notes by Topic - result is an array of dicts [ {topic: "abc", notes: [item1, item2, ...]} , {...}]
  var notes_grouped = [];
  groupBy(notes, note => note.topic).forEach((k, v, m) =>
    notes_grouped.push({
      topic: v,
      notes: k.sort(function(a, b) {
        // sort each grouped list by the 'order' field
        return a.order - b.order;
      })
    })
  );

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
    // Get notes on initial render
    getNotes();
  }, []);

  const [currentNote, setCurrentNote] = useState(null); // dict containing current note info

  return (
    <Fragment>
      {/* Add new note form */}
      <NoteEditor
        getNotes={getNotes}
        setNotes={setNotes}
        currentNote={currentNote}
        setCurrentNote={setCurrentNote}
      />

      {/* List existing notes */}
      {notes_grouped.map((group, index) => (
        <TopicBlock
          group={group}
          index={index}
          key={index}
          setCurrentNote={setCurrentNote}
        />
      ))}

      {/* {notes.map((note, index) => (
        <Note
          note={note}
          index={index}
          key={note.id}
          setCurrentNote={setCurrentNote}
        />
      ))} */}
    </Fragment>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById("react-app"));
