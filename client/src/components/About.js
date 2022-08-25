import React,{ useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import { useNavigate } from "react-router-dom";
const About = () => {
    const navigate = useNavigate();
    const [userData,setUserData] = useState({});
    const callAbout = async () => {
        try {
            const res = await fetch("/about", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json; charset=utf-8",
                    'Connection': "keep-alive"
                },
                credentials: "include"
            });
            const data = await res.json();
            setUserData(data);
            if (data.error) {               
                // window.alert("user dont have permission to view the page");    
                // navigate("/login");           
            } 
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        callAbout();
    }, []);

    return (
        <>
            <section className='aboutUsMainSection'>
                <div className="container py-5">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card mb-4">
                                <div className="card-body text-center">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                                        className="rounded-circle img-fluid imgWidth"></img>
                                    <h5 className="my-3">{userData.name}</h5>
                                    <p className="text-muted mb-1">Full Stack Developer</p>
                                    <p className="text-muted mb-4">{userData.city} {userData.country}</p>
                                    <div className="d-flex justify-content-center mb-2">
                                        <button type="button" className="btn btn-primary">Follow</button>
                                        <button type="button" className="btn btn-outline-primary ms-1">Message</button>
                                    </div>
                                </div>
                            </div>
                           
                        </div>
                        <div className="col-lg-8">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Full Name</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{userData.name}</p>
                                        </div>
                                    </div>
                                    {/* <hr> */}
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Email</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{userData.emailId}</p>
                                            </div>
                                        </div>
                                    {/* </hr>
                                    <hr> */}
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Phone</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{userData.contact}</p>
                                            </div>
                                        </div>
                                    {/* </hr>
                                    <hr> */}
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Mobile</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{userData.contact}</p>
                                            </div>
                                        </div>
                                    {/* </hr>
                                    <hr> */}
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Address</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{userData.city} {userData.country}</p>
                                            </div>
                                        </div>
                                    {/* </hr> */}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );

}


export default About;