"use client"

import React from "react";
import "./reviewspage.css"
import {Reviews} from "../../../floating-widgets/reviews/reviews";
import ReviewsPageCard from "./ReviewsPageCard";

export default function ReviewsPageClientComponent({initialReviews} : {initialReviews: Reviews[]}) {

    return (
        <div className="reviews__page">
            <div className="reviews__page-wrapper">
                <div className="reviews__page-heading">
                    <h1 className="reviews__page-title">
                        Reviews
                    </h1>
                </div>

                <div className="reviews__page-content">
                    <ul className="reviews__page-list">
                        <li className="reviews__page-list-item">
                            <ReviewsPageCard reviewsData={initialReviews}/>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}