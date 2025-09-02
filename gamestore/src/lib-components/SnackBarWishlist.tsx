import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import FavoriteIcon from "@mui/icons-material/Favorite";
import {Product} from "../features/slices/mainPageReducer";
import { addProductToWishlist, deleteProductFromWishlist } from '../features/slices/productPageReducer';
import {useAppDispatch} from "../store/hooks";

export default function AutohideSnackbar({data}: {data: Product}) {
    const [open, setOpen] = React.useState(false);
    const [isClicked, setIsClicked] = React.useState(false);
    const dispatch = useAppDispatch();

    const addToWishlist = async () => {
        dispatch(addProductToWishlist({ data }));
        setIsClicked(true);
    };

    console.log(data)

    const deleteFromWishlist = async () => {
        dispatch(deleteProductFromWishlist({ data }));
        setIsClicked(false);
    };

    const handleClick = () => {
        setOpen(true);

        if (isClicked) {
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
                sx={{
                border: "1px solid 3d6da3",
                borderRadius: "40px",
                width: '35px',
                height: '45px',
                marginTop: "35px",
                ...(isClicked && {
                        backgroundColor: "#3d6da3",
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
                message={`${isClicked ? `You've added ${data.title} to your Wishlist🖤` 
                    : 
                    `You've removed ${data.title} from your Wishlist`}`
                }
            />
        </div>
    );
}