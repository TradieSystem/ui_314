import React, { useState } from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Routes } from "react-router-dom";
import "./Login.css";

function Login() {
    // React States
    const [isSubmitted, setIsSubmitted] = useState(false);

    // User Login info
    const database = [
        {
            username: "user1",
            password: "pass1"
        },
        {
            username: "user2",
            password: "pass2"
        }
    ];

    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        //Prevent page reload
        event.preventDefault();

        var {uname, pass} = document.forms[0];

        // Find user login info
        const userData = database.find((user) => user.username === uname.value);


    // JSX code for login form
    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" name="uname" required/>

                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="pass" required/>

                </div>
                <div className="button-container">
                    <input type="submit"/>
                </div>
            </form>
        </div>
    );

    return (
        <div className="app">
            <div className="login-form">
                <div className="title">Sign In</div>
                {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
            </div>
        </div>
    );

}

export default Login;


