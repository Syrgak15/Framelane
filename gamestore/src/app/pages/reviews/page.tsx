import ReviewsPageClientComponent from "./ReviewsPageClientComponent";
import {Reviews} from "../../../floating-widgets/reviews/reviews";

async function getReviews(): Promise<Reviews[]> {
    const res = await fetch(`http://localhost:5000/reviews?limit=50`, {
        cache: "no-store",
    });

    if (!res.ok) {
        return [];
    }

    return res.json();
}


export default async function ReviewsPageServerComponent () {

    const getAllReviews = await getReviews();

    return <ReviewsPageClientComponent initialReviews={getAllReviews} />
}