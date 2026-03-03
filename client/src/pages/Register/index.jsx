import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { register } from "../../slices/authSlice"

export const Register = () => {

    // State pour chaque champ du formulaire
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault() // Empêche le rechargement de la page

        // Vérifie que les deux mots de passe sont identiques, sinon on s'arrête
        if (password !== confirmedPassword) return

        // Dispatch l'action register avec les données utilisateur
        // Ces données deviennent action.payload dans le reducer
        dispatch(register({ user: { userName, email, password } }))

        // Redirige vers le dashboard après inscription
        navigate('/dashboard')
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
                <button type="submit">S'inscrire</button>
            </form>
        </>
    )
}