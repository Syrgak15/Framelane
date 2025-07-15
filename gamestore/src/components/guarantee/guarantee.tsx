import React from 'react';
import '@/components/guarantee/guarantee.css'

const Guarantee:React.FC = () => {

    const reasons = [
        {
            title: 'Verified quality',
            subtitle: 'Every product is hand-checked before shipping',
            icon: '/icons/verified-quality.svg',
        },
        {
            title: 'Customer reviews',
            subtitle: 'Over 500 satisfied customers with real feedback',
            icon: '/icons/customer-reviews.svg',
        },
        {
            title: 'Return guarantee',
            subtitle: 'Hassle-free 14-day return policy',
            icon: '/icons/return-guarantee.svg',
        },
    ];
    return (
        <div className="guarantee">
            <div className="guarantee-wrapper__title">
                <h2>AS FRAMELANE WE GUARANTEE</h2>
            </div>
            <div className="guarantee-wrapper">
                {reasons.map((reason, index) => (
                    <div key={index} className="guarantee-list">
                        <div className="guarantee-list__item">
                            <div className="item__image">
                                <img src={reason.icon} alt="icon"/>
                            </div>

                            <div className="item__title">
                                <span>{reason.title}</span>
                            </div>

                            <div className="item__subtitle">
                                <span>{reason.subtitle}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default Guarantee;