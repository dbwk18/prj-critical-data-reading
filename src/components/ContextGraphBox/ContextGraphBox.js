import React, {useState, useEffect} from 'react';
import './ContextGraphBox.css'

function ContextGraphBox( {name} ) {
    
    return (
        <div className='contextGraphBox'>
            <div>{name}</div>
            <div>graph</div>
        </div>
    )

}

export default ContextGraphBox;