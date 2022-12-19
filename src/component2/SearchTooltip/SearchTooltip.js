import React from 'react';
import { useState } from 'react';

import SearchBox from '../SearchBox/SearchBox'

function SearchTooltip({setSearchBox, setSearchY, offsetX, offsetY}) {

    return (
        <React.Fragment>
            <div style={{
                position: "absolute", 
                left: `${offsetX - 15}px`, 
                top:`${offsetY + 10}px`, 
                width: "58px", 
                height: "32px",
                lineHeight: "32px",
                }}>
                    <button 
                        onMouseDown={()=>{setSearchBox(true); setSearchY(offsetY);}} 
                        style={{
                            backgroundColor: "#6E7783", 
                            color: "white", 
                            border: "none",
                            textAlign: "center",
                            borderRadius: "4px",
                            fontSize: "14px",
                            opacity: "92%"
                        }}>
                            Search
                    </button>
            </div>
        </React.Fragment>
    )
}

export default SearchTooltip; 