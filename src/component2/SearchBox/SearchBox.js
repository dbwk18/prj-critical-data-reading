import React from "react"
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import searchIcon from '../../images/icons/search.svg'
import closeIcon from '../../images/icons/buttonX.svg'
import checkIcon from '../../images/icons/checkIcon.svg'


function SearchBox({offsetX, offsetY, defaultInput, setSearchBox, highlight, setHighlight, setTooltip}) {

    const [searchStatus, setSearchStatus] = useState(false); //search button click
    const [selectIdx, setSelectIdx] = useState(null);

    useEffect(()=> {
        setSearchStatus(false);
        setSelectIdx(null);
        setTooltip(false);
    }, [defaultInput])


    console.log("trace default", defaultInput)

    return (
        <React.Fragment>
            <div style={{backgroundColor: "#ededed", 
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
                    <input type="text" class="form-control" defaultValue={defaultInput} key={defaultInput} style={{fontSize: "14px"}}></input>
                    <span 
                        class="input-group-text" 
                        id="inputGroup-sizing-default" 
                        onClick={()=>{setSearchStatus(true); setTooltip(false);}}
                    >
                        <img src={searchIcon}/>
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