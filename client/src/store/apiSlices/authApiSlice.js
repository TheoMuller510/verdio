import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApiSlice = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
        credentials: 'include', // indispensable pour que le navigateur envoie/reçoive les cookies httpOnly
    }),
    endpoints: (build) => ({

        login: build.mutation({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data,
            }),
        }),

        register: build.mutation({
            query: (data) => ({
                url: '/auth/register',
                method: 'POST',
                body: data,
            }),
        }),

        logout: build.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
        }),

        getMe: build.query({
            query: () => '/auth/me',
        }),

    }),
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useGetMeQuery } = authApiSlice
