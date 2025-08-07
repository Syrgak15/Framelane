"use client"

import React from 'react';
import "./contacts.css";
import Footer from '../../components/footer/footer';
import GridLayout from '../../lib-components/GridLayout';
import AccordionGridLayout from '../../lib-components/AccordionGridLayout';

const ContactsPage:React.FC = () => {


    return (
        <>
            <div className="contact-us">
                <div className="contact-us__wrapper">
                    <div className="contact-us__headings">
                        <h2 className="contact-us__headings-title">Get in touch</h2>
                        <br/>
                        <span className="contact-us__headings-subtitle">We would love to hear from you.</span>
                    </div>

                    <div className="contact-us__banner">
                        <GridLayout/>
                    </div>

                    <div className="contact-us__faq">
                        <div className="contact-us__faq-headings">
                            <h2 className="contact-us__headings-title">FAQ</h2>
                        </div>
                        <AccordionGridLayout/>
                    </div>

                    <div className="contact-us__address">
                        <div className="contact-us__address-block">
                            <h2 className="contact-us__headings-title">Mailing Address :</h2>
                            <span className="contact-us__headings-subtitle">123 Chui Avenue</span>
                            <span className="contact-us__headings-subtitle">Office 5, Asia Business Center</span>
                            <span className="contact-us__headings-subtitle">Bishkek, Kyrgyzstan 720000</span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default ContactsPage;