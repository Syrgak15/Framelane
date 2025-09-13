import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type ContactUsPageState = {
    questions: any;
}

const initialState: ContactUsPageState = {
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
            .addCase(getContactUsPageQuestions.fulfilled, (state, action) => {
                state.questions = action.payload;
            })
    },
})

export default contactUsReducer.reducer;