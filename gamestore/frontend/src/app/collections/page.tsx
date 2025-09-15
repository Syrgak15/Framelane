import CollectionsClientComponent from "./CollectionsClientComponent";
import {getServerSession} from "next-auth";
import { authOptions } from "../../config/auth";


async function getCollectionsPageData () {
    const session = await getServerSession(authOptions)
    try {
        const req = await fetch(`${process.env.NEXTAUTH_URL}/products/limit?=30`, {cache: "no-store"});
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
    const session = await getServerSession(authOptions)

    try {
        const req = await fetch(`https://framelane-2.onrender.com/wishlist`, {
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
    const session = await getServerSession(authOptions)
    if (!session?.user?.accessToken) {
        return <div>Пожалуйста, войдите, чтобы просмотреть список желаемого</div>;
    }
    const getCollectionsData = await getCollectionsPageData();
    const getWishlistItems = await getFavoriteProducts();

    return <CollectionsClientComponent initialItems={getWishlistItems} posts={getCollectionsData} token={session!.user.accessToken } />
}