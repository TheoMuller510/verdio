import { useNavigate } from "react-router-dom"
import { useLogoutMutation } from "../../store/apiSlices/authApiSlice"
import { Button } from "../../components/globals/Button"
import { Card } from "../../components/globals/Card"

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
            <Card title="Mon challenge">
                <p>Description du challenge</p>
            </Card>
            <Button variant="ghost" onClick={handleLogout}>Se déconnecter</Button>
        </>
    )

}