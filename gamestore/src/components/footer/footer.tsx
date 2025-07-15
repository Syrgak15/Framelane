import React from 'react';
import '@/components/footer/footer.css'

const Footer:React.FC = () => {
    return (
        <div className="footer">
            <div className="footerWrapper">
                <div className="footerResources">
                    <ul className="footerResources__list">
                        <h2>RESOURCES</h2>
                        <li className="footerResources__item">Wishlist</li>
                        <li className="footerResources__item">Our Reviews</li>
                        <li className="footerResources__item">Shop Instagram</li>
                    </ul>
                </div>
                <div className="footerCompany">
                    <ul className="footerCompany__list">
                        <h2>COMPANY</h2>
                        <li className="footerCompany__item">Contact Us</li>
                        <li className="footerCompany__item">About Us</li>
                    </ul>
                </div>
            </div>
        </div>

    );
};

export default Footer;