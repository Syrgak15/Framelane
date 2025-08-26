import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export type Product = {
    title: string;
    slug: string;
    image: string;
    price: string;
};

interface MainState {
    loading: boolean;
    error: string | null;
    result: Product[];
}

export const getMainPageCollectionsData = createAsyncThunk(
    'main/getMainPageCollectionsData',
    async () => {
        const res = await fetch("http://localhost:5000/products/", {cache: "no-store"},)
        const data = await res.json();
        return data;
    }
);

const initialState: MainState = {
    loading: false,
    error: null,
    result: [],
};

const mainReducer = createSlice({
    name: 'main',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMainPageCollectionsData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMainPageCollectionsData.fulfilled, (state, action) => {
                state.loading = false;
                state.result = action.payload;
            })
            .addCase(getMainPageCollectionsData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Unknown error';
            })
    },
});

export default mainReducer.reducer;
