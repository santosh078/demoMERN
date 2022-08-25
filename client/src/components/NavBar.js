import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { NavLink } from "react-router-dom";
import logo from "../images/logo1.jpg";
import '../css/style.css'
class NavBar extends Component {
    render() {
        return (
            <div className="bodyPadding">
                <nav className="mainNav navbar navbar-expand-lg navbar-light fixed-top
             container px-4 px-lg-5">
                    <div className="container-fluid">
                        <NavLink className="navbar-brand" to="#">
                            <img src={logo} alt={logo} sizes='#navbarSupportedContent' className='img-sizing'></img>
                        </NavLink>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="navbarResponsive collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/about">About</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/contact">Contact Us</NavLink>
                                </li>
                                {/* <li className="nav-item">
                                    <NavLink className="nav-link"  to="/signup">Registration</NavLink>
                                </li> */}
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">Login</NavLink>
                                </li>
                                                           
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/register">Sign Up</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/logout">Log Out</NavLink>
                                </li>
                            </ul>

                        </div>
                    </div>
                </nav>

            </div>
        );
    }
}

export default NavBar;