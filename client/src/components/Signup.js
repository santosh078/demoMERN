import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'

const Signup = () => {

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
        const {name, email, city, country, password, contact} = user;
        const res = await fetch("/register",{
            method:"POST",
            headers:{
                "Content-Type":"applicaton/json"
            },
            body:JSON.stringify({
                name, email, city, country, password, contact
            })
        });
        const data= await res.json();
        console.log(data);
        if(data.status === 422 || !data){
            window.alert("registration failed");
        }else{
            window.alert("registration success");
        }

    }
    return (
        <>
            <form>
                <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                        <input type="text" name='name' value={user.name} class="form-control" onChange={handleChange} id="inputEmail3" placeholder="Name" />
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                        <input type="email" name='email' value={user.email} class="form-control" onChange={handleChange} id="inputEmail3" placeholder="Email" />
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-2 col-form-label">City</label>
                    <div class="col-sm-10">
                        <input type="text" name='city' value={user.city} class="form-control" onChange={handleChange} id="inputEmail3" placeholder="City" />
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-2 col-form-label">Country</label>
                    <div class="col-sm-10">
                        <input type="text" name='country' value={user.country} class="form-control" onChange={handleChange} id="inputEmail3" placeholder="Country" />
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
                    <div class="col-sm-10">
                        <input type="password" name='password' value={user.password} class="form-control" onChange={handleChange} id="inputPassword3" placeholder="Password" />
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-2 col-form-label">Contact</label>
                    <div class="col-sm-10">
                        <input type="tel" name='contact' value={user.contact} class="form-control" onChange={handleChange} id="inputEmail3" placeholder="Contact" />
                    </div>
                </div>

                <div class="col-sm-10">
                    <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Sign in</button>
                </div>

            </form>
        </>
    );

}

export default Signup;