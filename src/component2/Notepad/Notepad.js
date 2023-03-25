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
            <div className="description">
                기사에 대한 관점이 담긴 보충자료를 
                <br/>
                각 1-2문장씩 bullet point 형식으로 
                <br/>
                작성해주세요!
                <br/>
                * 기사 내 인용 부분 및 
                <br/>
                외부 출처도 함께 적어주세요
            </div>
          <div>
            <textarea
              rows="20"
              cols="35"
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
