import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';

interface SlidesPayload {
    image: string;
}
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
    slides: any;
}

export const getMainPageCollectionsData = createAsyncThunk(
    'main/getMainPageCollectionsData',
    async () => {
        const res = await fetch("http://localhost:5000/products/", {cache: "no-store"},)
        const data = await res.json();
        return data;
    }
);

export const postSlidesThenGetData = createAsyncThunk(
    'banner/postSlidesThenGetData',
    async (payload: SlidesPayload[] ) => {
        const postResponse = await fetch ('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })

        if(!postResponse.ok) {
            throw new Error('Failed to post data');
        };

        const query = new URLSearchParams({
            items: JSON.stringify(payload),
        });
        const getResponse = await fetch(`/api/data?${query.toString()}`);


        if (!getResponse.ok) {
            throw new Error('Failed to get data');
        };

        const data = await getResponse.json();

        return data;
    }
)

const initialState: MainState = {
    loading: false,
    error: null,
    result: [],
    slides: [],
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
            .addCase(postSlidesThenGetData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postSlidesThenGetData.fulfilled, (state, action) => {
                state.loading = false;
                state.slides = action.payload;
            })
            .addCase(postSlidesThenGetData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Unknown error';
            });
    },
});

export default mainReducer.reducer;
