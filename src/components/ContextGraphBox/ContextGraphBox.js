import React, {useState, useEffect} from 'react';
import './ContextGraphBox.css'

function ContextGraphBox( {categ, name, setViewArticle, setGraphCateg, setViewCateg} ) {
    
    return (
        <div className='contextGraphBox' 
             onClick={()=> {
                 console.log(name); 
                 setViewArticle(true); 
                 setGraphCateg(name); 
                 setViewCateg(categ)}
                }>
            <div>{name}</div>
            <div className="graph"></div>
        </div>
    )

}

export default ContextGraphBox;