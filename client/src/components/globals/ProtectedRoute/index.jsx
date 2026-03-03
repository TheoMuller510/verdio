import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export const ProtectedRoute = ({ children, redirectTo = '/login' }) => {

    // Lit isAuthenticated depuis le slice auth dans le store Redux
    const { isAuthenticated } = useSelector(state => state.auth)

    // Si non connecté, redirige vers /login (ou la route spécifiée)
    // Le replace empêche la page redirigée d'être ajoutée dans l'historique du navigateur
    // Empêche des comportements inattendus
    if (!isAuthenticated) {
        return <Navigate to={redirectTo} replace/>
    }

    // Si connecté, affiche la page demandée
    return children
}