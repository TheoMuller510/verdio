import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export const GuestRoute = ({ children, redirectTo = '/dashboard' }) => {

    // Lit isAuthenticated depuis le slice auth dans le store Redux
    const { isAuthenticated } = useSelector(state => state.auth)

    // Si connecté, redirige vers /dashboard (ou la route spécifiée)
    // Le replace empêche la page redirigée d'être ajoutée dans l'historique du navigateur
    // Empêche des comportements inattendus
    if (isAuthenticated) {
        return <Navigate to={redirectTo} replace/>
    }

    // Si non connecté, affiche la page demandée
    return children
}