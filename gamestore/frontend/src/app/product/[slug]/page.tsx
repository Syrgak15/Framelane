
import ProductPageClientComponent from "./ProductPageClientComponent";
import ReviewsWidget from "../ReviewsWidget";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../config/auth";

type Product = {
    id: number;
    title: string;
    slug: string;
    image: string;
    price: string;
};

type Review = {
    name: string;
    surname?: string;
    email: string;
    rating: number;
    content: string;
    createdAt: string;
    slug: string;
};

async function getProduct(slug: string): Promise<Product> {

    const res = await fetch(`${process.env.NEXTAUTH_URL}/product/${slug}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Product not found");
    }

    const data = await res.json();
    return data;
}

async function getReviews(slug: string): Promise<Review[]> {

    const res = await fetch(`${process.env.NEXTAUTH_URL}/reviews/${slug}`, {
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    if (!res.ok) {
        return [];
    }

    return res.json();
}

async function getWishlistData() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.accessToken) {
        return [];
    }
    const res = await fetch(`${process.env.NEXTAUTH_URL}/wishlist`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session!.user?.accessToken}`
        },
        cache: "no-store",
    });

    if (!res.ok) {
        return [];
    }

    const data = await res.json();
    return data;
}

export default async function ProductPage({ params }) {
    const session = await getServerSession(authOptions)

    const {slug} = await params;

    const productInfoData = await getProduct(slug);
    const reviewsData = await getReviews(slug);
    const wishlistItems = await getWishlistData()

    const fakeNames = ["Emma", "Liam", "Olivia", "Noah", "Sophia", "James", "Isabella", "Ethan"];
    const fakeSurnames = ["Johnson", "Smith", "Brown", "Taylor", "Davis", "Wilson", "Miller", "Anderson"];
    const fakeReviews = [
        "Absolutely love this product! The quality exceeded my expectations.",
        "Great value for the price. Will definitely order again!",
        "The design is sleek and stylish — highly recommend.",
        "Delivery was fast and the product works perfectly.",
        "Amazing! I got so many compliments already.",
        "Good quality overall, though packaging could be better.",
    ];

    const preparedSlides = reviewsData.map((item, index) => {
        const randomName = fakeNames[index % fakeNames.length];
        const randomSurname = fakeSurnames[index % fakeSurnames.length];
        const randomReview = fakeReviews[index % fakeReviews.length];

        return {
            ...item,
            name: item.name && item.name !== "Anonymous" ? item.name : randomName,
            surname: item.surname || randomSurname,
            email:
                item.email && item.email !== "unknown@example.com"
                    ? item.email
                    : `${randomName.toLowerCase()}.${randomSurname.toLowerCase()}@example.com`,
            content: item.content || randomReview,
        };
    });

    return <>
        <ProductPageClientComponent productInfo={productInfoData} wishlistItems={wishlistItems} token={session!.user?.accessToken ?? ""}/>
        <ReviewsWidget reviews={preparedSlides} slug={slug} token={session!.user?.accessToken ?? ""}/>
    </>
}