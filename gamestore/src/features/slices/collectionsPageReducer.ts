import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {CollectionProduct} from "../../app/collections/CollectionsClientComponent";


interface CollectionsState {
    loading: boolean;
    error: string | null;
    wishlistItems: CollectionProduct[];
}

export const getWishlistItems = createAsyncThunk(
    'collections/getWishlistItems',
    async () => {
        const res = await fetch("http://localhost:5000/wishlist", {cache: "no-store"},)
        const data = await res.json();
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
