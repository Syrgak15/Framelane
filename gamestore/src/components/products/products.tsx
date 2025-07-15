'use client'
import * as React from 'react';
import '@/components/products/products.css';
import MediaCard from "../../lib-components/MediaCard";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {postThenGetData} from "../../features/slices/mainpageReducer";
import {RootState} from "../../store";


export const Products: React.FC = () => {

    const dispatch = useAppDispatch();
    const glassesData = useAppSelector((state:RootState) => state.mainReducer.result);;
    const Redirection = () => {
        window.location.assign('/collections');
    }

    useEffect(() => {
        dispatch(postThenGetData([
            {
                name: 'Clubmaster sunglasses',
                image: 'https://www.darlingstopt.com.au/wp-content/uploads/2024/03/moscot-dahven.jpg',
                price: '$115'
            },
            {
                name: 'Aviator sunglasses',
                image: 'https://moscot.com/cdn/shop/products/hyman-color-black-pos-2.jpg?v=1691335558&width=1024',
                price: '$2215'
            },
            {
                name: 'Wayfarer sunglasses',
                image: 'https://voskins.com/cdn/shop/products/lemtosh-color-tobacco-pos-2_1200x_2c7c747c-9b04-47e7-81f8-4f43edd4473c_1200x.jpg?v=1570564523',
                price: '$15'
            },
            {
                name: 'Moyel',
                image: 'https://moscot.com/cdn/shop/files/golda-color-light-blue-pos-2.jpg?v=1728595665&width=2295',
                price: '$155'
            }
        ]));

    }, [dispatch]);

    return <>
        <div className="productsWrapper">
            <div className="productsHeading">
                <span className="productsHeading__title">Products</span>
                <button onClick={Redirection} className="productsHeading__btn">SHOP ALL</button>
            </div>
            {Array.isArray(glassesData) && (
                <ul className="productsList">
                    {glassesData.map((glass, index) => (
                        <MediaCard key={index} image={glass.image} title={glass.name} price={glass.price}/>
                    ))}
                </ul>
            )}
        </div>
    </>
}

export default Products;


