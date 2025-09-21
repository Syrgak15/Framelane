
import * as React from 'react';
import "../products/products.css";
import MediaCard from "../../lib-components/MediaCard";
import Link from 'next/link';
import { headerPageConfig } from '../../config/pages.config';
import { productConfig } from '../../config/pages.config';
import {GlassesSlider} from "../../config/types";

export default function MainPageClient({glassesData}: {glassesData: GlassesSlider[]})  {
    
    return (
        <div className="products-wrapper">
            <div className="products-heading">
                <span className="products-heading__title">Products</span>
                <Link href={`/${headerPageConfig.COLLECTIONS}`}>
                    <button className="products-heading__btn">SHOP ALL</button>
                </Link>
            </div>
            {glassesData && (
                <ul className="products-list">
                    {glassesData.map((glass, index) => (
                        <Link href={`/${productConfig.PRODUCT}/${glass.product.slug}`} key={index}>
                            <MediaCard key={index} image={glass.product.image} title={glass.product.title} price={glass.product.price}/>
                        </Link>
                    ))}
                </ul>
            )}
        </div>
    )
}


