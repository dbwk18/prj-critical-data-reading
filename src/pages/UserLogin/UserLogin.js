import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createLog } from '../../data/CreateLog.js';
// import { getHighlight, getHighlightRef, getHighlightGPTRef, getHighlightColor, getHighlightData, getTimeFrameData } from '../../data/DataPreprocess.js';

import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css';
import './UserLogin.css';


function UserLogin( {userid, condition, articletitle, next_req} ) {

    const navigate = useNavigate();

    const [userEmail, setUserEmail] = useState('');

    const onChange = (e) => {
        setUserEmail(e.target.value);
    };

    const createNotes = () => {
        // create notes
        if (condition !== "system") {
            axios.post(`http://cda.hyunwoo.me/api/note`, 
                {
                    "article_url": next_req.url, 
                    "note": "", 
                    "user_email": userEmail
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                }
                ).then( (res) => {
                    console.log("notecreate", res, res.data);
            })  
        }
    }

    const navigateToArticle = () => {
        const userObj = { name: userEmail };
        window.sessionStorage.setItem("user-email", JSON.stringify(userObj));

        axios.post(`http://cda.hyunwoo.me/api/create_user`, 
        {   
            user_email: `${userEmail}`
        },
        {
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            }
        }
        ).then( (res) => {
            console.log("ARTICLE", res.data);
        })  

        condition === "system"
        //process article & process data => update when user creates ref 
        ? (
        // axios.post(`http://cda.hyunwoo.me/api/process_article`, 
        // next_req,
        // {
        //     headers: {
        //     'Content-Type': 'application/json',
        //     'Accept': 'application/json',
        //     }
        // }
        // ).then( (res) => {
        //     console.log("ARTICLE", res, res.data);
        //     window.sessionStorage.setItem("user-article", JSON.stringify(res.data));

        //     window.sessionStorage.setItem("user-highlight", JSON.stringify(getHighlight(res.data)));
        //     window.sessionStorage.setItem("user-highlight-ref", JSON.stringify(getHighlightRef(res.data)));
        //     window.sessionStorage.setItem("user-highlight-gptref", JSON.stringify(getHighlightGPTRef(res.data)));
        //     window.sessionStorage.setItem("user-highlight-color", JSON.stringify(getHighlightColor(res.data)));
        //     window.sessionStorage.setItem("user-highlight-data", JSON.stringify(getHighlightData(res.data)));
        //     window.sessionStorage.setItem("user-timeframe-data", JSON.stringify(getTimeFrameData(res.data)));

        //     navigate(`/${articletitle}-${userid}`, {state: {article: res.data, highlight: getHighlight(res.data), ref: getHighlightRef(res.data), gptref: getHighlightGPTRef(res.data), color: getHighlightColor(res.data), data: getHighlightData(res.data), timeframe: getTimeFrameData(res.data)}});
        // }) 
            navigate(`/info-demo-${userid}`)
        )
        : (
            navigate(`/${articletitle}-${userid}`)
        )

        //create log 
        const payload = {"articleTitle": articletitle, "flowNum": userid, "condition": condition}
        createLog(userEmail, "startSession", payload)
        createNotes();

    };


    return(
        <div className="container">
            <div className="login--container">
                <div className="instruction">
                    Please enter your email to start the task.
                </div>
                <div 
                    className="mb-3" 
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "50%", 
                        textAlign: "center"
                    }}
                >
                    <label htmlFor="user-email" className="form-label">Email address</label>
                    <input 
                        type="email" 
                        className="form-control form-control-lg" 
                        id="user-email" 
                        placeholder="name@example.com" 
                        value={userEmail}
                        onChange={onChange}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                navigateToArticle();
                            }
                        }}
                    />
                </div>

                <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={navigateToArticle}
                >
                        Start Task
                </button>
            </div>
        </div>
    )
}


export default UserLogin;