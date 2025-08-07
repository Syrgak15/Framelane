import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type ContactUsPageState = {
    loading: boolean;
    error: boolean | string;
    questions: any;
}

const initialState: ContactUsPageState = {
    loading: true,
    error: null,
    questions: [],
}


export const getContactUsPageQuestions = createAsyncThunk(
    'contactUs/getQuestions',
    async () => {
        try {
           const response = await fetch('https://framelane.proxy.beeceptor.com/faq');
           const data = await response.json();

           return data;

        } catch (error) {
            console.log(error)
        }
    }
)

const contactUsReducer = createSlice({
    name: "contactUs",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(getContactUsPageQuestions.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(getContactUsPageQuestions.fulfilled, (state, action) => {
                state.loading = false;
                state.questions = action.payload;
            })
            .addCase(getContactUsPageQuestions.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message;
            })
    },
})

export default contactUsReducer.reducer;