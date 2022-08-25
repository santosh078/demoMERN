import React, { useEffect } from 'react';
import {useNavigate} from "react-router-dom";
const Logout = () => {
    const navigate= useNavigate();
    const callLogout = async() => {
        const res = await fetch("/logout", {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        });
        const data = await res.json();
        if(data.message){
            window.alert("User logged out successfully");
            navigate("/Login");
        }
    }

    useEffect(() => {
        callLogout();
    },[]);

    return (
        <div>
            Logout
        </div>
    );

}

export default Logout;