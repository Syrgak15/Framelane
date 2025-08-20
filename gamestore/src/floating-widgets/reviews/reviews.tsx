'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import '@/floating-widgets/reviews/reviews.css';


export default function Reviews() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box
            className="reviews-drawer__wrapper"
            sx={{ width: 390 }}
            role="dialog"
            aria-labelledby="reviews-title"
        >
            <div className="reviews-drawer__header">
                <div className="reviews-drawer__heading">
                    <h2 id="reviews-title" className="reviews-drawer__title">
                        Our Reviews
                    </h2>
                    <button
                        className="reviews-drawer__close-icon"
                        onClick={toggleDrawer(false)}
                        aria-label="Close"
                    >
                        <CloseRoundedIcon/>
                    </button>
                </div>

                <div className="reviews-drawer__subheading">
                    <div className="reviews-drawer__star">
                        <StarRateRoundedIcon sx={{ paddingTop: 1 }}/>
                        <span className="reviews-drawer__average">4.5</span>
                        <span className="reviews-drawer__total">74 reviews</span>
                    </div>

                    <div className="reviews-drawer__btn">
                        <Button sx={{ width: 135 }} variant="outlined">Write a review</Button>
                    </div>
                </div>
            </div>

            <Divider />
        </Box>
    );

    return (
        <div className="reviews">
            {!open && (
                <Button
                    className="reviews-drawer__btn"
                    onClick={toggleDrawer(true)}
                >
                    Reviews
                </Button>
            )}

            <Drawer
                className="reviews-drawer__list"
                anchor="left"
                open={open}
                onClose={toggleDrawer(false)}
            >
                {DrawerList}
            </Drawer>
        </div>
    );
}
