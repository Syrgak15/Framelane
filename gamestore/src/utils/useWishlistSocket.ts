// import { useState } from "react";
//
// interface WishlistItem {
//     id: number;
//     title: string;
//     slug: string;
//     image: string | null;
//     price: number | null;
//     rating: number | null;
// }
//
// export function useWishlistSocket(initialData: WishlistItem[]) {
//     const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(initialData);
//
//     const ws = new WebSocket("ws://localhost:5000");
//
//         ws.onmessage = (e: MessageEvent) => {
//             const message = JSON.parse(e.data as string);
//
//             if (message.type === "wishlist_created") {
//                 setWishlistItems((prev) => [...prev, message.item]);
//             }
//             if (message.type === "wishlist_updated") {
//                 setWishlistItems((prev) =>
//                     prev.map((p) => (p.id === message.item.id ? message.item : p))
//                 );
//             }
//             if (message.type === "wishlist_deleted") {
//                 setWishlistItems((prev) => prev.filter((p) => p.slug !== message.slug));
//             }
//             if (message.type === "wishlist_cleared") {
//                 setWishlistItems([]);
//             }
//         };
//
//     return wishlistItems;
// }
