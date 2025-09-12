import CollectionsClientComponent from "./CollectionsClientComponent";
import {getServerSession} from "next-auth";
import { authOptions } from "../../config/auth";

const session = await getServerSession(authOptions)

async function getCollectionsPageData () {
    try {
        const req = await fetch('http://localhost:5000/products?limit=50', {cache: "no-store"});
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
        const req = await fetch('http://localhost:5000/wishlist', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session!.user.accessToken}`,
            },
            cache: "no-store",
        },)
        const data = await req.json()

        if(!req.ok) {
            const errorData = (data && data.error) ? data.error : null;
            return errorData;
        }
        return data;
    }catch(e) {
        console.error(e);
    }
}

export default async function CollectionsServerComponent () {

    const getCollectionsData = await getCollectionsPageData();
    const getWishlistItems = await getFavoriteProducts();

    return <CollectionsClientComponent initialItems={getWishlistItems} posts={getCollectionsData} token={session!.user.accessToken} />
}