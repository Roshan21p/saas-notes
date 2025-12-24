import { configureStore } from '@reduxjs/toolkit'
import AuthSliceReducer from "./Slices/AuthSlice"
import NoteSliceReducer from "./Slices/NoteSlice"


export const store = configureStore({
    reducer: {
        // use the reducer function from each slice object
        auth: AuthSliceReducer,
        notes : NoteSliceReducer,  
    },
    devTools: true
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;