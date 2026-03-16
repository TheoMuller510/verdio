import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// requête de base avec les options communes à tous les appels
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    credentials: 'include', // indispensable pour que le navigateur envoie/reçoive les cookies httpOnly
})

export const challengeApiSlice = createApi({
    reducerPath: 'challengeApi',
    baseQuery,
    tagTypes: ['Challenge'],
    endpoints: (build) => ({

        getChallenges: build.query({
            query: () => '/challenges',
            // fournit le tag Challenge — sera invalidé après un create/update/delete
            providesTags: ['Challenge'],
        }),

        getChallengeById: build.query({
            query: (id) => `/challenges/${id}`,
            providesTags: ['Challenge'],
        }),

        createChallenge: build.mutation({
            query: (data) => ({
                url: '/challenges',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Challenge'],
        }),

        updateChallenge: build.mutation({
            query: ({ id, ...data }) => ({
                url: `/challenges/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Challenge'],
        }),

        deleteChallenge: build.mutation({
            query: (id) => ({
                url: `/challenges/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Challenge'],
        }),

    }),
})

export const {
    useGetChallengesQuery,
    useGetChallengeByIdQuery,
    useCreateChallengeMutation,
    useUpdateChallengeMutation,
    useDeleteChallengeMutation,
} = challengeApiSlice
