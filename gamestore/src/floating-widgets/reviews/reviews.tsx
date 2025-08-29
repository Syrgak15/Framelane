import React from 'react';
import ReviewsClientComponent from './ReviewsClientComponent';

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



async function getReviews(): Promise<Reviews[]> {
    const res = await fetch(`http://localhost:5000/reviews?limit=30`, {
        cache: "no-store",
    });

    if (!res.ok) {
        return [];
    }

    return res.json();
}

async function ReviewsServerComponent ()  {
    const allReviews = await getReviews();

    return <ReviewsClientComponent reviews={allReviews} />;
};

export default ReviewsServerComponent;