'use client'

import React from "react";
import "./slug.css"
import BreadCrumbs from "../../../lib-components/BreadCrumbs";
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import highlights from "../../../data/product-page-data.json";
import CheckIcon from '@mui/icons-material/Check';
import AccordionGridProduct from "../../../lib-components/AccordionGridProduct";
import AccordionGridDelivery from "../../../lib-components/AccordionGridDelivery";
import {useAppDispatch} from "../../../store/hooks";
import {addProductToWishlist} from "../../../features/slices/productPageReducer";

type Product = {
    id: number;
    title: string;
    slug: string;
    image: string;
    price: string;
};


export default function ProductPage({ productInfo } : {productInfo: Product}) {
    const dispatch = useAppDispatch();

    const data = productInfo;

    const addToWishlist = async () => {
        await dispatch(addProductToWishlist({data}))
    }

    return <div className="product">
        <div className="product__wrapper">
            <div className="product__breadcrumbs">
                <BreadCrumbs title={productInfo.title}/>
            </div>

            <div className="product__content">
                <div className="product__image-wrapper product__section">
                    <img src={productInfo.image} alt={productInfo.title} className="product__image"/>
                </div>
                <div className="product__info-wrapper">
                    <div className="product__info">
                        <h2 className="product__title">{productInfo.title}</h2>

                        <div className="product__price">
                            <span>{productInfo.price}</span>
                            <p>Including prescription lenses</p>
                        </div>

                        <div className="product__btns">
                            <Button
                                sx={{
                                    background: "3d6da3",
                                    borderRadius: "40px",
                                    padding: "10px",
                                    width: "300px",
                                    marginTop: "35px"
                                }}
                                variant="contained">Buy it now</Button>
                            <Button
                                onClick={addToWishlist}
                                sx={{
                                    border: "1px solid 3d6da3",
                                    borderRadius: "40px",
                                    width: '65px',
                                    height: '45px',
                                    marginTop: "35px"
                                }}
                                variant="outlined"><FavoriteIcon/></Button>
                        </div>

                        <ul className="product__highlight-list">
                            {highlights.map((item) => (
                                <li className="product__highlight-list-item" key={item.id}>
                                    <CheckIcon sx={{fill: '#3d6da3', marginRight: '8px'}}/>
                                    <span>{item.title}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="product__details">
                <div className="product__details-accordion">
                    <AccordionGridProduct
                        productInfo={productInfo}
                        title="Product Info"
                    />
                </div>
                <div className="product__details-accordion">
                    <AccordionGridDelivery
                        deliveryInfo={productInfo}
                        title="Delivery"
                    />
                </div>
            </div>
        </div>
    </div>

}
