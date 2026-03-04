import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLoginMutation } from "../../store/apiSlices/authApiSlice"

export const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [login, { isLoading, error }] = useLoginMutation()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            // on envoie email et password au backend
            // si le backend répond avec une erreur, "unwrap" la fait remonter dans le catch
            await login({ email, password }).unwrap()

            // si on arrive ici, la connexion a réussi : le cookie est posé par le backend
            navigate('/dashboard')
        } catch {
            // la connexion a échoué (mauvais identifiants, serveur down...)
            // "error" dans le state est automatiquement mis à jour par RTK Query
        }
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Email
                    <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <label>
                    Mot de passe
                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                { error && <p>Identifiants incorrects</p> }
                <button type="submit" disabled={isLoading}>
                    { isLoading ? 'Connexion...' : 'Se connecter' }
                </button>
            </form>
        </>
    )

}