import React from "react";
import './Notepad.css'

class NotePad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notesText: "",
      noteList: []
    };
  }

  onSaveNotes = () => {
    const notes = document.getElementById("notes-value").value;
    const obj = { notes };
    this.setState({
      notesText: "",
      noteList: this.state.noteList.concat(obj)
    });
    console.log("noteList", this.state.noteList);
  };

  onChangeValue = () => {
    const notes = document.getElementById("notes-value").value;
    this.setState({
      notesText: notes
    });
  };

//   onDeleteNote = index => {
//     const deleteNotes = this.state.noteList.filter(el, index);
//     this.setState({
//       noteList: deleteNotes
//     });
//   };

  render() {
    return (
      <div className="note-pad">
        <div className="some-test">
          <div>
            <textarea
              rows="12"
              cols="32"
              placeholder="Write notes here"
              id="notes-value"
              value={this.state.notesText}
              onChange={this.onChangeValue}
            />
            {/* <button className="save-button" onClick={this.onSaveNotes}>
              Save
            </button> */}
          </div>
        </div>
      </div>
    );
  }
}

export default NotePad;
