'use client'

import React, {useEffect} from 'react';
import "./collections.css"
import Accordion from '../../lib-components/Accordion';
import MediaCollectionCard from "../../lib-components/MediaCollectionCard";
import Footer from "../../components/footer/footer";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {RootState} from "../../store";
import {getCollectionsData} from "../../features/slices/collectionsPageReducer";


type SortOrder = 'asc' | 'desc';

const CollectionsPage:React.FC = () => {

    const [priceSortOrder, setPriceSortOrder] = React.useState<SortOrder>('asc');
    const [alphabetSortOrder, setAlphabetSortOrder] = React.useState<SortOrder>('desc');
    const posts = useAppSelector((state: RootState) => state.collectionReducer.collections);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCollectionsData());
    }, [dispatch]);

    if(!posts) return;

    const getPrice = (price: string) => {
        return Number((price.replace(/^\$/, '')))
    };

    const sortedPosts = [...posts].sort((a, b) => {
        const priceA = getPrice(a.price);
        const priceB = getPrice(b.price);

        if (priceSortOrder) {
            return priceSortOrder === "asc"
                ? priceA - priceB
                : priceB - priceA;
        }

        if (alphabetSortOrder) {
            return alphabetSortOrder === "asc"
                ? a.title.localeCompare(b.title)
                : b.title.localeCompare(a.title);
        }

        return 0;
    });


    const changePriceSortOrder = () => {
        setPriceSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
        setAlphabetSortOrder(null);
    }

    const changeAlphabetSortOrder = () => {
        setAlphabetSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
        setPriceSortOrder(null);
    }
    return (
        <>
            <div className="collections">
                <div className="collections-wrapper">
                    <div className="collections-header">
                        <h2 className="collections-header__title">
                            PRODUCTS
                        </h2>
                    </div>

                    <div className="collections-content">
                        <div className="collections-content-filters__form">
                            <div
                                onClick={changePriceSortOrder}
                                className="collections-filters__item filtering">
                                <Accordion title="Price" />
                            </div>
                            <div
                                onClick={changeAlphabetSortOrder}
                                className="collections-filters__item sorting">
                                <Accordion title="Alphabetically" />
                            </div>
                        </div>
                    </div>
                    <div className="collections-grid">
                        {sortedPosts.map((post) => (
                            <MediaCollectionCard title={post.title} key={post.id} image={post.image} price={post.price} />
                        ))}
                    </div>
                </div>
            </div>
            <Footer/>
        </>

    );
};

export default CollectionsPage;