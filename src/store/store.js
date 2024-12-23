import {configureStore} from '@reduxjs/toolkit';
import authReducer from "./authSlice"
import postReducer from "./postSlice"


const store = configureStore({
    reducer : {
        authReducer,
        postReducer
    }
});

export default store;