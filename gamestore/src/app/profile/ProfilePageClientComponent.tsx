"use client"
import {signOut} from "next-auth/react";
import React from 'react';
import { Session } from "next-auth";
import "./profile.css"
import Link from 'next/link';
import Image from 'next/image';
import {footerPageConfig, headerPageConfig} from "../../config/pages.config";
import customerIcon from '../../../public/icons/customer.svg';

interface Props {
    session: Session | null;
}

export default function ProfilePageClientComponent({ session }: Props) {

    return (
        <div className="profile">
            <div className="profile__wrapper">

                <div className="profile__heading">
                    <div className="profile__avatar">
                        {session?.user?.image ? (
                            <img src={session.user.image} alt={session.user.name || "User"} />
                        ) : (
                            <div className="profile__avatar-placeholder">
                                {session?.user?.name?.charAt(0).toUpperCase() || <Image src={customerIcon} alt="icon"/>}
                            </div>
                        )}
                    </div>
                    <div className="profile__title">
                        <h1>{session?.user?.name}</h1>
                        <p>{session?.user?.email}</p>
                    </div>
                </div>

                <div className="profile__content">
                    <ul>
                        <li><Link href={`/pages/${footerPageConfig.WISHLISTS}`}>Wishlist</Link></li>
                        <li><Link href={`/pages/${footerPageConfig.REVIEWS}`}>Reviews</Link></li>
                        <li><Link href={`/${headerPageConfig.COLLECTIONS}`}>Collections</Link></li>
                    </ul>
                </div>

                <div className="profile__sign-out-btn">
                    {session?.user && (
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                        >
                            Sign Out
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
