import axios from 'axios';

export const createLog = ( email, event, payload ) => {
    axios.post(`http://internal.kixlab.org:7887/create_log`, 
        {
            "user_email": email, // user email
            "event_name": event, // Name of the event
            "payload": JSON.stringify(payload) // JSON-serialized payload
        },
        {
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            }
        }
        ).then( (res) => {
            console.log("log", {
                "user_email": email, // user email
                "event_name": event, // Name of the event
                "payload": payload // JSON-serialized payload
            }, res, res.data);
        })  
}