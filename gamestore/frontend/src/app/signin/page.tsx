"use client"

import React from 'react';
import "./sign-in-page.css"
import GoogleButton from "../../non-lib-components/GoogleButton";
import SignInForm from "../../non-lib-components/SignInForm";
import Link from 'next/link';
import {creatingPages} from "../../config/pages.config";

export default function SignInPage () {

    return (
        <div className="sign-in-page">
            <div className="sign-in-card">
                <h1>Sign In</h1>
                <div className="sign-in">
                    <SignInForm/>
                </div>
                <div className="sign-up">
                    <span>Don't have an account yet? </span>
                    <Link
                        href={`/${creatingPages.SIGNUP}`}
                    >
                        Sign up Now
                    </Link>
                </div>
                <div className="divider">or</div>
                {/*<div className="google-btn">*/}
                {/*    <GoogleButton/>*/}
                {/*</div>*/}
            </div>
        </div>
    );

};

