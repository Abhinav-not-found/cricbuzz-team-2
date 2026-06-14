import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "@/utils/axios"

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, thunkApi) => {
    try {
      const res = await axiosInstance.post("/auth/login", credentials)
      return res.data.data
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Login failed",
      )
    }
  },
)
export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials, thunkApi) => {
    try {
      const res = await axiosInstance.post("/auth/register", credentials)
      console.log(res.data)
      return res.data.data
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Register failed",
      )
    }
  },
)

export const currentLoggedInUser = createAsyncThunk(
  "auth/me",
  async (_, thunkApi) => {
    try {
      const res = await axiosInstance.get("/auth/me")
      return res.data.data
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Unauthorized",
      )
    }
  },
)

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      await axiosInstance.post("auth/logout")
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data?.message)
    }
  },
)
