import React from 'react'
import axios from 'axios';
import { createLog } from '../../data/CreateLog.js';

import { useNavigate } from "react-router-dom";
import './ArticleMid.css'


import { getHighlight, getHighlightRef, getHighlightGPTRef, getHighlightColor, getHighlightData, getTimeFrameData } from '../../data/DataPreprocess.js';

function ArticleMid( {userid, text_req, articletitle } ) {

    const navigate = useNavigate();

    function processNext() {

        axios.post(`http://internal.kixlab.org:7887/process_article`, 
        text_req,
        {
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            }
        }
        ).then( (res) => {
            console.log("ARTICLE", res, res.data);
            window.sessionStorage.setItem("user-article", JSON.stringify(res.data));

            window.sessionStorage.setItem("user-highlight", JSON.stringify(getHighlight(res.data)));
            window.sessionStorage.setItem("user-highlight-ref", JSON.stringify(getHighlightRef(res.data)));
            window.sessionStorage.setItem("user-highlight-gptref", JSON.stringify(getHighlightGPTRef(res.data)));
            window.sessionStorage.setItem("user-highlight-color", JSON.stringify(getHighlightColor(res.data)));
            window.sessionStorage.setItem("user-highlight-data", JSON.stringify(getHighlightData(res.data)));
            window.sessionStorage.setItem("user-timeframe-data", JSON.stringify(getTimeFrameData(res.data)));

             //temporal
            navigate(`/${articletitle}-${userid}`, {state: {article: res.data, highlight: getHighlight(res.data), ref: getHighlightRef(res.data), gptref: getHighlightGPTRef(res.data), color: getHighlightColor(res.data), data: getHighlightData(res.data), timeframe: getTimeFrameData(res.data)}});
        })  

        //create log 
        const userEmail = JSON.parse(window.sessionStorage.getItem("user-email"))["name"]
        const payload = {"articleTitle": articletitle, "flowNum": userid}

        createLog(userEmail, "nextSession", payload)

    }
    return(
        <div className="text-container">
            <h3>
                    Task 2
            </h3>
            <br />
            <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={processNext}
                >
                        Start Task
            </button>
        </div>
    )
}

export default ArticleMid;