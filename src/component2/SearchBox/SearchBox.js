import React from "react"
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import searchIcon from '../../images/icons/search.svg'
import { useEffect } from "react";

function SearchBox({offsetY, defaultInput}) {

    const [searchStatus, setSearchStatus] = useState(false);
    const [selectIdx, setSelectIdx] = useState(null);

    useEffect(()=> {
        setSearchStatus(false);
        setSelectIdx(null);
    }, [defaultInput])


    console.log("trace default", defaultInput)

    return (
        <React.Fragment>
            <div style={{backgroundColor: "#f4f4f4", 
                    width: "22vw", 
                    position: "absolute", 
                    left: "68vw", 
                    top: `${offsetY}px`
                }}>
                
                <div class="input-group">
                    <input type="text" class="form-control" defaultValue={defaultInput} key={defaultInput}></input>
                    <span class="input-group-text" id="inputGroup-sizing-default" onClick={()=>{setSearchStatus(true);}}><img src={searchIcon}/></span>
                </div>
            
            {searchStatus
            ? 
                <div class="list-group">
                    {['First Item', 'Second Item', 'Third Item', 'Fourth Item', 'Fifth Item'].map((item, idx) => {
                        return (
                            <button type="button" 
                                class={`list-group-item list-group-item-action ${idx == selectIdx ? "active" : null }`} 
                                onClick={()=>{setSelectIdx(idx)}}>
                                    {item}
                            </button>
                        )
                    })}
                </div>
            : <></>
            }
            </div>
        </React.Fragment>
    )
}

export default SearchBox;