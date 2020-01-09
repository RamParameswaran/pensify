import React, { useState, useEffect, Fragment } from "react";
import ReactDOM from "react-dom";

import { Editor, convertFromRaw, EditorState } from "draft-js";

const Note = ({ note, setCurrentNote }) => {
  const storedState = convertFromRaw(note.contentState);

  return (
    <Fragment>
      <div
        className="card"
        onClick={() => {
          setCurrentNote(note);
        }}
      >
        <div className="card-body">
          <h3>{note.topic}</h3>
          <h5>{note.title}</h5>
          <Editor
            editorState={EditorState.createWithContent(storedState)}
            readOnly={true}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Note;
