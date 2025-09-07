'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import './wishlists.css'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import EmptyWishlistComponent from './EmptyWishlistComponent';
import {footerPageConfig, productConfig} from '../../config/pages.config';
import Link from 'next/link';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import sortArray from "../../utils/SortArray";
import WishlistCard from '../../lib-components/WishlistCard';
import {useEffect, useState} from "react";
import {deleteAllProductFromWishlist} from "../../features/slices/productPageReducer";
import {useAppDispatch} from "../../store/hooks";
import {usePathname} from "next/navigation";

type Anchor = 'top' | 'left' | 'bottom' | 'right';


export interface WishlistItem {
    id: number;
    title: string;
    slug: string;
    image: string | null;
    price: number | null;
    rating: number | null;
}

export default function Wishlists({initialItems} : {initialItems : WishlistItem[]}) {
    const [state, setState] = React.useState({
        right: false
    });
    const dispatch = useAppDispatch();
    const [expanded, setExpanded] = useState(false);
    const [wishlistItems, setWishlistItems] = React.useState<WishlistItem[]>(initialItems);
    const sortedWishlistData = sortArray(wishlistItems, "desc");
    const currentPathname = usePathname();

    const onWishlistPage = currentPathname === `/pages/${footerPageConfig.WISHLISTS}`;

    useEffect(() => {

        const ws = new WebSocket("ws://localhost:5000");

        ws.onmessage = (e: MessageEvent) => {
            const message = JSON.parse(e.data as string);

            if (message.type === "wishlist_created") {
                setWishlistItems((prev) => [...prev, message.item]);}
            if (message.type === "wishlist_cleared") {
                setWishlistItems([]);
            }
        };

        return () => ws.close();
    }, []);

    const deleteAllFromWishlist = async (data) => {
        dispatch(deleteAllProductFromWishlist({ data }));
        setWishlistItems([]);
    };

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
                    {/*<div className="wishlist__root-add-btn">*/}
                    {/*    <Button*/}
                    {/*        variant="contained"*/}
                    {/*        sx={{*/}
                    {/*            width: '100%',*/}
                    {/*            boxShadow: 'unset',*/}
                    {/*            backgroundColor: '#FFFFFF',*/}
                    {/*            color: '#000',*/}
                    {/*            border: '1px solid black',*/}
                    {/*            borderRadius: '30px',*/}
                    {/*            ":hover": {*/}
                    {/*                boxShadow: 'unset',*/}
                    {/*                backgroundColor: '#FFFFFF',*/}
                    {/*            },*/}

                    {/*        }}*/}
                    {/*    >*/}
                    {/*        + Add a new list*/}
                    {/*    </Button>*/}
                    {/*</div>*/}
                    <div className="wishlist__root-list-header">
                        <div
                            onClick={() => setExpanded(!expanded)}
                            className="wishlist__root-list-title"
                        >
                            <ArrowDropDownIcon
                                sx={{
                                    transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.3s',
                                    color: '#777E90',
                                }}
                            />
                            <span>Favorites ({sortedWishlistData.length})</span>

                        </div>
                        <div className="wishlist__root-list-divider"></div>
                        <div className="wishlist__root-list-options">
                            <button
                                onClick={() => {deleteAllFromWishlist(wishlistItems)}}
                                className="wishlist__root-list-options-btn">
                                <p className="wishlist__root-list-options-text">
                                    Delete
                                </p>
                            </button>
                        </div>
                    </div>
                </div>
                {sortedWishlistData.length ? (
                    <ul className={`wishlists__list ${expanded ? 'hidden' : ''}`}>
                        {sortedWishlistData.map((item, id) => (
                                <Link href={`/${productConfig.PRODUCT}/${item.slug}`} key={id}>
                                    <WishlistCard key={id} image={item.image} title={item.title} price={item.price}/>
                                </Link>
                            )
                        )}
                    </ul>
                ) : (
                    <ul className={`${expanded ? 'hidden' : ''}`}>
                        <EmptyWishlistComponent />
                    </ul>
                )}
            </div>
        </Box>
    );

    return (
        <div className={`wishlists ${onWishlistPage ? "hidden" : ""}`}>
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