'use client'
import * as React from 'react';
import '@/components/header/header.css';
import Link from 'next/link';
import Image from 'next/image';
import customerIcon from '../../../public/icons/customer.svg';
import faveIcon from '../../../public/icons/faveicon.svg';
import shoppingIcon from '../../../public/icons/shopping.svg';


const Header: React.FC = () => {

    const Links = [
        'products',
        'delivery',
        'contacts',
    ]

    return (
        <div className="headerWrapper">
            <div className="headerLogo">
                <Link className="headerLink" href="/">
                    <div className="headerHeadings">
                        <h1>Framelane</h1>
                    </div>
                </Link>
            </div>

            {Links.map((link, id) => (
                <div key={id} className="headerNav">
                    <Link className="headerLink" href={`/${link}`}>
                        {link}
                    </Link>
                </div>
            ))}

            <div className="headerNav">
                <Link className="headerLink" href="#">
                    <Image className="headerNav__icon" src={customerIcon} alt="Customer"/>
                </Link>
                <Link className="headerLink" href="#">
                    <Image className="headerNav__icon" src={faveIcon} alt="Wishlist"/>
                </Link>
                <Link className="headerLink" href="#">
                    <Image className="headerNav__icon" src={shoppingIcon} alt="Shopping"/>
                </Link>
            </div>
        </div>

    );
};

export default Header;

