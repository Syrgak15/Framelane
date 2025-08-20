import { configureStore } from '@reduxjs/toolkit';
import mainPageReducer from "../features/slices/mainPageReducer";

export const serverStore = configureStore({
    reducer: {
        mainReducer: mainPageReducer,
    }
})

export type AppDispatch = typeof serverStore.dispatch;
export type RootState = ReturnType<typeof serverStore.getState>;