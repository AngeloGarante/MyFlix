import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./reducers/moviesSlices";


export const store = configureStore({
    reducer: {
        movies: moviesReducer,

    }
})