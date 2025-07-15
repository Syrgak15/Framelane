import React from 'react';
import '@/components/scroller/scroller.css'

const Scroller: React.FC = () => {

    const scrollingEl = [
        'CONTACT OWNER',
        'CONTACT OWNER',
        'CONTACT OWNER'
    ]
    const copyScrollingEl = [...scrollingEl, ...scrollingEl];

    return (
        <div className="scroller-wrapper">
            <div className="scroller-track">
                {copyScrollingEl.map((item, index) => (
                    <h1 key={index} className="scroller-element">
                        <a href="https://t.me/soladoraa" target="_blank">{item}</a>
                    </h1>
                ))}
            </div>
        </div>

    );
};

export default Scroller;