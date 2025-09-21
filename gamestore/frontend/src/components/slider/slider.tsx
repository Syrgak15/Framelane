import SliderClientComponent from "./SliderClientComponent";
import FakerReviews from "../../utils/FakerReviews";

async function getSliderReviews () {

    const res = await fetch(`https://framelane-2.onrender.com/reviews?limit=15`, {
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    })

    if(!res.ok) {
        return null;
    }

    const data = await res.json();
    return data;
}

export default async function SliderServerComponent () {

    const slidesData = await getSliderReviews();
    const preparedSlides = FakerReviews({slides: slidesData});

    return <SliderClientComponent slides={preparedSlides} />;
}