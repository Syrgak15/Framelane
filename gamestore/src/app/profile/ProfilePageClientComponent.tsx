"use client"
import {signOut} from "next-auth/react";
import React from 'react';
import { Session } from "next-auth";
import "./profile.css"
import Link from 'next/link';

interface Props {
    session: Session | null;
}

export default function ProfilePageClientComponent ({session} : Props) {

    return (
        <div className="profile">
            <div className="profile__wrapper">
                <div className="profile__heading">
                    <div className="profile__title">
                        <h1>its profile of {session?.user?.name}</h1>
                    </div>
                </div>

                <div className="profile__sign-out-btn">
                    {session?.user && (
                        <Link
                            href="#"
                            onClick={() => signOut({
                                callbackUrl: "/"
                            })}
                        >
                        Sign Out
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

