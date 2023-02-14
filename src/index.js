import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createRoot} from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import axios from 'axios';



const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/' : 'https://api.stlouisfed.org';


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
