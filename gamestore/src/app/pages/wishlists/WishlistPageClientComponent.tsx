"use client"

import React, {useState} from 'react';
import "./wishlistpage.css"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {deleteAllProductFromWishlist} from "../../../features/slices/productPageReducer";
import {useAppDispatch} from "../../../store/hooks";
import {WishlistItem} from "../../../floating-widgets/wishlists/WishlistClientComponent";
import sortArray from "../../../utils/SortArray";
import Link from "next/link";
import {productConfig} from "../../../config/pages.config";
import WishlistCard from "../../../lib-components/WishlistCard";
import EmptyWishlistComponent from "../../../floating-widgets/wishlists/EmptyWishlistComponent";

export default function WishlistPage ({wishlistPageData} : {wishlistPageData : WishlistItem[]}) {
    const dispatch = useAppDispatch();
    const [expanded, setExpanded] = useState(false);
    const [wishlistItems, setWishlistItems] = React.useState<WishlistItem[]>(wishlistPageData);
    const sortedWishlistData = sortArray(wishlistItems, "desc");

    const deleteAllFromWishlist = async (data) => {
        dispatch(deleteAllProductFromWishlist({ data }));
        setWishlistItems([]);
    };


    return (
        <div className="wishlist__page">
            <div className="wishlist__page-wrapper">
                <div className="wishlist__page-heading">
                    <h1 className="wishlist__page-title">
                        My Wishlist
                    </h1>
                </div>
                <div className="wishlist__content">
                    <div className="wishlist__content-options">
                        <div className="wishlist__options-list-header">
                            <div
                                onClick={() => setExpanded(!expanded)}
                                className="wishlist__options-list-title"
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
                            <div className="wishlist__options-list-divider"></div>
                            <div className="wishlist__options-list-delete">
                                <button
                                    onClick={() => deleteAllFromWishlist(sortedWishlistData)}
                                    className="wishlist__options-list--btn">
                                    <p className="wishlist__options-list-text">
                                        Delete
                                    </p>
                                </button>
                            </div>
                        </div>
                    </div>
                    {sortedWishlistData.length ? (
                        <ul className={`wishlists__page-list ${expanded ? 'hidden' : ''}`}>
                            {sortedWishlistData.map((item, id) => (
                                    <Link href={`/${productConfig.PRODUCT}/${item.slug}`} key={id} target="_blank">
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
            </div>
        </div>
    );
};

