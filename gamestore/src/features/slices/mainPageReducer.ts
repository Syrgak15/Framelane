import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface DataPayload {
    name: string;
    image: string;
    price: string | number;
}

interface SlidesPayload {
    image: string;
}

interface MainState {
    loading: boolean;
    error: string | null;
    result: any;
    slides: any;
}

export const postThenGetData = createAsyncThunk(
    'main/postThenGetData',
    async (payload: DataPayload[]) => {
        const postResponse = await fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!postResponse.ok) {
            throw new Error('Failed to post data');
        }

        const query = new URLSearchParams({
            items: JSON.stringify(payload)
        });

        const getResponse = await fetch(`/api/data?${query.toString()}`);

        if (!getResponse.ok) {
            throw new Error('Failed to get data');
        }

        const data = await getResponse.json();

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
            .addCase(postThenGetData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postThenGetData.fulfilled, (state, action) => {
                state.loading = false;
                state.result = action.payload;
            })
            .addCase(postThenGetData.rejected, (state, action) => {
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
