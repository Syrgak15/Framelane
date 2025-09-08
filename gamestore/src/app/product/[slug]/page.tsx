
import ProductPageClientComponent from "./ProductPageClientComponent";
import ReviewsWidget from "../ReviewsWidget";

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
    review: string;
    createdAt: string;
    slug: string;
};

async function getProduct(slug: string): Promise<Product> {

    const res = await fetch(`http://localhost:5000/product/${slug}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Product not found");
    }

    const data = await res.json();
    return data;
}

async function getReviews(slug: string): Promise<Review[]> {
    const res = await fetch(`http://localhost:5000/reviews/${slug}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        return [];
    }

    return res.json();
}

async function getWishlistData() {
    const res = await fetch(`http://localhost:5000/wishlist`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Product not found");
    }

    const data = await res.json();
    return data;
}

export default async function ProductPage({ params }) {

    const {slug} = await params;

    const productInfoData = await getProduct(slug);
    const reviewsData = await getReviews(slug);
    const wishlistItems = await getWishlistData()

    return <>
        <ProductPageClientComponent productInfo={productInfoData} wishlistItems={wishlistItems}/>
        <ReviewsWidget reviews={reviewsData} slug={slug}/>
    </>
}