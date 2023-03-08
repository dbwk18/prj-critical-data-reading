import React from "react"
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

import searchIcon from '../../images/icons/search.svg'
import closeIcon from '../../images/icons/buttonX.svg'
import checkIcon from '../../images/icons/checkIcon.svg'
import text_req from '../../data/article_extract_test_req.json'

import 'react-toastify/dist/ReactToastify.css';


function SearchBox({offsetX, offsetY, defaultInput, setSearchBox, setTooltip, newrefSentence, update, setUpdate, setToastStatus}) {

    const [searchStatus, setSearchStatus] = useState(false); //search button click
    const [selectIdx, setSelectIdx] = useState(null);
    
    const [generatePart, setGeneratePart] = useState(defaultInput);

    const outsideRef = useRef(null);


    useEffect(()=> {
        setSearchStatus(false);
        setSelectIdx(null);
        setTooltip(false);
    }, [defaultInput])


    useEffect(() => {
        function handleClickOutside(event) {
          if (outsideRef.current && !outsideRef.current.contains(event.target)) {
            setSearchBox(false);
          }
        }
        document.addEventListener("click", handleClickOutside);
        
        return () => {
          document.removeEventListener("click", handleClickOutside);
        };
      }, [outsideRef]);


    console.log("trace default", defaultInput, newrefSentence)

    function handleChange(e) {
        console.log('handle change', e.target.value)
        setGeneratePart(e.target.value)
    }

    function createReference() {
        setSearchStatus(true); 
        setTooltip(false);
        
        const req_input = {
            "article_url": `${text_req.url}`, 
            "sentence": `${newrefSentence}`, 
            "sentence_part": `${defaultInput}`, 
            "sentence_generation_part": `${generatePart}`,
            "user_email": `${JSON.parse(window.sessionStorage.getItem("user-email"))["name"]}`
         }

        const new_reference = axios.post(`http://internal.kixlab.org:7887/create_reference`,
        req_input,
        {
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            }
        }
        ).then( (res) => {
            console.log(res.data)
            if (res.data.gpt_data_name == '?') {setToastStatus('fail');}
            else {setToastStatus(res.data.gpt_data_name);}

            setUpdate(update+=1);
            setSearchBox(false);
        })  
        
    }

    return (
        <React.Fragment>
            <div 
                ref={outsideRef}
                style={{
                    backgroundColor: "#ededed", 
                    width: "22vw", 
                    position: "absolute", 
                    // left: "70vw", 
                    left: `${offsetX-200}px`,
                    top: `${offsetY+20}px`,
                    borderRadius: "8px",
                    border: "1px solid #000000"
                }}>
                
                <div style={{display: "flex", padding: "7px 12px", fontSize: "14px", lineHeight: "16px"}} onClick={()=>{setSearchBox(false);}}>
                    <div> What’s the name of the variable or event you want to see the data? </div>
                    <img style={{marginLeft: "auto"}} src={closeIcon}/>
                </div>
                <div class="input-group">
                    <input 
                        type="text" 
                        class="form-control" 
                        defaultValue={defaultInput} 
                        value={generatePart} 
                        key={defaultInput} 
                        onChange={handleChange}
                        style={{fontSize: "14px"}}></input>
                    <span 
                        class="input-group-text" 
                        id="inputGroup-sizing-default" 
                    >
                        <img src={searchIcon} onClick={()=>{createReference();}}/>
                    </span>
                </div>
            
            {/* {searchStatus
            ?  */}
                {/* for choosing specific dataset */}
                {/* <div class="list-group">
                    {['First Data', 'Second Data', 'Third Data', 'Fourth Data', 'Fifth Data'].map((item, idx) => {
                        return (
                            <div 
                                style={{display: "flex"}}
                                class={`list-group-item list-group-item-action ${idx == selectIdx ? "active" : null }`} 
                                onClick={()=>{setSelectIdx(idx)}}>
                                    {item}
                                <button style={{border: "none", marginLeft: "auto", fontSize: "12px"}} 
                                        onClick={()=>{
                                            setSearchBox(false); 
                                            setTooltip(false); 
                                            setHighlight([...highlight, defaultInput])}
                                        }>
                                    Add Data
                                </button>
                            </div>
                        )
                    })}
                </div> */}
            {/* : <></>
            } */}
            </div>
        </React.Fragment>
    )
}

export default SearchBox;