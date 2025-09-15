import WishlistClientComponent from "./WishlistClientComponent";
import { authOptions } from "../../config/auth";
import { getServerSession } from "next-auth";

async function getWishlistData(token: string) {
    try {
        const res = await fetch(`https://framelane-2.onrender.com/wishlist`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            cache: "no-store",
        });

        if (!res.ok) {
            console.error("Ошибка при запросе wishlist:", res.status, res.statusText);
            return [];
        }

        return await res.json();
    } catch (e) {
        console.error("Ошибка соединения:", e);
        return [];
    }
}

export default async function WishlistServerComponent() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.accessToken) {
        return <div>Пожалуйста, войдите, чтобы просмотреть список желаемого</div>;
    }

    // ✅ передаём токен
    const wishlistItem = await getWishlistData(session.user.accessToken);

    return (
        <WishlistClientComponent
            initialItems={wishlistItem}
            token={session.user.accessToken}
        />
    );
}
