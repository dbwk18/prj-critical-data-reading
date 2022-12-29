import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchDropdown.css'
import { useState, useRef } from 'react';

function SearchDropdown({dataDrop, dataSelected, setDataSelected}) {

    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] =useState("")
    const inputRef = useRef(null);

    function toggle(e) {
        return setIsOpen(e && (e.target === inputRef.current));
    }

    function displayOption() {
        if (query) return query;
        if (dataSelected) return dataSelected;

        return ""
    }

    function selectOption(option) {
        setQuery(()=>"");
        setIsOpen((isOpen) => !isOpen);
        setDataSelected(option);
    }
    

    function filter(dataDrop) {
        return dataDrop.filter((item) => 
            item.toLowerCase().indexOf(query.toLowerCase()) > -1
        )
    }

    return (
        <div className='search-dropdown'>
            <div className='search-input'>
                <input 
                    ref={inputRef}
                    value={displayOption()}
                    onClick={toggle}
                    onChange={(e)=>{setQuery(e.target.value); setDataSelected(null)}}
                />
                <div className={`arrow ${isOpen ? "open" : ""}`}></div>
            </div>
            <div className={`options ${isOpen ? "open" : ""}`}>
                {filter(dataDrop).map((item, idx) => {
                    return (
                        <div
                            onClick={() => selectOption(item)}
                            className={`option ${
                                item === dataSelected ? "selected" : ""
                                }`}
                            key={`${idx}`}
                        >
                            {item}
                      </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SearchDropdown