export type Slides = {
    image: string;
}
export type GlassesSlider = {
    id: number;
    name: string;
    surname: string | null;
    email: string;
    content: string | null;
    rating: number;
    createdAt: string;
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
    user: unknown | null;
};

export type SliderData = {
    image: string;
    product: any;
    review: string;
    name: string;
    email?: string;
}