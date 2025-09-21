import {GlassesSlider} from "../config/types"

function FakerReviews({slides}: {slides: GlassesSlider[]}) {
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

    const preparedSlides = slides?.map((item, index) => {
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

    return preparedSlides;
}
export default FakerReviews;