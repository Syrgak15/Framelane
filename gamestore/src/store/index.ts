import { configureStore } from '@reduxjs/toolkit';
import mainPageReducer from "../features/slices/mainPageReducer";
import collectionsPageReducer from "../features/slices/collectionsPageReducer";
import contactUsPageReducer from "../features/slices/contactUsPageReducer";

export const store = configureStore({
    reducer: {
        mainReducer: mainPageReducer,
        collectionReducer: collectionsPageReducer,
        contactUsReducer : contactUsPageReducer,
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;