import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userPosts: null
}

const postSlice = createSlice({
    name : "post",
    initialState,
    reducers : {

    }
})

export default postSlice.reducer;