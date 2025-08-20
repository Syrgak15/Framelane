"use client"

import React, { useState } from "react";
import "./collections.css";
import Accordion from "../../lib-components/Accordion";
import MediaCollectionCard from "../../lib-components/MediaCollectionCard";
import { getCollectionsData } from "../../features/slices/collectionsPageReducer";
import { store, RootState } from "../../store/index";
import { useSelector } from "react-redux";
import Link from "next/link";

type SortOrder = "asc" | "desc";


async function fetchCollectionsOnServer() {
    await store.dispatch(getCollectionsData() as any);
}

await fetchCollectionsOnServer();

export default function CollectionsPage () {
    const [priceSortOrder, setPriceSortOrder] = useState<SortOrder>("asc");
    const [alphabetSortOrder, setAlphabetSortOrder] = useState<SortOrder>("desc");

    const posts = useSelector((state: RootState) => state.collectionReducer.collections);
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

    if (!posts) return <p>Loading...</p>;

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
                        <Link key={post.id} href={`/product/${post.slug}`}>
                            <MediaCollectionCard title={post.title} image={post.image} price={post.price} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};
