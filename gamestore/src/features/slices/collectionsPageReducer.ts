import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface CollectionsState {
    loading: boolean,
    error: null | string;
    collections: any;
}

const initialState: CollectionsState = {
    loading: false,
    error: null,
    collections: '',
}

export const getCollectionsData = createAsyncThunk(
    'collection/getCollections',
     async () => {
         try {
             const req = await fetch('https://framelane.free.beeceptor.com/collections');
             const data = await req.json()

             return data;

         }catch(error){
            console.log(error);
        }
     }
)

const collectionReducer = createSlice({
    name: 'collections',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCollectionsData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCollectionsData.fulfilled, (state, action) => {
                state.collections = action.payload;
                state.loading = false;
            })
            .addCase(getCollectionsData.rejected, (state) => {
                state.loading = false;
            })
    },
})

export default collectionReducer.reducer;