import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import { useNavigate } from "react-router-dom";
const Contact = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const callAbout = async () => {
        try {
            const res = await fetch("/userData", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    'Connection': "keep-alive"
                }
            });
            const data = await res.json();
            setUserData(data);
            if (data.error) {
                window.alert("user dont have permission to view the page");
                navigate("/login");
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        callAbout();
    }, []);
    const onDataChange = (evt) => {
        evt.preventDefault();
        const name = evt.target.name;
        const value = evt.target.value;
        setUserData({ ...userData, [name]: value });

    }
    const onFormSubmit = async () => {
        const { name, emailId, contact, message } = userData;
        // setUserData({...userData,message:""});
        const res = await fetch("/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Connection': "keep-alive"
            },
            body: JSON.stringify({ name, emailId, contact, message })
        });
        const data = await res.json();
        if (data.status) {
            setUserData({ ...userData, message: "" });
            window.alert("Your feedback submitted successfully");
        }
    }
    return (
        <>
            <div class="container contact">
                <div class="row">
                    <div class="col-md-3">
                        <div class="contact-info">
                            <img src="https://image.ibb.co/kUASdV/contact-image.png" alt="image" />
                            <h2>Contact Us</h2>
                            <h4>We would love to hear from you !</h4>
                        </div>
                    </div>
                    <div class="col-md-9">
                        <div class="contact-form">
                            <div class="form-group">
                                <label class="control-label col-sm-2" for="fname">Name:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="fname"
                                        onChange={onDataChange} value={userData.name} placeholder=" Name" name="name" />
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-sm-2" for="email">Email:</label>
                                <div class="col-sm-10">
                                    <input type="email" class="form-control" id="email"
                                        onChange={onDataChange} value={userData.emailId} placeholder="Enter email" name="email" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-sm-2" for="lname">Contact:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="lname"
                                        onChange={onDataChange} value={userData.contact} placeholder="Enter Last Name" name="contact" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-sm-2" for="comment">Comment:</label>
                                <div class="col-sm-10">
                                    <textarea class="form-control" name="message" onChange={onDataChange} value={userData.message} rows="5" id="comment"></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-offset-2 col-sm-10">
                                    <button type="submit" onClick={onFormSubmit} class="btn btn-default">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

};

export default Contact;