import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
token = localStorage.getItem("token")

const initialState = {
    movies: [],
    status: "idle",
    filter: ""
}
export const getMovies = createAsyncThunk(
    "get/getMovies",
    async () => {
        const fetchMovies = await fetch("https://myflix-angelo.cyclic.app/movies", {
            headers: { Authorization: `Bearer ${token}` },
        })

        return fetchMovies.json()
    })

const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getMovies.fulfilled, (state, action) => {
                return (state = {
                    ...state,
                    status: "idle",
                    movies: action.payload
                })
            })
            .addCase(getMovies.rejected, (state, action) => {
                state.status = "failed"
            })
    }

})
export const selectMovies = (state) => state.movies.movies
export const { setFilter } = moviesSlice.actions
export default moviesSlice.reducer

