import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchDropdown.css'
import { useState, useRef } from 'react';

import dropdownicon from '../../images/icons/chevron-down.svg'

function SearchDropdown({dataDrop, dataSelected, setDataSelected, datasetIdx, setDatasetIdx, dropIdx}) {

    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] =useState("")
    const inputRef = useRef(null);

    // console.log("datadrop",dataDrop, dataSelected)

    function toggle(e) {
        return setIsOpen(e && (e.target === inputRef.current));
    }

    function displayOption() {
        console.log("display option", dataDrop, dataSelected, dataSelected.name)
        if (query) return query;
        if (dataSelected) return dataSelected.name;

        return ""
    }

    function selectOption(option, idx) {
        setQuery(()=>"");
        setIsOpen((isOpen) => !isOpen);
        setDataSelected(option);
        
        // console.log("selected option", option, idx)

        if (dropIdx == 0) setDatasetIdx([idx, datasetIdx[1]])
        else if (dropIdx == 1) setDatasetIdx([datasetIdx[0], idx])
      
    }
    
    function filter(dataDrop) {
        return dataDrop.filter((item) => 
            item["name"].toLowerCase().indexOf(query.toLowerCase()) > -1
        )
    }


    return (
        <div 
            className='search-dropdown'
            // style={{ height: "20px"}}    
        >
            <div className='input-group mb-3'>
                {/* <input 
                    class="form-control"
                    ref={inputRef}
                    value={dataSelected.name}
                    onClick={toggle}
                    onChange={(e)=>{setQuery(e.target.value); setDataSelected(null)}}
                /> */}
                <div
                    class="form-control dropdown"
                    ref={inputRef}
                    onClick={()=>{setIsOpen(!isOpen)}}
                >
                    {dataSelected.name}
                    <img 
                        style={{marginLeft: "auto"}}
                        width="12px" 
                        src={(isOpen ? null : "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e")}/>
                    {/* <div className={`arrow ${isOpen ? "open" : ""}`}><img src={dropdownicon} width='100%'/></div> */}
                </div>
            </div>
            <div className={`dropdown-menu ${isOpen ? "open" : ""}`}>
                {dataDrop.map((item, idx) => {
                    console.log("SEARCH", item, dataSelected)
                    return (
                        <div
                            onClick={() => selectOption(item, idx)}
                            className={`dropdown-item ${
                                item.name === dataSelected.name ? "selected" : ""
                                }`}
                            key={`${idx}`}
                        >
                            {item.name}
                      </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SearchDropdown