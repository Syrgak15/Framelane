import WishlistPageClientComponent from "./WishlistPageClientComponent";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../config/auth";

async function getWishlistData() {
    const session = await getServerSession(authOptions)

    try{
        const res = await fetch(`${process.env.NEXTAUTH_URL}/wishlist`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session!.user?.accessToken}`
            },
            cache: "no-store",
        });

        const data = await res.json();

        return data;

    }catch(e){
        console.error(e);
    }
}

export default async function WishlistPageServerComponent () {
    const session = await getServerSession(authOptions)

    const wishlistPageData = await getWishlistData();

    return <WishlistPageClientComponent wishlistPageData={wishlistPageData} token={session!.user.accessToken ?? ""} />
}