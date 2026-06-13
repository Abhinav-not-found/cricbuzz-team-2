import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../app/slices/CounterSlice";

export const store = configureStore({
	reducer: {
		counter: counterReducer,
	},
});
