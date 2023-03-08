import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import text_req from './../../data/article_extract_test_req.json'

import 'bootstrap/dist/css/bootstrap.min.css';

function UserLogin() {

    const navigate = useNavigate();

    const [userEmail, setUserEmail] = useState(null);

    const onChange = (e) => {
        setUserEmail(e.target.value);
    };

    const navigateToArticle = () => {
        const userObj = { name: userEmail };
        window.sessionStorage.setItem("user-email", JSON.stringify(userObj));
        text_req['user_email'] = userEmail;

        axios.post(`http://internal.kixlab.org:7887/create_user`, 
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
            console.log("ARTICLE", res);
        })  

        //temporal
        navigate("/nyt-cpi-article");
    };





    return(
        <div 
            style={{
                height: "100vh", 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                paddingTop: "20%"
            }}
        >
            <div 
                class="mb-3" 
                style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "50%", 
                    textAlign: "center"
                }}
            >
                <label for="user-email" class="form-label">Email address</label>
                <input 
                    type="email" 
                    class="form-control form-control-lg" 
                    id="user-email" 
                    placeholder="name@example.com" 
                    value={userEmail}
                    onChange={onChange}     
                />
            </div>

            <button 
                type="button" 
                class="btn btn-primary"
                onClick={navigateToArticle}
            >
                    Login
            </button>
        </div>
    )
}


export default UserLogin;