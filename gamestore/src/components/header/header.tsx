'use client';

import React, {useEffect, useRef, useState} from 'react';
import '@/components/header/header.css';
import Link from 'next/link';
import Image from 'next/image';
import customerIcon from '../../../public/icons/customer.svg';
import faveIcon from '../../../public/icons/faveicon.svg';
import shoppingIcon from '../../../public/icons/shopping.svg';
import { headerPageConfig } from '../../config/pages.config';
import { footerPageConfig } from '../../config/pages.config';

const Header: React.FC = () => {
    const [hidden, setHidden] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
                setHidden(true);
            } else {
                setHidden(false);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const pageEntries = Object.entries(headerPageConfig);

    return (
        <div className={`header ${hidden ? 'header--hidden' : ''}`}>
            <div className="header-wrapper">
                <div className="header-logo">
                    <Link className="header-link" href="/">
                        <div className="header-headings">
                            <h1>Framelane</h1>
                        </div>
                    </Link>
                </div>

                {pageEntries.map(([key, value]) => (
                    <div key={key} className="header-nav">
                        <Link className={`header-link header-link__${value}`} href={`${value}`}>
                            {value}
                        </Link>
                    </div>
                ))}

                <div className="header-nav nav-icons">
                    <Link className="header-link" href="#">
                        <Image className="header-nav__icon" src={customerIcon} alt="Customer" />
                    </Link>
                    <Link className="header-link" href={`/pages/${footerPageConfig.WISHLISTS}`}>
                        <Image className="header-nav__icon" src={faveIcon} alt="Wishlist" />
                    </Link>
                    <Link className="header-link" href="#">
                        <Image className="header-nav__icon" src={shoppingIcon} alt="Shopping" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Header;
