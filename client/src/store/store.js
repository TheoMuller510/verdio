import { configureStore } from "@reduxjs/toolkit"
import { authApiSlice } from "./apiSlices/authApiSlice.js"
import { challengeApiSlice } from "./apiSlices/challengeApiSlice.js"

const store = configureStore({
  reducer: {
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [challengeApiSlice.reducerPath]: challengeApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApiSlice.middleware).concat(challengeApiSlice.middleware),
})

export default store
