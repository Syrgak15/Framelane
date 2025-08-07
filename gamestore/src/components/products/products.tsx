'use client'
import * as React from 'react';
import "../products/products.css";
import MediaCard from "../../lib-components/MediaCard";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {postThenGetData} from "../../features/slices/mainPageReducer";
import {RootState} from "../../store";


export const Products: React.FC = () => {
    const dispatch = useAppDispatch();
    const glassesData = useAppSelector((state:RootState) => state.mainReducer.result.data);
    const Redirection = () => {
        window.location.assign('/collections');
    }

    useEffect(() => {
        dispatch(postThenGetData([
            {
                name: 'Clubmaster sunglasses',
                image: 'https://www.darlingstopt.com.au/wp-content/uploads/2024/03/moscot-dahven.jpg',
                price: '$11.5'
            },
            {
                name: 'Aviator sunglasses',
                image: 'https://moscot.com/cdn/shop/products/hyman-color-black-pos-2.jpg?v=1691335558&width=1024',
                price: '$22.15'
            },
            {
                name: 'Wayfarer sunglasses',
                image: 'https://voskins.com/cdn/shop/products/lemtosh-color-tobacco-pos-2_1200x_2c7c747c-9b04-47e7-81f8-4f43edd4473c_1200x.jpg?v=1570564523',
                price: '$15.3'
            },
            {
                name: 'Moyel',
                image: 'https://dayalopticalsindia.com/cdn/shop/files/dahven-color-black-pos-2_1300x_63014558-cd19-4f98-ac57-e3d91b4d64e5.webp?v=1698818084',
                price: '$15.5'
            }
        ]));

    }, [dispatch]);

    return <>
        <div className="products-wrapper">
            <div className="products-heading">
                <span className="products-heading__title">Products</span>
                <button onClick={Redirection} className="products-heading__btn">SHOP ALL</button>
            </div>
            {Array.isArray(glassesData) && (
                <ul className="products-list">
                    {glassesData.map((glass, index) => (
                        <MediaCard key={index} image={glass.image} title={glass.name} price={glass.price}/>
                    ))}
                </ul>
            )}
        </div>
    </>
}

export default Products;


