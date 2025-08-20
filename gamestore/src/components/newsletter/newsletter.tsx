"use client"

import React, {useState} from 'react';
import "./newsletter.css"
import {SubmitHandler, useForm} from "react-hook-form";

type Inputs = {
    newsletterForm: string
}

const Newsletter:React.FC = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> =  () => {

        setFormSubmitted(true);

    }


    return (
        <div className="newsletter">
            <div className="newsletter-wrapper">
                <div className="newsletter--title">
                    <h2>Join the Framelane circle — get early access to new drops, stories, and style updates.</h2>
                </div>

                <div className="newsletter--form">
                    {!formSubmitted ? (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input
                                placeholder="Enter an email address"
                                className="newsletter__input"
                                type="email"
                                {...register("newsletterForm", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address",
                                    },
                                })}
                            />
                            {errors.newsletterForm &&
                                <span className="newsletter--error__message">
                                {errors.newsletterForm.message}
                            </span>
                            }

                            <button type="submit" className="newsletter--btn">
                                <span>sign me up</span>
                            </button>
                        </form>
                    ) : (
                        <div className="newsletter--success__message">
                            Thanks for subscribing! You are on the list 🖤
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Newsletter;