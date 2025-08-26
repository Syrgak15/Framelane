
import ProductPageClientComponent from "./ProductPageClientComponent";

type Product = {
    id: number;
    title: string;
    slug: string;
    image: string;
    price: string;
};

async function getProduct(slug: string): Promise<Product> {

    const res = await fetch(`http://localhost:5000/product/${slug}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Product not found");
    }

    const data = await res.json();
    return data;
}

export default async function ProductPage({ params }) {

    const {slug} = await params;

    const productInfoData = await getProduct(slug);

    return <ProductPageClientComponent productInfo={productInfoData}/>
}