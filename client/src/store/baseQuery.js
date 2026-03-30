import { fetchBaseQuery } from "@reduxjs/toolkit/query"

// requête de base avec les options communes à tous les appels
export const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
  credentials: "include", // indispensable pour que le navigateur envoie/reçoive les cookies httpOnly
})
