"use client"

import React, { useState } from "react";
import "./collections.css";
import Accordion from "../../lib-components/Accordion";
import MediaCollectionCard from "../../lib-components/MediaCollectionCard";
import Link from "next/link";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import Button from "@mui/material/Button";
import {addProductToWishlist, deleteProductFromWishlist} from "../../features/slices/productPageReducer";
import {useAppDispatch} from "../../store/hooks";

type CollectionProduct = {
        id: number;
        title: string;
        slug?: string;
        image: string;
        price: string;
        rating?: number | null;
        product?: {
            description: string;
            features: string[];
            materials: string;
            size: string;
        };
        delivery?: {
            shipping_options: string[];
            cost: string;
            returns: string;
            international: string;
        };
    };


type SortOrder = "asc" | "desc";

export default function CollectionsPage ({posts}: {posts: CollectionProduct}) {
    const [priceSortOrder, setPriceSortOrder] = useState<SortOrder>("asc");
    const [alphabetSortOrder, setAlphabetSortOrder] = useState<SortOrder>("desc");
    const [isClicked, setIsClicked] = React.useState(false);
    const [wishlistItems, setWishlistItems] = React.useState([]);
    const dispatch = useAppDispatch();
    const getPrice = (price: string) => Number(price.replace(/^\$/, ""));

    const sortedPosts = [...posts].sort((a, b) => {
        if (priceSortOrder) {
            const priceA = getPrice(a.price);
            const priceB = getPrice(b.price);
            return priceSortOrder === "asc" ? priceA - priceB : priceB - priceA;
        }
        if (alphabetSortOrder) {
            return alphabetSortOrder === "asc"
                ? a.title.localeCompare(b.title)
                : b.title.localeCompare(a.title);
        }
        return 0;
    });

    const changePriceSortOrder = () => {
        setPriceSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
        setAlphabetSortOrder(null);
    };

    const changeAlphabetSortOrder = () => {
        setAlphabetSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
        setPriceSortOrder(null);
    };

    const addToWishlist = async (data) => {
        dispatch(addProductToWishlist({ data }));
        setIsClicked(true);
    };

    const deleteFromWishlist = async (data) => {
        dispatch(deleteProductFromWishlist({ data }));
        setIsClicked(false);
    };

    const handleClick = (data) => {
        if (!wishlistItems.includes(data.id)) {
            setWishlistItems([...wishlistItems, data.id]);
            addToWishlist(data);
        } else {
            setWishlistItems((prev) => prev.filter((currentId) => currentId !== data.id));
            deleteFromWishlist(data);
        }
    };

    return (
        <div className="collections">
            <div className="collections-wrapper">
                <div className="collections-header">
                    <h2 className="collections-header__title">PRODUCTS</h2>
                </div>

                <div className="collections-content">
                    <div className="collections-content-filters__form">
                        <div onClick={changePriceSortOrder} className="collections-filters__item filtering">
                            <Accordion title="Price" />
                        </div>
                        <div onClick={changeAlphabetSortOrder} className="collections-filters__item sorting">
                            <Accordion title="Alphabetically" />
                        </div>
                    </div>
                </div>

                <div className="collections-grid">
                    {sortedPosts.map((post) => (
                        <Link className="collections__grid-link" key={post.id} href={`/product/${post.slug}`} target="_blank">
                            <Button
                                className={`${isClicked}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleClick(post);
                                }}
                                disableRipple
                                sx={{
                                    zIndex: '1000',
                                    position: 'absolute',
                                    top: "10px",
                                    right: "-10px",
                                    fill: 'red',
                                    backgroundColor: 'unset',
                                    ":hover": {
                                        cursor: 'pointer',
                                        backgroundColor: 'unset',
                                    },
                                }}
                            >
                                {!wishlistItems.includes(post.id) ? (
                                    <FavoriteBorderOutlinedIcon
                                        sx={{
                                            fill: 'red',
                                            backgroundColor: 'unset',
                                            cursor: 'pointer',
                                        }}
                                    />
                                ) : (
                                    <FavoriteOutlinedIcon
                                        sx={{
                                            fill: 'red',
                                            backgroundColor: 'unset',
                                            cursor: 'pointer',
                                        }}
                                    />
                                )}

                            </Button>
                            <MediaCollectionCard title={post.title} image={post.image} price={post.price} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};
