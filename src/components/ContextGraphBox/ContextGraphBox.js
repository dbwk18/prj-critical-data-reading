import React, {useState, useEffect} from 'react';
import './ContextGraphBox.css'

function ContextGraphBox( {name, setViewArticle} ) {
    
    return (
        <div className='contextGraphBox' onClick={()=>{console.log("hi"); setViewArticle(true)}}>
            <div>{name}</div>
            <div className="graph"></div>
        </div>
    )

}

export default ContextGraphBox;