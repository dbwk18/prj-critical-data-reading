import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchDropdown.css'
import { useState, useRef } from 'react';

function SearchDropdown({dataDrop, dataSelected, setDataSelected}) {

    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] =useState("")
    const inputRef = useRef(null);

    console.log("dmddmdmdd",dataDrop, dataSelected)
    function toggle(e) {
        return setIsOpen(e && (e.target === inputRef.current));
    }

    function displayOption() {
        if (query) return query;
        if (dataSelected) return dataSelected.name;

        return ""
    }

    function selectOption(option) {
        setQuery(()=>"");
        setIsOpen((isOpen) => !isOpen);
        setDataSelected(option);
    }
    

    function filter(dataDrop) {
        return dataDrop.filter((item) => 
            item["name"].toLowerCase().indexOf(query.toLowerCase()) > -1
        )
    }

    return (
        <div 
            className='search-dropdown'
            style={{float: "left", width: "65%", height: "38px"}}    
        >
            <div className='input-group mb-3'>
                <input 
                    class="form-control"
                    ref={inputRef}
                    value={displayOption()}
                    onClick={toggle}
                    onChange={(e)=>{setQuery(e.target.value); setDataSelected(null)}}
                />
                <div className={`arrow ${isOpen ? "open" : ""}`}></div>
            </div>
            <div className={`dropdown-menu ${isOpen ? "open" : ""}`}>
                {filter(dataDrop).map((item, idx) => {
                    return (
                        <div
                            onClick={() => selectOption(item)}
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