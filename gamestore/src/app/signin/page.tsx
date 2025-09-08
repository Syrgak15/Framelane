"use client"

import React from 'react';
import "./sign-in-page.css"
import GoogleButton from "../../non-lib-components/GoogleButton";
import SignInForm from "../../non-lib-components/SignInForm";

export default function SignInPage () {
    return (
        <div className="sign-in-page">
            <div className="sign-in-card">
                <h1>Sign In</h1>
                <GoogleButton/>
                <div className="divider">or</div>
                <SignInForm/>
            </div>
        </div>
    );

};

