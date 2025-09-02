import CollectionsClientComponent from "./CollectionsClientComponent";

type CollectionProduct = {
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
}

async function getCollectionsPageData ():Promise<CollectionProduct> {
    try {
        const req = await fetch('http://localhost:5000/products?limit=30', {cache: "no-store"});

        if(!req.ok) {
            throw new Error();
        }

        const data = await req.json()

        return data;
    }catch(e) {
        console.error(e);
    }
}

export default async function CollectionsServerComponent () {

    const getCollectionsData = await getCollectionsPageData();

    return <CollectionsClientComponent posts={getCollectionsData} />
}