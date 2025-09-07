import WishlistPageClientComponent from "./WishlistPageClientComponent";

async function getWishlistData() {
    const res = await fetch(`http://localhost:5000/wishlist`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Product not found");
    }

    const data = await res.json();
    return data;
}

export default async function WishlistPageServerComponent () {

    const wishlistPageData = await getWishlistData();

    return <WishlistPageClientComponent wishlistPageData={wishlistPageData} />
}