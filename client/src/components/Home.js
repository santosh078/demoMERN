import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import { useNavigate } from "react-router-dom";
import heroLogo from "../images/hero-img.png";

const Home = ()=>{
    const navigate = useNavigate();
    let[textToShow,setTextToShow] = useState("Get started by logging in");
    const getUserData = async () => {
        try {
            const res = await fetch("/userData", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    'Connection': "keep-alive"
                }
            });
            const data = await res.json();
               if (data.error) {
                // window.alert("user dont have permission to view the page");
                // navigate("/login");
            }else{
                textToShow="Welcome "+data.name;
            setTextToShow(textToShow);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getUserData();
    }, []);
        return (
            <>
                <section id="hero" class="d-flex align-items-center">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1" data-aos="fade-up" data-aos-delay="200">
                                <h1>{textToShow}</h1>
                                <h2>This is a test home page :) </h2>
                                <div class="d-flex justify-content-center justify-content-lg-start">
                                    <a href="/login" class="btn-get-started scrollto">Login</a>
                                    <a href="https://www.youtube.com/watch?v=jDDaplaOz7Q" class="glightbox btn-watch-video"><i class="bi bi-play-circle"></i><span>Watch Video</span></a>
                                </div>
                            </div>
                            <div class="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-in" data-aos-delay="200">
                                <img src={heroLogo} class="img-fluid animated" alt="" />
                            </div>
                        </div>
                    </div>

                </section>
            </>
        );
   
}

export default Home;