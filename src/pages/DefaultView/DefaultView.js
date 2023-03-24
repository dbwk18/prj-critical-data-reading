import React, {useState, useEffect, useRef} from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import NotePad from '../../component2/Notepad/Notepad';

import { createLog } from '../../data/CreateLog.js';


import './DefaultView.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function DefaultView( {userid, condition, nextcondition, articledata, articlevis, text_req} ) {

    const navigate = useNavigate();
    const location = useLocation();

    
    function processNext() {
        const userEmail = JSON.parse(window.sessionStorage.getItem("user-email"))["name"]
        // text_req['user_email'] = userEmail

        const payload = {"articleTitle": articledata.url, "flowNum": userid, "condition": condition}
        createLog(userEmail, "endSession", payload)

        // pagenum == 1
        // ? navigate(`/article-mid-${userid}`)
        // : navigate(`/article-end`)

        if (nextcondition == "demo") navigate(`/info-demo-${userid}`) 
        else if (nextcondition == "system") navigate(`/info-task-${userid}`)
        else if (nextcondition == "baseline") navigate(`/info-base-${userid}`)
        else if (nextcondition == "end") navigate(`/article-end`)
        
    }


    return (
    <div>
        <div className='g-header'>
            <button className="btn btn-outline-primary btn-sm" onClick={()=>{processNext()}}>Go Next</button>
        </div>
        <div className='g-name'>{articledata["title"]}</div>
        <div className='g-details'>{articledata["details"]}</div>
        
        <NotePad 
            requrl={text_req.url}
        />
      
            {
                articledata.paragraphs.map((paragraph, idx) => {
                    return (
                        <div className="g-body">
                            {paragraph.map((sentence, idx) => {
                                // console.log(idx, sentence, highlightRef[sentence], highlightColor[sentence])
                                if (sentence.includes('ARTICLEIMG-')) {
                                     return (
                                        <img src={articlevis[parseInt(sentence.replace('ARTICLEIMG-', ''))]} width='100%' />
                                     )
                                 }
                                else {
                                    return (
                                        `${sentence} `
                                    )
                                }
                                
                            })}
                        </div>
                    )
                })
            }

        </div>
    )
}

export default DefaultView;
