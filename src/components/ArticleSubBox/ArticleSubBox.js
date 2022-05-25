import React, {useState, useEffect, useRef} from 'react';
import './ArticleSubBox.css'

// data : {img, src, title}
function ArticleSubBox( {data, idx, setArticleIdx} ) {

    return (
        <div className='articleSubBox' onClick={()=>{setArticleIdx(idx);}}>
            <div className='img'><img src={data.img} width="100%"/></div>
            <div className='body'>
                <div className='src'> {data.src} </div>
                <div className='title'> <b> {data.title} </b></div>
            </div>
        </div>
    )
}

export default ArticleSubBox;