import { useNavigate } from "react-router-dom"
import { useLogoutMutation } from "../../store/apiSlices/authApiSlice"
import { Button } from "../../components/globals/Button"

export const HomeDashBoard = () => {

    const [logout] = useLogoutMutation()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate('/')
    }

    return(
        <>
            <h1>Home Dashboard/utilisateur connecté</h1>
            <Button onClick={handleLogout}>Se déconnecter</Button>
        </>
    )

}