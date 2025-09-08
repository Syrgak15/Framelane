import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addProductToWishlist, deleteProductFromWishlist } from '../features/slices/productPageReducer';
import { useAppDispatch } from "../store/hooks";
import { useEffect, useCallback } from "react";
import { WishlistItem } from "../floating-widgets/wishlists/WishlistClientComponent";

type Props = {
    data: WishlistItem;
    wishlistItems: WishlistItem[];
};

export default function AutoHideSnackbar({ data, wishlistItems }: Props) {
    const [open, setOpen] = React.useState(false);
    const [inWishlist, setInWishlist] = React.useState(false);
    const [product, setProduct] = React.useState<WishlistItem | null>(data);
    const dispatch = useAppDispatch();

    const addToWishlist = useCallback((item: WishlistItem) => {
        dispatch(addProductToWishlist({ data: item }));
    }, [dispatch]);

    const deleteFromWishlist = useCallback((item: WishlistItem) => {
        dispatch(deleteProductFromWishlist({ data: item }));
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
                setProduct(message.item as WishlistItem);
            }
            if (message.type === "wishlist_cleared") {
                setProduct(null);
            }
        };

        return () => ws.close();
    }, []);

    const handleClick = (item: WishlistItem | null) => {
        setOpen(true);

        const exists = wishlistItems.some(p => p.slug === item.slug);
        if (exists) {
            deleteFromWishlist(item);
            setInWishlist(false);
        } else {
            addToWishlist(item);
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
                disabled={!product}
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
                onClick={() => handleClick(product)}
                variant="outlined"
            >
                <FavoriteIcon />
            </Button>

            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={inWishlist ? (
                    `You've added ${product?.title} to your Wishlist🖤`
                ) : (
                    `You've removed ${product?.title} from your Wishlist`
                )}
            />
        </div>
    );
}
