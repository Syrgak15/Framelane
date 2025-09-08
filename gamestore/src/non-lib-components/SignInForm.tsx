"use client";

import React from 'react';
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function SignInForm ()  {

    const router = useRouter();

    const handleSignIn = async (e: any): Promise<void> => {

        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const res = await signIn("credentials", {
            email: formData.get('email'),
            password: formData.get('password'),
        },);

        if(res && !res.error) {
            router.push("/profile");
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

