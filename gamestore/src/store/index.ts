import { configureStore } from '@reduxjs/toolkit';
import mainpageReducer from "../features/slices/mainpageReducer";

export const store = configureStore({
    reducer: {
        mainReducer: mainpageReducer,
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;