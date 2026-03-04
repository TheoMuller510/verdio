import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRegisterMutation } from "../../store/apiSlices/authApiSlice"

export const Register = () => {

    // State pour chaque champ du formulaire
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')

    const [register, { isLoading, error }] = useRegisterMutation()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Vérifie que les deux mots de passe sont identiques, sinon on s'arrête
        if (password !== confirmedPassword) return

        try {
            // on envoie les données au backend
            await register({ userName, email, password }).unwrap()

            // inscription réussie : on redirige vers /login pour que l'utilisateur se connecte
            navigate('/login')
        } catch {
            // l'inscription a échoué (email déjà utilisé, serveur down...)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Nom d'utilisateur
                    <input type="text" name="username" id="username" value={userName} onChange={(e) => setUserName(e.target.value)} />
                </label>
                <label>
                    Email
                    <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    Mot de passe
                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <label>
                    Confirmer le mot de passe
                    <input type="password" name="confirmed_password" id="confirmed_password" value={confirmedPassword} onChange={(e) => setConfirmedPassword(e.target.value)} />
                </label>
                { error && <p>L'inscription a échoué, cet email est peut-être déjà utilisé</p> }
                <button type="submit" disabled={isLoading}>
                    { isLoading ? 'Inscription...' : "S'inscrire" }
                </button>
            </form>
        </>
    )
}