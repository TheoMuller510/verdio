import { Navigate } from "react-router-dom"
import { useGetMeQuery } from "../../../store/apiSlices/authApiSlice"

export const AdminRoute = ({ children, redirectTo = "/dashboard" }) => {
  const { data, isSuccess, isLoading } = useGetMeQuery()

  // la requête est en cours : on attend avant d'afficher quoi que ce soit
  if (isLoading) return null

  // non connecté : on redirige vers le login
  if (!isSuccess) return <Navigate to="/login" replace />

  // connecté mais pas admin : on redirige vers le dashboard
  if (data?.user?.role_id !== 1) return <Navigate to={redirectTo} replace />

  // admin confirmé : on affiche la page
  return children
}
