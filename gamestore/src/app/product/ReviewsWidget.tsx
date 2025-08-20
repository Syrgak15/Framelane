
type Review = {
    name: string;
    surname?: string;
    email: string;
    rating: number;
    review: string;
};

async function getReviews(slug: string): Promise<Review[]> {
    const res = await fetch(`http://localhost:5000/reviews/${slug}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        return [];
    }

    return res.json();
}

export default async function ReviewsWidget ({slug}: {slug: string}) {
    const reviews = await getReviews(slug);

    console.log(reviews);

    return (
        <div className="product__reviews-main">
            <div className="product__reviews-container">
                <div className="product__reviews-tab">
                    <button className="product__reviews-tab-btn">
                        <span>Reviews</span>
                    </button>
                </div>
                <div className="product__reviews-hr">
                </div>

                {reviews.map((review, id) => (
                    <div key={id} className="product__reviews-layout-reviews-list">
                        <ul className="product__reviews-list">
                            <li className="product__reviews-list-item">
                                <div className="product__reviews-list-item-body">
                                    <div className="review__avatar" aria-hidden="true"></div>
                                    <div className="review__content">
                                        <div className="review__header">
                                            <div>
                                                <span className="review__author">{review.name}</span>
                                            </div>
                                            <div className="review__rating" title="4 из 5">
                                                <span className="stars"></span>
                                            </div>
                                        </div>

                                        <p className="review__text">
                                            {review.review}
                                        </p>

                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                ))}
            </div>
        </div>
    );
};

