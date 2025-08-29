import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import * as React from "react";
import CountAverageReviewsValue from "../../utils/AverageReviewsValue";
import ModalPopUp from "../../lib-components/ModalPopUp";
import RatingProgressBar from "../../lib-components/RatingProgressBar";

type Review = {
    name: string;
    surname?: string;
    email: string;
    rating: number;
    review: string;
    createdAt: string;
    slug: string;
};

export default async function ReviewsWidget({ reviews, slug }: { reviews: Review[], slug: string }) {
    const dateSortOrder = "desc";

    const sortedReviews = [...reviews].sort((a, b) => {
        if (!dateSortOrder) return 0;

        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();

        return dateSortOrder === "desc" ? timeB - timeA : timeA - timeB;
    });

    const avgReviews = CountAverageReviewsValue(reviews);

    const reviewsStars = Array.from({ length: 5 }).map((_, i) => (
        <StarRateRoundedIcon
            key={i}
        />
    ))

    return (
        <div className="product__reviews-main">
            <div className="product__reviews-container">
                <div className="product__title">
                    <h2>Customer Reviews</h2>
                </div>

                <div className="product__reviews-headings">
                    <div className="product__reviews-left-block">
                        <div className="product__reviews-average-value">
                            <span>{avgReviews}/5</span>
                            <p>{reviewsStars}</p>
                            <p>Based on {reviews.length} reviews</p>
                        </div>
                        <div className="product__reviews-progress-bar">
                            <RatingProgressBar
                                reviews={sortedReviews}
                            />
                        </div>
                    </div>

                    <div className="product__reviews-right-block">
                        <ModalPopUp slug={slug}/>
                    </div>
                </div>

                <div className="product__reviews-tab">
                    <button className="product__reviews-tab-btn">
                        <span>Reviews</span>
                    </button>
                </div>
                <div className="product__reviews-hr"></div>

                {sortedReviews.map((review, id) => (
                    <div
                        key={id}
                        className="product__reviews-layout-reviews-list"
                    >
                        <ul className="product__reviews-list">
                            <li className="product__reviews-list-item">
                                <div className="product__reviews-list-item-body">
                                    <div
                                        className="review__avatar"
                                        aria-hidden="true"
                                    >
                                        {review.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="review__content">
                                        <div className="review__header">
                                            <div>
                                            <span className="review__author">
                                              {review.name}
                                            </span>
                                            </div>
                                            <div
                                                className="review__rating"
                                                title={`${review.rating} из 5`}
                                            >
                                                {Array.from({length: 5}).map((_, i) => (
                                                    <StarRateRoundedIcon
                                                        key={i}
                                                        className={`star ${
                                                            i < Math.round(review.rating ?? 0)
                                                                ? "is-on"
                                                                : ""
                                                        }`}
                                                        fontSize="small"
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <p className="review__text">{review.review}</p>

                                        <time className="reviews__date" dateTime={review.createdAt}>
                                            {new Date(review.createdAt).toLocaleDateString()}
                                        </time>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
