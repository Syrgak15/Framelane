import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addProductToWishlist, deleteProductFromWishlist } from '../features/slices/productPageReducer';
import {useAppDispatch} from "../store/hooks";
import {useEffect} from "react";
import {WishlistItem} from "../floating-widgets/wishlists/WishlistClientComponent";

export default function AutohideSnackbar({data}: {data: WishlistItem}) {
    const [open, setOpen] = React.useState(false);
    const [isClicked, setIsClicked] = React.useState(false);
    const [wishlistItems, setWishlistItems] = React.useState<WishlistItem>(data);
    const dispatch = useAppDispatch();

    console.log(wishlistItems);

    const addToWishlist = async () => {
        dispatch(addProductToWishlist({ data }));
        setIsClicked(true);
    };

    const deleteFromWishlist = async () => {
        dispatch(deleteProductFromWishlist({ data }));
        setIsClicked(false);
    };

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:5000");

        ws.onmessage = (e: MessageEvent) => {
            const message = JSON.parse(e.data as string);

            if (message.type === "wishlist_created") {
                setWishlistItems(message.item);
            }
            if (message.type === "wishlist_cleared") {
                setWishlistItems(null);
            }
        };

        return () => ws.close();
    }, []);

    const handleClick = () => {
        setOpen(true);
        if (!Object.keys(wishlistItems).length) {
            deleteFromWishlist();
        } else {
            addToWishlist();
        }
    };


    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div>
            <Button
                className={`${isClicked}`}
                disableRipple
                sx={{
                border: "1px solid 3d6da3",
                borderRadius: "40px",
                width: '35px',
                height: '45px',
                marginTop: "35px",
                ...(Object.keys(wishlistItems).length ? {
                        backgroundColor: "#3d6da3",
                        color: "#fff",
                } : {
                    backgroundColor: "unset",
                    color: "#fff",
                })
            }}
                onClick={handleClick}
                variant="outlined">
                <FavoriteIcon/></Button>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={`${Object.keys(wishlistItems).length? `You've added ${data.title} to your Wishlist🖤` 
                    : 
                    `You've removed ${data.title} from your Wishlist`}`
                }
            />
        </div>
    );
}