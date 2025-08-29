import SliderClientComponent from "./SliderClientComponent";

async function getSliderReviews () {
    const res = await fetch(`http://localhost:5000/reviews?limit=15`, {
        cache: "no-store",
    })

    if(!res.ok) {
        return [];
    }
    return await res.json();
}

export default async function SliderServerComponent () {

    const slidesData = await getSliderReviews();

    return <SliderClientComponent slides={slidesData} />
}