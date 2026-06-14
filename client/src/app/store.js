import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../app/slices/CounterSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		auth: authReducer,
	},
});
