
import * as React from 'react';
import "../products/products.css";
import MediaCard from "../../lib-components/MediaCard";
import Link from 'next/link';
import { headerPageConfig } from '../../config/pages.config';
import { productConfig } from '../../config/pages.config';
import { Reviews } from '../../floating-widgets/reviews/ReviewsClientComponent';
import filteringObject  from "../../utils/UniqueByObjects";


type Props = {
    glassesData: Reviews[];
}

const MainPageClient: React.FC<Props> = ({glassesData}) => {

    const filteredGlasses = filteringObject(glassesData, ['product.title', 'product.image']).slice(0, 4)


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
                        <Link href={`/${productConfig.PRODUCT}/${glass.product.slug}`} key={index} target="_blank">
                            <MediaCard key={index} image={glass.product.image} title={glass.product.title} price={glass.product.price}/>
                        </Link>
                    ))}
                </ul>
            )}
        </div>
    </>
}

export default MainPageClient;


