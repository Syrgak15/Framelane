"use client";

import Link from 'next/link';
import React from 'react';
import {creatingPages} from "../config/pages.config";
import {SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";

type Inputs = {
    email: string;
    password: string;
    username: string;
}

export default function SignUpForm ()  {
    const [error, setError ] = React.useState<string | null>(null);
    const router = useRouter();

    const {
        register,
        handleSubmit,
    } = useForm<Inputs>()

    const onSubmit:SubmitHandler<Inputs> = async (data) => {

        try {
            const req = await fetch(`https://framelane-2.onrender.com/register`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })

            if(!req.ok) {
                const errorData = await req.json().catch(() => ({}));
                setError(errorData.error)
                throw new Error(errorData.error || "Failed to register")
            }

            const res = await req.json();
            router.push(`/${creatingPages.PROFILE}`)
            return res;

        }catch(e) {
            console.log(e);
        }
    }
    return (
        <div className="sign-up-form">
            <h1 className="sign-up__title">Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="Username"
                    {...register("username")}
                    />
                <input
                    type="email"
                    placeholder="Email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                        },
                    })}
                    />
                <input
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                        required: "Password is required",
                    })}
                    />
                <button type="submit">Sign Up</button>
            </form>
            {error && (
                <div className="error__message">
                    <span>{error}</span>
                </div>
            )}
            <p>
                Already have an account?{" "}
                <Link href={`/${creatingPages.SIGNIN}`}>Sign In</Link>
            </p>
        </div>
    );
};

