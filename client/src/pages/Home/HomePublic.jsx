import { useNavigate } from "react-router-dom"
import { Button } from "../../components/globals/Button"

export const HomePublic = () => {

    const navigate = useNavigate()

    return(
        <>
            <h1>Home Page/utilisateur non connecté</h1>
            <Button onClick={() => navigate('/login')}>Se connecter</Button>
            <Button onClick={() => navigate('/register')}>S'inscrire</Button>
        </>
    )

}