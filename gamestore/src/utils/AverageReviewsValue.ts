function CountAverageReviewsValue (arr) {
    return arr.length ? (
        arr.reduce((sum, r) => sum + (r.rating ?? 0), 0) / arr.length
    ).toFixed(1) : 0;
}

export default CountAverageReviewsValue;