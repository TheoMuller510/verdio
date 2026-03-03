import { createSlice } from "@reduxjs/toolkit";

// État initial : personne de connecté au démarrage
const initialState = {
    user: null,           // Les données de l'utilisateur (objet ou null)
    isAuthenticated: false, // false = non connecté
}

export const authSlice = createSlice({

    name: 'auth', // Nom du slice, utilisé par Redux DevTools
    initialState,
    reducers: {

        // Inscription : connecte directement l'utilisateur après création du compte
        register: (state, action) => {
            state.isAuthenticated = true
            state.user = action.payload.user // Les données envoyées lors du dispatch
        },

        // Connexion : stocke le user et passe isAuthenticated à true
        login: (state, action) => {
            state.isAuthenticated = true
            state.user = action.payload.user
        },

        // Déconnexion : remet le state à son état initial
        logout: (state) => {
            state.isAuthenticated = false
            state.user = null
        },    

    }

})

// On exporte les actions pour pouvoir les dispatcher depuis les composants
export const { register, login, logout } = authSlice.actions

// On exporte le reducer pour l'ajouter au store
export default authSlice.reducer