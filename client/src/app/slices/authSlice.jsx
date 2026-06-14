import { createSlice } from "@reduxjs/toolkit"
import { currentLoggedInUser, loginUser, logoutUser } from "./authAction"

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    authChecked: false,
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload
      state.isLoading = false
    },
    removeUser: (state) => {
      state.user = null
      state.isLoading = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload
      state.authChecked = true
      state.isLoading = false
    })
    builder.addCase(loginUser.rejected, (state) => {
      state.authChecked = true
      state.isLoading = false
    })

    builder.addCase(currentLoggedInUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(currentLoggedInUser.fulfilled, (state, action) => {
      state.user = action.payload
      state.authChecked = true
      state.isLoading = false
    })
    builder.addCase(currentLoggedInUser.rejected, (state) => {
      state.authChecked = true
      state.isLoading = false
    })
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null
      state.isLoading = false
    })
  },
})

const { addUser, removeUser } = authSlice.actions

export default authSlice.reducer
