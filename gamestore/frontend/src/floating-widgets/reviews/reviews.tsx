import React from 'react';
import ReviewsClientComponent from './ReviewsClientComponent';

export type Reviews = {
    id: number;
    name: string;
    email: string;
    rating: number;
    content: string;
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
    const res = await fetch(`http://localhost:5000/reviews?limit=20`, {
        cache: "no-store",
    });

    if (!res.ok) {
        return [];
    }

    return res.json();
}

async function ReviewsServerComponent ()  {
    const allReviews = await getReviews();

    const fakeNames = ["Emma", "Liam", "Olivia", "Noah", "Sophia", "James", "Isabella", "Ethan"];
    const fakeReviews = [
        "Absolutely love this product! The quality exceeded my expectations.",
        "Great value for the price. Will definitely order again!",
        "The design is sleek and stylish — highly recommend.",
        "Delivery was fast and the product works perfectly.",
        "Amazing! I got so many compliments already.",
        "Good quality overall, though packaging could be better.",
    ];

    const preparedSlides = allReviews.map((item, index) => {
        const randomName = fakeNames[index % fakeNames.length];
        const randomReview = fakeReviews[index % fakeReviews.length];

        return {
            ...item,
            name: item.name && item.name !== "Anonymous" ? item.name : randomName,
            email:
                item.email && item.email !== "unknown@example.com"
                    ? item.email
                    : `${randomName.toLowerCase()}@example.com`,
            content: item.content || randomReview,
        };
    });
    return <ReviewsClientComponent reviews={preparedSlides} />;
};

export default ReviewsServerComponent;