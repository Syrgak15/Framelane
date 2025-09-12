import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {CollectionProduct} from "../../app/collections/CollectionsClientComponent";


interface CollectionsState {
    loading: boolean;
    error: string | null;
    wishlistItems: CollectionProduct[];
}


export const getWishlistItems = createAsyncThunk<CollectionProduct[], string>(
    'collections/getWishlistItems',
    async (token ) => {
        const res = await fetch("http://localhost:5000/wishlist", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            cache: "no-store",
        },)

        const data = await res.json();

        if (!res.ok) {
            const errorData = (data && data.error) ? data.error : null;
            return errorData;
        }

        return data;
    }
);

const initialState: CollectionsState = {
    loading: false,
    error: null,
    wishlistItems: [],
};

const collectionsReducer = createSlice({
    name: 'collections',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getWishlistItems.fulfilled, (state, action) => {
                state.loading = false;
                state.wishlistItems = action.payload;
            })
    },
});

export default collectionsReducer.reducer;
