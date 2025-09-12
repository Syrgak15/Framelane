import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export type Product = {
    title: string;
    image: string;
    price: string;
    slug: string; // slug обязателен
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
    token: string;
};

export type WishlistProduct = {
    id: number;
    title: string;
    slug: string;
    image: string;
    price: string;
    rating?: number | null;
};

export type AddToWishlistArgs = {
    data: {
        title: string;
        slug: string;
        image?: string | null;
        price?: string | null;
        rating?: number | string | null;
    };
    token: string;
};

export type DeleteFromWishlistArgs = {
    slug: string;
    token: string;
};

export type ApiError = { error: string };



type ProductPageState = {
    currentProduct: Product | null;
    reviews: ProductReview[];
    wishlist: WishlistProduct[];
}
const initialState: ProductPageState = {
    currentProduct: null,
    reviews: [],
    wishlist: [],
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
    async ({ slug, data, token }, { rejectWithValue }) => {
        try {
            const res = await fetch(`http://localhost:5000/reviews/${slug}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                const err = await res.json().catch(() => null);
                throw new Error(err?.error || `HTTP ${res.status}`);
            }
            return await res.json() as ProductReview;
        } catch (e) {
            const err = e as Error;
            return rejectWithValue(err.message ?? 'Unknown error');
        }
    }
);


export const addProductToWishlist = createAsyncThunk<
    WishlistProduct,
    AddToWishlistArgs,
    { rejectValue: ApiError }
>(
    "product/addProductToWishlist",
    async ({ data, token }, { rejectWithValue }) => {
        try {
            const res = await fetch("http://localhost:5000/wishlist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(data), // только бизнес-данные
            });

            const payload = await res.json();

            if (!res.ok) {
                return rejectWithValue(payload as ApiError);
            }

            const item = (payload?.item ?? payload) as WishlistProduct;
            return item;
        } catch {
            return rejectWithValue({ error: "Network error" });
        }
    }
);


export const deleteProductFromWishlist = createAsyncThunk<
    { slug: string },
    DeleteFromWishlistArgs,
    { rejectValue: ApiError }
>(
    "product/deleteProductFromWishlist",
    async ({ slug, token }, { rejectWithValue }) => {
        try {
            const res = await fetch("http://localhost:5000/wishlist", {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }});

            const payload = await res.json();

            if (!res.ok) {
                return rejectWithValue(payload as ApiError);
            }

            return { slug: payload?.slug ?? slug };
        } catch {
            return rejectWithValue({ error: "Network error" });
        }
    }
);


export const deleteAllProductFromWishlist = createAsyncThunk<
    { status : string },
    { token: string },
    { rejectValue: ApiError }
>(
    "product/deleteAllProductFromWishlist",
    async ({ token  }, { rejectWithValue }) => {
        try {
            const res = await fetch("http://localhost:5000/wishlist/all", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            const payload = await res.json();

            if (!res.ok) {
                return rejectWithValue(payload as ApiError);
            }

            return payload as { status: string };
        } catch {
            return rejectWithValue({ error: "Network error" });
        }
    }
);


const productReducer = createSlice({
    name: "products",
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
            .addCase(addProductToWishlist.fulfilled, (state, action) => {
                state.wishlist.push(action.payload);
            })
            .addCase(deleteProductFromWishlist.fulfilled, (state, action) => {
                state.wishlist = state.wishlist.filter(
                    (w) => w.slug !== action.payload.slug
                );
            })
            .addCase(deleteAllProductFromWishlist.fulfilled, (state) => {
                state.wishlist = [];
            });
    },
});


export default productReducer.reducer;
