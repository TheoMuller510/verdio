import { configureStore } from '@reduxjs/toolkit'
import { authApiSlice } from './apiSlices/authApiSlice.js'

const store = configureStore({
    reducer: {
        [authApiSlice.reducerPath]: authApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApiSlice.middleware),
})

export default store