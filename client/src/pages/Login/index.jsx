import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
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

    return (
        // page centrée verticalement et horizontalement sur fond base-200
        <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">

            {/* carte blanche centrée, max-w-sm pour rester compact sur mobile */}
            <div className="card bg-base-100 shadow-md w-full max-w-sm">
                <div className="card-body">
                    <h1 className="text-2xl font-semibold text-center mb-2">Connexion</h1>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                        {/* chaque champ est un bloc flex column : label au-dessus, input en-dessous */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="input w-full"
                                placeholder="votre@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="password" className="text-sm font-medium">Mot de passe</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="input w-full"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* message d'erreur : toujours une string hardcodée côté client, jamais de données brutes du serveur */}
                        {error && <p className="text-error text-sm">{error.status === 429 ? 'Trop de tentatives, réessayez plus tard' : 'Identifiants incorrects'}</p>}

                        {/* bouton désactivé pendant le chargement pour éviter les doubles soumissions */}
                        <button type="submit" disabled={isLoading} className="btn btn-primary w-full">
                            {isLoading ? 'Connexion...' : 'Se connecter'}
                        </button>
                    </form>

                    {/* lien vers l'inscription pour les nouveaux utilisateurs */}
                    <p className="text-center text-sm mt-2">
                        Pas encore de compte ?{' '}
                        <Link to="/register" className="text-primary font-medium hover:underline">
                            S'inscrire
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
