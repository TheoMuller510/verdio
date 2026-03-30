import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "../baseQuery"

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: async (args, api, extraOptions) => {
    // on exécute la requête normalement
    let result = await baseQuery(args, api, extraOptions)

    const url = typeof args === "string" ? args : args.url

    // un 401 sur /auth/me signifie simplement que l'utilisateur n'est pas connecté — pas besoin de refresh
    // on tente le refresh uniquement pour les autres routes protégées
    if (result.error?.status === 401 && url !== "/auth/me") {
      const refreshResult = await baseQuery(
        { url: "/auth/refresh-token", method: "POST" },
        api,
        extraOptions
      )

      if (refreshResult.data) {
        // refresh réussi : nouveau cookie posé, on relance la requête originale
        result = await baseQuery(args, api, extraOptions)
      } else {
        // refresh échoué : session expirée, on vide le cache Auth → déconnexion propre
        // authApiSlice est déjà assigné au moment de l'exécution (pas de la définition)
        api.dispatch(authApiSlice.util.invalidateTags(["Auth"]))
      }
    }

    return result
  },
  tagTypes: ["Auth"],
  endpoints: (build) => ({
    login: build.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      // invalide le cache de getMe après connexion → force un re-fetch → isSuccess passe à true
      invalidatesTags: ["Auth"],
    }),

    register: build.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),

    logout: build.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      // invalide le cache de getMe après déconnexion → force un re-fetch → isSuccess passe à false
      invalidatesTags: ["Auth"],
    }),

    getMe: build.query({
      query: () => "/auth/me",
      // fournit le tag Auth — sera invalidé par logout ou par un refresh échoué
      providesTags: ["Auth"],
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useGetMeQuery } =
  authApiSlice
