import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addProductToWishlist, deleteProductFromWishlist } from '../features/slices/productPageReducer';
import { useAppDispatch } from "../store/hooks";
import { useEffect, useCallback } from "react";
import { WishlistItem } from "../floating-widgets/wishlists/WishlistClientComponent";
import { Product } from "../../src/app/product/[slug]/ProductPageClientComponent";

type Props = {
    data: Product;
    wishlistItems: WishlistItem[];
    token: string;
};

type HandleClickProps = {
    token: string;
    item: Product;
    slug: string;
};

export default function AutoHideSnackbar({ data, wishlistItems, token }: Props) {
    const [open, setOpen] = React.useState(false);
    const [inWishlist, setInWishlist] = React.useState(false);
    const [product, setProduct] = React.useState<Product | null>(data);
    const dispatch = useAppDispatch();

    const addToWishlist = useCallback((item: Product, token: string) => {
        dispatch(addProductToWishlist({ data: {
                title: item.title,
                slug: item.slug,
                image: item.image ?? null,
                price: item.price != null ? String(item.price) : null,
                rating: item.rating ?? null
            }, token }));
    }, [dispatch]);

    const deleteFromWishlist = useCallback(({ slug, token }: { slug: string; token: string }) => {
        dispatch(deleteProductFromWishlist({ slug, token }));
    }, [dispatch]);

    useEffect(() => {
        const exists = wishlistItems.some(p => p.slug === data.slug);
        setInWishlist(exists);
    }, [wishlistItems, data.slug]);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:5000");

        ws.onmessage = (e: MessageEvent) => {
            const message = JSON.parse(e.data as string);

            if (message.type === "wishlist_created") {
                setProduct(message.item);
            }
            if (message.type === "wishlist_cleared") {
                setProduct(null);
            }
            if (message.type === "wishlist_item_removed") {
                setProduct(null);
            }
        };

        return () => ws.close();
    }, []);

    const handleClick = ({ item, token, slug }: HandleClickProps) => {
        setOpen(true);

        const exists = wishlistItems.some(p => p.slug === item.slug);

        if (exists) {
            deleteFromWishlist({ slug, token });
            setInWishlist(false);
        } else {
            addToWishlist(item, token);
            setInWishlist(true);
        }
    };

    const handleClose = (
        _event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    return (
        <div>
            <Button
                disableRipple
                sx={{
                    border: "1px solid #3d6da3",
                    borderRadius: "40px",
                    width: '35px',
                    height: '45px',
                    marginTop: "35px",
                    ...(inWishlist ? {
                        backgroundColor: "#3d6da3",
                        color: "#fff",
                    } : {
                        backgroundColor: "unset",
                        color: "#3d6da3",
                    })
                }}
                onClick={() => handleClick({ item: product, token, slug: product.slug })}
                variant="outlined"
            >
                <FavoriteIcon />
            </Button>

            <Snackbar
                sx={{zIndex: '100', marginTop: '55px'}}
                open={open}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                autoHideDuration={2000}
                onClose={handleClose}
                message={inWishlist
                    ? `You've added ${product?.title} to your Wishlist🖤`
                    : `You've removed ${product?.title} from your Wishlist`
                }
            />
        </div>
    );
}
