import MainPageClient from "./MainPageClient";



async function getCollectionsData() {
    const res = await fetch(`https://framelane-2.onrender.com/products?limit=4`, {
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