import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login } from "../../slices/authSlice"

export const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {

        e.preventDefault()
        dispatch(login({user: {email, password}}))
        navigate('/dashboard')
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
                <button type="submit">Se connecter</button>
            </form>
        </>

    )

}