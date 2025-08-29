import WishlistClientComponent from "./WishlistClientComponent";

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

export default async function WishlistServerComponent() {

    const wishlistItem = await getWishlistData();

    return <WishlistClientComponent wishlistItems={wishlistItem} />;
}
