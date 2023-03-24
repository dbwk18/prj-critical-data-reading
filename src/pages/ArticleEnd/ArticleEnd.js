import React, {useEffect} from 'react'
import { createLog } from '../../data/CreateLog.js';

import './ArticleEnd.css'

function ArticleEnd( ) {

    return(
        <div className="text-container">
            <h3 style={{textAlign: "center"}}>
                    This is the end of the task.
                    <br />
                    Thanks for the participation.
            </h3>
        </div>
    )
}

export default ArticleEnd;