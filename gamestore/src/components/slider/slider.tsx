import SliderClientComponent from "./SliderClientComponent";

async function getSliderReviews () {

    const res = await fetch(`http://localhost:5000/reviews?limit=15`, {
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    })

    if(!res.ok) {
        return [];
    }
    return await res.json();
}

export default async function SliderServerComponent () {

    const slidesData = await getSliderReviews();

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

    const preparedSlides = slidesData.map((item, index) => {
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

    return <SliderClientComponent slides={preparedSlides} />;
}