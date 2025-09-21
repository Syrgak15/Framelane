import React from 'react';
import '@/components/guarantee/guarantee.css'
import reasons from "../../data/main-page-guarantee.json";

export default function Guarantee(){
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
