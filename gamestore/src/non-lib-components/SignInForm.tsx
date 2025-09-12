"use client";

import React from 'react';
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {creatingPages} from "../config/pages.config";

export default function SignInForm ()  {

    const router = useRouter();

    const handleSignIn = async (e: any): Promise<void> => {

        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const res = await signIn("credentials", {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false
        },);

        if(res && !res.error) {
            router.push(`/${creatingPages.PROFILE}`);
        } else {
            console.log(res);
        }
    }
    return (
        <div className="sign-in-form">
            <form onSubmit={handleSignIn}>
                <input type="email" name="email" placeholder="Email" required/>
                <input type="password" name="password" placeholder="Password" required/>
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

