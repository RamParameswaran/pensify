import React, { useState, useEffect, Fragment } from "react";
import ReactDOM from "react-dom";

import { Editor, convertFromRaw, EditorState } from "draft-js";

const formatNoteTitle = title => {
  if (title === "") {
    return (
      <h5>
        <i>Untitled</i>
      </h5>
    );
  } else {
    return <h5>{title}</h5>;
  }
};

const TopicBlock = ({ group, setCurrentNote }) => {
  return (
    <Fragment>
      <div className="card">
        <div className="card-body topic-group">
          <h3>{group.topic}</h3>
          {/* Iterate through groups */}
          {group.notes.map(note => (
            <Fragment>
              {/* Create card element with title for the Topic Group */}
              <div
                className="card"
                onClick={() => {
                  setCurrentNote(note);
                }}
              >
                {formatNoteTitle(note.title)}
                <Editor
                  editorState={EditorState.createWithContent(
                    convertFromRaw(note.contentState)
                  )}
                  readOnly={true}
                />
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default TopicBlock;
