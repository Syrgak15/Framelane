import MainPageClient from "./MainPageClient";

async function getCollectionsData() {
    const res = await fetch(`http://localhost:5000/reviews`, {
        cache: "no-store",
    });

    if (!res.ok) {
        return [];
    }

    return res.json();
}

async function MainPage({}) {

    const getGlassesData = await getCollectionsData();

    return <MainPageClient
        glassesData={getGlassesData}
    />
}
export default MainPage;