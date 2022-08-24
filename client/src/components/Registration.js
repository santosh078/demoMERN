import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'

const Registration = () => {
    const navigate= useNavigate();
    const [user, setUser] = useState({
        name: "", email: "", city: "", country: "", password: "", contact: ""
    });

    let name, value;
    const handleChange = (evt) => {
        name = evt.target.name;
        value = evt.target.value;
        setUser({ ...user, [name]: value });
    };
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const { name, email, city, country, password, contact,cpassword } = user;
        const res = await fetch("/register", {
            method: "POST",
            headers: {
                'Content-Type': "application/json; charset=utf-8",
                'Connection':"keep-alive"
            },
            body: JSON.stringify({
                "name": name,
                "emailId": email,
                "city": city,
                "country": country,
                "password": password,
                "contact": Number(contact),
                "cpassword":cpassword
                /// name, emailId:email, city, country, password, contact
            })
        });
        const data = await res.json();
        console.log(data);
        if (!data.status) {
            window.alert(`registration failed :: ${data.error}`);
        } else {
            window.alert(data.message);
            navigate("/login");
        }

    }
    return (
        <>
            <section class="vh-100 sectionRegister">
                <div class="container h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-lg-12 col-xl-11">
                            <div class="card text-black cardBorder">
                                <div class="card-body p-md-5">
                                    <div class="row justify-content-center">
                                        <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                            <form class="mx-1 mx-md-4">

                                                <div class="d-flex flex-row align-items-center mb-4">
                                                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div class="form-outline flex-fill mb-0">
                                                        <input name='name' value={user.name} class="form-control" onChange={handleChange} id="inputEmail3"  />
                                                        <label class="form-label" for="form3Example1c">Your Name</label>
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-row align-items-center mb-4">
                                                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div class="form-outline flex-fill mb-0">
                                                    <input type="email" name='email' value={user.email} class="form-control" onChange={handleChange} id="inputEmail3"  />
                                                        <label class="form-label" for="form3Example3c">Your Email</label>
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-row align-items-center mb-4">
                                                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div class="form-outline flex-fill mb-0">
                                                    <input type="password" name='password' value={user.password} class="form-control" onChange={handleChange} id="inputPassword3" />
                                                        <label class="form-label" for="form3Example4c">Password</label>
                                                    </div>
                                                </div>

                                                <div class="d-flex flex-row align-items-center mb-4">
                                                    <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                                                    <div class="form-outline flex-fill mb-0">
                                                    <input type="password" name='cpassword' value={user.cpassword} class="form-control" onChange={handleChange} id="inputPassword3"  />
                                                        <label class="form-label" for="form3Example4cd">Repeat your password</label>
                                                    </div>
                                                </div>

                                                <div class="d-flex flex-row align-items-center mb-4">
                                                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div class="form-outline flex-fill mb-0">
                                                    <input type="text" name='city' value={user.city} class="form-control" onChange={handleChange} id="inputEmail3"  />
                                                        <label class="form-label" for="form3Example3c">City</label>
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-row align-items-center mb-4">
                                                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div class="form-outline flex-fill mb-0">
                                                    <input type="text" name='country' value={user.country} class="form-control" onChange={handleChange} id="inputEmail3"  />
                                                        <label class="form-label" for="form3Example3c">Country</label>
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-row align-items-center mb-4">
                                                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div class="form-outline flex-fill mb-0">
                                                    <input type="tel" name='contact' value={user.contact} class="form-control" onChange={handleChange} id="inputEmail3"  />
                                                        <label class="form-label" for="form3Example3c">Contact</label>
                                                    </div>
                                                </div>
                                               

                                                
                                                {/* <div class="form-check d-flex justify-content-center mb-5">
                                                    <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                                                    <label class="form-check-label" for="form2Example3">
                                                        I agree all statements in <a href="#!">Terms of service</a>
                                                    </label>
                                                </div> */}

                                                <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="submit" onClick={handleSubmit} class="btn btn-primary btn-lg">Register</button>
                                                </div>

                                            </form>

                                        </div>
                                        <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                                class="img-fluid" alt="Sample image">
                                            </img>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Registration;