import WishlistClientComponent from "./WishlistClientComponent";
import {authOptions} from "../../config/auth";
import {getServerSession} from "next-auth";


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

export default async function WishlistServerComponent() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.accessToken) {
        return <div>Пожалуйста, войдите, чтобы просмотреть список желаемого</div>;
    }
    const wishlistItem = await getWishlistData();

    return <WishlistClientComponent initialItems={wishlistItem} token={session?.user?.accessToken} />;
}
