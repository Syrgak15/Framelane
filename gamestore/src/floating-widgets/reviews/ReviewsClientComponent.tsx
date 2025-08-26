'use client';

import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import '@/floating-widgets/reviews/reviews.css';
import Link from 'next/link';
import Box from '@mui/material/Box';

export type Reviews = {
    id: number;
    name: string;
    email: string;
    rating: number;
    review: string;
    createdAt: string;
    product: {
        id: number;
        title: string;
        slug: string;
        image: string;
        price: string;
        product: {
            description: string;
            features: string[];
            materials: string;
            size: string;
        };
        delivery: {
            shipping_options: string[];
            cost: string;
            returns: string;
            international: string;
        };
    };
};

export default function Reviews({reviews} : {reviews: Reviews[]}) {
    const [open, setOpen] = React.useState<boolean>(false);
    const [limitedReviews, setLimitedReviews] = React.useState<number>(7);
    const dateSortOrder = "desc";

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const loadMoreReviews = () => {
        setLimitedReviews(prev => prev + 7);
    }

    const averageReviews = reviews.length ? (
        reviews.reduce((sum, r) => sum + (r.rating ?? 0), 0) / reviews.length
    ) : 0;

    const sortedReviews = [...reviews].sort((a, b) => {
        if (!dateSortOrder) return 0;

        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();

        return dateSortOrder === "desc"
            ? timeB - timeA
            : timeA - timeB;
    });

    const DrawerList = (
        <Box
            className="reviews-drawer__wrapper"
            sx={{ width: 390 }}
            role="dialog"
            aria-labelledby="reviews-title"
        >
            <div className="reviews-drawer__header">
                <div className="reviews-drawer__heading">
                    <h2 id="reviews-title" className="reviews-drawer__title">
                        Our Reviews
                    </h2>
                    <button
                        className="reviews-drawer__close-icon"
                        onClick={toggleDrawer(false)}
                        aria-label="Close"
                    >
                        <CloseRoundedIcon/>
                    </button>
                </div>

                <div className="reviews-drawer__subheading">
                    <div className="reviews-drawer__star"
                         aria-label={`Average ${averageReviews.toFixed(1)} out of 5`}>
                        <StarRateRoundedIcon className="reviews-drawer__star-icon"/>
                        <span className="reviews-drawer__average">{averageReviews.toFixed(1)}</span>
                        <span className="reviews-drawer__total">{reviews.length} reviews</span>
                    </div>

                    <div className="reviews-drawer__btn">
                        <Button sx={{width: 150, fontFamily: "Comfortaa"}} variant="outlined">Write a review</Button>
                    </div>
                </div>
            </div>
            <Divider/>

            <div className="reviews__drawer-content">
                <div className="reviews__drawer-container">
                    <ul className="reviews__content-list">
                        {sortedReviews.slice(0, limitedReviews).map((el, id) => (
                            <li className="reviews__content-list-item" key={id}>
                                <div className="reviews__content-list-item-stars">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <StarRateRoundedIcon
                                            key={i}
                                            className={`star ${i < el.rating  ? 'is-on' : ''}`}
                                            fontSize="small"
                                        />
                                    ))}
                                    <time className="reviews__content-list-item-date" dateTime={el.createdAt}>
                                            {new Date(el.createdAt).toLocaleDateString()}
                                    </time>
                                </div>

                                <div className="reviews__content-list-item-headings">
                                    <span>{el.name} on</span>
                                    <Link
                                        target="_blank"
                                        className="reviews__content-list-item-link"
                                        href={`/product/${el.product.slug}`}>
                                        {el.product.title}
                                    </Link>
                                </div>

                                <div className="reviews__content-list-item-text">
                                    <p>{el.review}</p>
                                </div>

                            </li>
                        ))}

                        {limitedReviews < sortedReviews.length && (
                            <Box
                                sx={{display: "flex", justifyContent: "center"}}
                            >
                                <Button
                                    onClick={loadMoreReviews}
                                    sx={{width: 150,
                                        fontFamily: "Comfortaa",
                                        color: "#000",
                                        borderColor: "#000",
                                    }} variant="outlined">
                                    Load more
                                </Button>
                            </Box>
                        )}
                    </ul>
                </div>
            </div>
        </Box>
    );

    return (
        <div className="reviews">
            {!open && (
                <Button
                    className="reviews-drawer__btn"
                    onClick={toggleDrawer(true)}
                >
                    Reviews
                </Button>
            )}

            <Drawer
                className="reviews-drawer__list"
                anchor="left"
                open={open}
                onClose={toggleDrawer(false)}
            >
                {DrawerList}
            </Drawer>
        </div>
    );
}
