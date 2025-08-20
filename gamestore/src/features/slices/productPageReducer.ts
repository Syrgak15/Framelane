import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export type Product = {
    title: string;
    image: string;
    price: string;
    slug?: string;
};

export type ProductReview = {
    name: string;
    surname?: string;
    email: string;
    rating: number;
    review: string;
};

type PostProductReviewArgs = {
    slug: string;
    data: ProductReview;
};

type ProductPageState = {
    currentProduct: Product | null;
    reviews: ProductReview[];
}
const initialState: ProductPageState = {
    currentProduct: null,
    reviews: []
}

export const fetchProductBySlug = createAsyncThunk<Product, string>(
    'fetchBySlug',
    async (slug) => {
        const req = await fetch(`http://localhost:5000/products/${slug}`);
        if (!req.ok) throw new Error(`Product not found: ${req.status}`);
        const res = await req.json();
        return res;
    }
);

export const postProductReview = createAsyncThunk<ProductReview, PostProductReviewArgs>(
    'product/postProductReview',
    async ({ slug, data }, { rejectWithValue }) => {
        try {
            const res = await fetch(`http://localhost:5000/reviews/${slug}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                const err = await res.json().catch(() => null);
                throw new Error(err?.error || `HTTP ${res.status}`);
            }
            return await res.json() as ProductReview;
        } catch (e) {
            return rejectWithValue(e?.message ?? 'Unknown error');
        }
    }
);


export const getProductReviews = createAsyncThunk<ProductReview[], string>(
    'product/getProductReviews',
    async (slug) => {
        const res = await fetch(`http://localhost:5000/reviews/${slug}`);
        if (!res.ok) throw new Error(`Reviews not found: ${res.status}`);
        return await res.json() as ProductReview[];
    }
);


const productReducer = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductBySlug.fulfilled, (state, action) => {
                state.currentProduct = action.payload;
            })
            .addCase(postProductReview.fulfilled, (state, action) => {
                state.reviews.push(action.payload);
            })
            .addCase(getProductReviews.fulfilled, (state, action) => {
                state.reviews = action.payload;
            });
    },
});


export default productReducer.reducer;
