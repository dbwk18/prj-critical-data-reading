import React, {useState, useEffect} from "react";

import axios from 'axios';
import { debounce } from "lodash";

import './Notepad.css'

function NotePad ( {requrl} ) {

  const [notesText, setNotesText] = useState("")

  useEffect(() => {
    console.log("notes",requrl)

    const useremail = JSON.parse(window.sessionStorage.getItem("user-email"))["name"]

    axios.get(`http://cda.hyunwoo.me/api/note?article_url=${requrl}&user_email=${useremail}`, 
        { 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                }
        }
        ).then( (response) => {
            console.log("getnotes", response.data)
            setNotesText(response.data.note)
    })

  }, [])
  


  const onSaveNotes = () => {
    const notes = document.getElementById("notes-value").value;
    const obj = { notes };
    setNotesText("")
  };

  const onChangeSave = debounce (() => {

    axios.put(`http://cda.hyunwoo.me/api/note`, 
        {
            "article_url": requrl, 
            "new_note": `${notesText}`, 
            "user_email": JSON.parse(window.sessionStorage.getItem("user-email"))["name"]
        },
        {
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            }
        }
        ).then( (res) => {
            console.log("notesave", res, res.data);
    })  
    
  }, 500);


  const onChangeValue = () => {
    const notes = document.getElementById("notes-value").value;
    setNotesText(notes);
  }


    return (
      <div className="note-pad">
        <div className="some-test">
          <div>
            <textarea
              rows="12"
              cols="25"
              placeholder="Write notes here"
              id="notes-value" 
              value={notesText}
              onChange={(e) => {onChangeValue(); onChangeSave();}}
              style={{resize: "both"}}
            />
            {/* <button className="save-button" onClick={this.onSaveNotes}>
              Save
            </button> */}
          </div>
        </div>
      </div>
    );
  
}

export default NotePad;
