import React, {useState, useEffect} from 'react';
import './ContextGraphBox.css'

function ContextGraphBox( {name, setViewArticle, setGraphCateg} ) {
    
    return (
        <div className='contextGraphBox' onClick={()=>{setViewArticle(true); setGraphCateg(name);}}>
            <div>{name}</div>
            <div className="graph"></div>
        </div>
    )

}

export default ContextGraphBox;