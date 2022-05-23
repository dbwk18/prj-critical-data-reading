import React, {useState, useEffect} from 'react';
import './ArticleBox.css'

function ArticleBox( {setViewArticle} ) {

    return (
        <div className='articleBox'>
            <div className='articleBox-header'>
                <div className='title'> 
                    <div> MORE ARTICLES INCLUDING </div>
                    <div> South Korea </div>
                </div>
                <div className='closeBtn' onClick={()=>{setViewArticle(false)}}> X </div>
            </div>
        </div>
    )

}

export default ArticleBox;