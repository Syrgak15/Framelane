"use client"

import React from 'react';
import {signIn} from "next-auth/react";
import {useSearchParams} from "next/navigation";

export default function GoogleButton ()  {

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || '/profile';

    return (
        <div className="google-button">
            <button onClick={() => signIn("google", {callbackUrl})}>
                <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                />
                Sign in with Google
            </button>
        </div>
    );
};

