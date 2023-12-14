import dataReducers from "./Reducer/ReducerIndex";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: dataReducers
})

export  default store;