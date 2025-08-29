
import * as React from 'react';
import "../products/products.css";
import MediaCard from "../../lib-components/MediaCard";
import Link from 'next/link';
import { headerPageConfig } from '../../config/pages.config';
import { productConfig } from '../../config/pages.config';

type Reviews = {
    product: {
        id: number;
        title: string;
        slug: string;
        image: string;
        price: string;
        product: {
            description: string;
            features: string[];
            materials: string;
            size: string;
        };
        delivery: {
            shipping_options: string[];
            cost: string;
            returns: string;
            international: string;
        };
    };
}

type Props = {
    glassesData: Reviews[];
}

const MainPageClient: React.FC<Props> = ({glassesData}) => {

    const filteredGlasses = glassesData;


    return <>
        <div className="products-wrapper">
            <div className="products-heading">
                <span className="products-heading__title">Products</span>
                <Link href={`/${headerPageConfig.COLLECTIONS}`} target="_blank">
                    <button className="products-heading__btn">SHOP ALL</button>
                </Link>
            </div>
            {filteredGlasses && (
                <ul className="products-list">
                    {filteredGlasses.map((glass, index) => (
                        <Link href={`/${productConfig.PRODUCT}/${glass.slug}`} key={index} target="_blank">
                            <MediaCard key={index} image={glass.image} title={glass.title} price={glass.price}/>
                        </Link>
                    ))}
                </ul>
            )}
        </div>
    </>
}

export default MainPageClient;


