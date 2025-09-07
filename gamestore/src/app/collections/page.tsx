import CollectionsClientComponent from "./CollectionsClientComponent";

async function getCollectionsPageData () {
    try {
        const req = await fetch('http://localhost:5000/products?limit=30', {cache: "no-store"});

        if(!req.ok) {
            throw new Error();
        }

        const data = await req.json()

        return data;
    }catch(e) {
        console.error(e);
    }
}

async function getFavoriteProducts (){
    try {
        const req = await fetch('http://localhost:5000/wishlist', {cache: "no-store"});

        if(!req.ok) {
            throw new Error();
        }

        const data = await req.json()

        return data;
    }catch(e) {
        console.error(e);
    }
}

export default async function CollectionsServerComponent () {

    const getCollectionsData = await getCollectionsPageData();
    const getWishlistItems = await getFavoriteProducts();

    return <CollectionsClientComponent initialItems={getWishlistItems} posts={getCollectionsData} />
}