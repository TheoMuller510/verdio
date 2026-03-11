import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// requête de base avec les options communes à tous les appels
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    credentials: 'include', // indispensable pour que le navigateur envoie/reçoive les cookies httpOnly
})

// référence intermédiaire pour éviter la dépendance circulaire avec authApiSlice
let _authApiSlice

// wrapper autour de baseQuery : intercepte les 401 et tente un refresh avant de déconnecter
const baseQueryWithReauth = async (args, api, extraOptions) => {
    // on exécute la requête normalement
    let result = await baseQuery(args, api, extraOptions)

    const url = typeof args === 'string' ? args : args.url

    // un 401 sur /auth/me signifie simplement que l'utilisateur n'est pas connecté — pas besoin de refresh
    // on tente le refresh uniquement pour les autres routes protégées
    if (result.error?.status === 401 && url !== '/auth/me') {
        const refreshResult = await baseQuery(
            { url: '/auth/refresh-token', method: 'POST' },
            api,
            extraOptions
        )

        if (refreshResult.data) {
            // refresh réussi : nouveau cookie posé, on relance la requête originale
            result = await baseQuery(args, api, extraOptions)
        } else {
            // refresh échoué : session expirée, on vide le cache Auth → déconnexion propre
            api.dispatch(_authApiSlice.util.invalidateTags(['Auth']))
        }
    }

    return result
}

export const authApiSlice = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Auth'],
    endpoints: (build) => ({

        login: build.mutation({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data,
            }),
            // invalide le cache de getMe après connexion → force un re-fetch → isSuccess passe à true
            invalidatesTags: ['Auth'],
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
            // invalide le cache de getMe après déconnexion → force un re-fetch → isSuccess passe à false
            invalidatesTags: ['Auth'],
        }),

        getMe: build.query({
            query: () => '/auth/me',
            // fournit le tag Auth — sera invalidé par logout ou par un refresh échoué
            providesTags: ['Auth'],
        }),

    }),
})

// on remplit la référence après la déclaration du slice pour éviter la dépendance circulaire
_authApiSlice = authApiSlice

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useGetMeQuery } = authApiSlice