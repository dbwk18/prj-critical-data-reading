import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';

function SearchBox({offsetY}) {
    return (
        <React.Fragment>
            <div style={{backgroundColor: "#f4f4f4", 
                    width: "25vw", 
                    height: "15vh",
                    position: "absolute", 
                    left: "68vw", 
                    top: `${offsetY}px`
                }}>
                {/* <input></input> */}
                <div class="input-group mb-3">
                    <input type="text" class="form-control"></input>
                    <span class="input-group-text" id="inputGroup-sizing-default">Search</span>
                </div>
            
            </div>
        </React.Fragment>
    )
}

export default SearchBox;