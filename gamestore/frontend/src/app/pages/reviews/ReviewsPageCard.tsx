import React from 'react';
import {Reviews} from "../../../floating-widgets/reviews/reviews"
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import Link from 'next/link';
import Button from "@mui/material/Button";


export default function ReviewsPageCard({reviewsData}: { reviewsData: Reviews[] }) {
    const [limitedReviews, setLimitedReviews] = React.useState<number>(7);
    const dateSortOrder = "desc";

    const sortedReviews = [...reviewsData].sort((a, b) => {
        if (!dateSortOrder) return 0;

        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();

        return dateSortOrder === "desc"
            ? timeB - timeA
            : timeA - timeB;
    });

    const loadMoreReviews = () => {
        setLimitedReviews((prev) => prev + 7);
    }

    return (
        <div className="reviews__card">
            {sortedReviews.slice(0, limitedReviews).map((review) => (
                <div key={review.id} className="reviews__card-wrapper">
                    <div className="reviews__main">
                        <div className="reviews__author">
                            <span>
                                {review.name}
                            </span>
                            <div className="reviews__empty"></div>
                        </div>

                        <div className="reviews__inner">
                            <div className="reviews__rating" title={`${review.rating} из 5`}>
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
                            <div className="reviews__text">
                                <p className="reviews__text">{review.content}</p>
                            </div>

                            <div className="reviews__date">
                                {new Date(review.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    </div>

                    <div className="reviews__footer">
                        <div className="reviews__product">
                            <div className="reviews__image">
                                <img src={review.product.image} alt={review.product.title}/>
                            </div>

                            <div className="reviews__info">
                                <div className="reviews__title">
                                    <Link href={`/product/${review.product.slug}`}>
                                        <span>{review.product.title}</span>
                                    </Link>
                                </div>
                                <div className="reviews__price">
                                    <span>{review.product.price}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {limitedReviews < sortedReviews.length && (
                <div className="reviews__list-load-btn">
                    <Button
                        onClick={loadMoreReviews}
                        sx={{width: 150,
                            fontFamily: "Comfortaa",
                            color: "#000",
                            borderColor: "#000",
                        }} variant="outlined">
                        Load more
                    </Button>
                </div>
            )}
        </div>
    );
};

