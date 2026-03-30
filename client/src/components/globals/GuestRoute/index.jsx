import { Navigate } from "react-router-dom"
import { useGetMeQuery } from "../../../store/apiSlices/authApiSlice"

export const GuestRoute = ({ children, redirectTo = "/dashboard" }) => {
  const { isSuccess, isLoading } = useGetMeQuery()

  // La requête est en cours : on n'affiche rien le temps d'avoir la réponse du backend
  if (isLoading) return null

  // Le backend a confirmé que l'utilisateur est connecté : il n'a rien à faire ici
  if (isSuccess) return <Navigate to={redirectTo} replace />

  // Le backend a répondu avec une erreur (401) : l'utilisateur n'est pas connecté, on affiche la page
  return children
}
