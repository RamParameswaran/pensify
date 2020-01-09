import React, { useState, Fragment } from "react";
import axios from "axios";

import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  getDefaultKeyBinding,
  KeyBindingUtil
} from "draft-js";

const generateUUID = () => {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
};

class NoteEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: generateUUID(),
      topic: "",
      title: "",
      tags: "",
      editorState: EditorState.createEmpty()
    };

    this.postNote = this.postNote.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.toggleBlockType = this.toggleBlockType.bind(this);
    this.keyBindingFunction = this.keyBindingFunction.bind(this);
  }

  componentDidUpdate = prevProps => {
    if (prevProps.currentNote !== this.props.currentNote) {
      if (this.props.currentNote === null) {
        this.setState({
          topic: "",
          title: "",
          tags: "",
          uuid: generateUUID(),
          editorState: EditorState.createEmpty()
        });
      } else {
        const storedState = convertFromRaw(this.props.currentNote.contentState);

        this.setState({
          topic: this.props.currentNote.topic,
          title: this.props.currentNote.title,
          tags: this.props.currentNote.tags,
          uuid: this.props.currentNote.uuid,
          editorState: EditorState.createWithContent(storedState)
        });
      }
    }
  };

  postNote() {
    const formData = new FormData();
    formData.append("uuid", this.state.uuid);
    formData.append("topic", this.state.topic);
    formData.append("title", this.state.title);
    formData.append("tags", this.state.tags);
    formData.append(
      "contentState",
      JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
    );
    formData.append(
      "plain_text",
      this.state.editorState.getCurrentContent().getPlainText("\u0001")
    );

    const url = "api/notes/";

    if (
      this.state.topic !== "" ||
      this.state.title !== "" ||
      this.state.editorState.getCurrentContent().hasText()
    ) {
      axios.post(url, formData);
    }
  }

  handleFieldChange(e) {
    this.setState({ [e.target.name]: e.target.value });

    var duration = 1000;
    clearTimeout(this.inputTimer);
    this.inputTimer = setTimeout(() => {
      this.postNote();
    }, duration);
  }

  onEditorStateChange(editorState) {
    this.setState({ editorState });

    var duration = 1000;
    clearTimeout(this.inputTimer);
    this.inputTimer = setTimeout(() => {
      this.postNote();
    }, duration);
  }

  submitNote = e => {
    e.preventDefault();
    this.postNote();

    this.setState({
      topic: "",
      title: "",
      tags: "",
      uuid: generateUUID(),
      editorState: EditorState.createEmpty()
    });

    this.props.setCurrentNote(null);
  };

  keyBindingFunction = event => {
    if (
      KeyBindingUtil.hasCommandModifier(event) &&
      event.shiftKey &&
      event.key === "*"
    ) {
      return "unordered-list";
    }

    if (
      KeyBindingUtil.hasCommandModifier(event) &&
      event.shiftKey &&
      event.key === "("
    ) {
      return "blockquote";
    }

    return getDefaultKeyBinding(event);
  };

  toggleInlineStyle(event) {
    event.preventDefault();
    let style = event.currentTarget.getAttribute("data-style");
    this.setState({
      editorState: RichUtils.toggleInlineStyle(this.state.editorState, style)
    });
  }

  toggleBlockType(event) {
    event.preventDefault();

    let block = event.currentTarget.getAttribute("data-block");
    this.setState({
      editorState: RichUtils.toggleBlockType(this.state.editorState, block)
    });
  }

  renderInlineStyleButton(value, style) {
    const currentInlineStyle = this.state.editorState.getCurrentInlineStyle();
    let className = "";
    if (currentInlineStyle.has(style)) {
      className = "active";
    }

    return (
      <input
        type="button"
        key={style}
        value={value}
        className={`btn btn-primary ${className}`}
        data-style={style}
        onMouseDown={this.toggleInlineStyle}
      />
    );
  }

  renderBlockButton(value, block) {
    const currentBlockType = RichUtils.getCurrentBlockType(
      this.state.editorState
    );
    let className = "";
    if (currentBlockType === block) {
      className = "active";
    }

    return (
      <input
        type="button"
        key={block}
        value={value}
        className={`btn btn-primary ${className}`}
        data-block={block}
        onMouseDown={this.toggleBlockType}
      />
    );
  }

  handleKeyCommand(command) {
    // inline formatting key commands handles bold, italic, code, underline
    var editorState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command
    );

    if (!editorState && command === "strikethrough") {
      editorState = RichUtils.toggleInlineStyle(
        this.state.editorState,
        "STRIKETHROUGH"
      );
    }

    if (!editorState && command === "blockquote") {
      editorState = RichUtils.toggleBlockType(
        this.state.editorState,
        "blockquote"
      );
    }

    if (!editorState && command === "ordered-list") {
      editorState = RichUtils.toggleBlockType(
        this.state.editorState,
        "ordered-list-item"
      );
    }

    if (!editorState && command === "unordered-list") {
      editorState = RichUtils.toggleBlockType(
        this.state.editorState,
        "unordered-list-item"
      );
    }

    if (editorState) {
      this.setState({ editorState });
      return "handled";
    }

    return "not-handled";
  }

  render() {
    const inlineStyleButtons = [
      {
        value: "B",
        style: "BOLD"
      },

      {
        value: "I",
        style: "ITALIC"
      },

      {
        value: "U",
        style: "UNDERLINE"
      },

      {
        value: "Strike",
        style: "STRIKETHROUGH"
      },

      {
        value: "#",
        style: "CODE"
      }
    ];

    const blockTypeButtons = [
      {
        value: "H1",
        block: "header-one"
      },

      {
        value: "H2",
        block: "header-two"
      },

      {
        value: "H3",
        block: "header-three"
      },

      {
        value: '" "',
        block: "blockquote"
      },

      {
        value: "UL",
        block: "unordered-list-item"
      },

      {
        value: "OL",
        block: "ordered-list-item"
      }
    ];

    return (
      <Fragment>
        <div
          id={this.props.currentNote ? "blackout" : ""}
          onClick={this.props.setCurrentNote.bind(this, null)}
        ></div>
        <div
          className={this.props.currentNote ? "note-form overlay" : "note-form"}
        >
          <div id="topic">
            <input
              type="text"
              placeholder="Topic"
              value={this.state.topic}
              name="topic"
              onChange={this.handleFieldChange}
            />
          </div>

          <div id="title">
            <input
              type="text"
              placeholder="Note title"
              value={this.state.title}
              name="title"
              onChange={this.handleFieldChange}
            />
          </div>

          <div id="note">
            {inlineStyleButtons.map(button => {
              return this.renderInlineStyleButton(button.value, button.style);
            })}
            {blockTypeButtons.map(button => {
              return this.renderBlockButton(button.value, button.block);
            })}

            <div className="draft-editor-wrapper">
              <Editor
                editorState={this.state.editorState}
                onChange={this.onEditorStateChange}
                handleKeyCommand={this.handleKeyCommand}
                keyBindingFn={this.keyBindingFunction}
              />
            </div>
          </div>
          <button className="btn btn-primary" onClick={this.submitNote}>
            Save
          </button>
          {this.props.currentNote !== null ? (
            <button
              className="btn btn-primary"
              onClick={() => {
                this.props.setCurrentNote(null);
              }}
            >
              Close
            </button>
          ) : (
            ""
          )}
        </div>
      </Fragment>
    );
  }
}

export default NoteEditor;
