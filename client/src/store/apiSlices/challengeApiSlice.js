import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "../baseQuery"

export const challengeApiSlice = createApi({
  reducerPath: "challengeApi",
  baseQuery,
  tagTypes: ["Challenge"],
  endpoints: (build) => ({
    getChallenges: build.query({
      query: () => "/challenges",
      // fournit le tag Challenge — sera invalidé après un create/update/delete
      providesTags: ["Challenge"],
    }),

    getChallengeById: build.query({
      query: (id) => `/challenges/${id}`,
      providesTags: ["Challenge"],
    }),

    getHistory: build.query({
      query: () => "/user-challenges/me",
      providesTags: ["Challenge"],
    }),

    getStats: build.query({
      query: () => "/user-challenges/me/stats",
      providesTags: ["Challenge"],
    }),

    getFeed: build.query({
      query: () => "/user-challenges/feed",
      providesTags: ["Challenge"],
    }),

    createChallenge: build.mutation({
      query: (data) => ({
        url: "/challenges",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Challenge"],
    }),

    updateChallenge: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/challenges/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Challenge"],
    }),

    deleteChallenge: build.mutation({
      query: (id) => ({
        url: `/challenges/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Challenge"],
    }),

    completeChallenge: build.mutation({
      query: (challengeId) => ({
        url: `/user-challenges`,
        method: "POST",
        body: { challengeId },
      }),
      invalidatesTags: ["Challenge"],
    }),
  }),
})

export const {
  useGetChallengesQuery,
  useGetChallengeByIdQuery,
  useCreateChallengeMutation,
  useUpdateChallengeMutation,
  useDeleteChallengeMutation,
  useCompleteChallengeMutation,
  useGetHistoryQuery,
  useGetStatsQuery,
  useGetFeedQuery,
} = challengeApiSlice
