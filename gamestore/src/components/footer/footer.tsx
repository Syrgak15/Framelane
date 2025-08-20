import React from 'react';
import '@/components/footer/footer.css'
import Link from 'next/link';
import {footerPageConfig, contactUsConfig} from "../../config/pages.config";

const Footer:React.FC = () => {

    const footerPageEntries = Object.entries(footerPageConfig);

    return (
        <div className="footer">
            <div className="footer-wrapper">
                <div className="footer-resources">
                    <ul className="footer-resources__list">
                        <h2 className="footer-resources__list-title">RESOURCES</h2>
                        {footerPageEntries.map(([key, value]) => (
                            <Link className="footer-resources__item" key={key} href={`pages/${value}`}>
                                {value}
                            </Link>
                        ))}
                    </ul>
                </div>
                <div className="footer-company">
                    <ul className="footer-company__list">
                        <h2 className="footer-resources__list-title">COMPANY</h2>
                        <Link className="footer-company__item" href={contactUsConfig.CONTACTS}>Contact Us</Link>
                    </ul>
                </div>
            </div>
        </div>

    );
};

export default Footer;