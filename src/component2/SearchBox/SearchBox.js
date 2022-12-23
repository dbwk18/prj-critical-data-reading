import React from "react"
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import searchIcon from '../../images/icons/search.svg'
import closeIcon from '../../images/icons/buttonX.svg'
import checkIcon from '../../images/icons/checkIcon.svg'


function SearchBox({offsetY, defaultInput, setSearchBox, highlight, setHighlight, setTooltip}) {

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
                    left: "70vw", 
                    top: `${offsetY-20}px`
                }}>
                
                <div style={{display: "flex"}} onClick={()=>{setSearchBox(false);}}>
                    <img style={{marginLeft: "auto"}} src={closeIcon}/>
                </div>
                <div class="input-group">
                    <input type="text" class="form-control" defaultValue={defaultInput} key={defaultInput}></input>
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
                <div class="list-group">
                    {['First Item', 'Second Item', 'Third Item', 'Fourth Item', 'Fifth Item'].map((item, idx) => {
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
                </div>
            {/* : <></>
            } */}
            </div>
        </React.Fragment>
    )
}

export default SearchBox;