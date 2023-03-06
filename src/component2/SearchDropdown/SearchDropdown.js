import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchDropdown.css'
import { useState, useRef } from 'react';

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
            style={{float: "left", width: "67%", height: "38px"}}    
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
                </div>
                <div className={`arrow ${isOpen ? "open" : ""}`}></div>
            </div>
            <div className={`dropdown-menu ${isOpen ? "open" : ""}`}>
                {filter(dataDrop).map((item, idx) => {
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