'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import './wishlists.css'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Divider from "@mui/material/Divider";
import EmptyWishlistComponent from '../EmptyWishlistComponent';
import {footerPageConfig, productConfig} from '../../../config/pages.config';
import Link from 'next/link';
import MediaCard from "../../../lib-components/MediaCard";
import sortArray from "../../../utils/SortArray";

type Anchor = 'top' | 'left' | 'bottom' | 'right';

type WishlistProps = {
    id: number,
    title: string,
    slug: string,
    image: string,
    price: string,
    rating: string;
}

export default function Wishlists({wishlistItems} : {wishlistItems : WishlistProps[]}) {
    const [state, setState] = React.useState({
        right: false
    });

    const sortedWishlistData = sortArray(wishlistItems, "desc");

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event &&
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 350 }}
            role="presentation"
        >
            <div className="wishlist__drawer-root">
                <div className="wishlist__root-header">
                    <div className="wishlist__root-close-icon">
                        <CloseRoundedIcon onClick={toggleDrawer(anchor, false)}/>
                    </div>
                    <div className="wishlist__root-title">
                        <h2>My Wishlists</h2>
                        <div className="wishlist_root-link">
                            <Link href={`/pages/${footerPageConfig.WISHLISTS}`} target="_blank">
                                <OpenInNewIcon/>
                            </Link>
                        </div>
                    </div>
                    <div className="wishlist__root-add-btn">
                        <Button
                            variant="contained"
                            sx={{
                                width: '100%',
                                boxShadow: 'unset',
                                backgroundColor: '#FFFFFF',
                                color: '#000',
                                border: '1px solid black',
                                borderRadius: '30px',
                                ":hover": {
                                    boxShadow: 'unset',
                                    backgroundColor: '#FFFFFF',
                                },

                            }}
                        >
                            + Add a new list
                        </Button>
                    </div>
                    <Divider sx={{marginTop: '35px'}}/>
                </div>
                {sortedWishlistData ? (
                    <ul className="wishlists__list">
                        {sortedWishlistData.map((item, id) => (
                                <Link href={`/${productConfig.PRODUCT}/${item.slug}`} key={id} target="_blank">
                                    <MediaCard key={id} image={item.image} title={item.title} price={item.price}/>
                                </Link>
                            )
                        )}
                    </ul>
                ) : (
                    <EmptyWishlistComponent />
                    )}
            </div>
        </Box>
    );

    return (
        <div className='wishlists'>
            {(['right'] as const).map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button
                        className={`wishlist-drawer__btn ${state.right ? 'hidden' : ''}`}
                        onClick={toggleDrawer(anchor, true)}>
                        Wishlist
                    </Button>
                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                    >
                        {list(anchor)}
                    </SwipeableDrawer>
                </React.Fragment>
            ))}
        </div>
    );
}