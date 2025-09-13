import { configureStore } from '@reduxjs/toolkit';
import mainPageReducer from "../features/slices/mainPageReducer";
import contactUsPageReducer from "../features/slices/contactUsPageReducer";
import productPageReducer from "../features/slices/productPageReducer";
import collectionsPageReducer from "../features/slices/collectionsPageReducer";

export const store = configureStore({
    reducer: {
        mainReducer: mainPageReducer,
        collectionsReducer: collectionsPageReducer,
        contactUsReducer : contactUsPageReducer,
        productReducer: productPageReducer,
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;