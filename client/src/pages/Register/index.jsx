import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useRegisterMutation } from "../../store/apiSlices/authApiSlice"

export const Register = () => {
  // State pour chaque champ du formulaire
  const [pseudo, setPseudo] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmedPassword, setConfirmedPassword] = useState("")

  const [register, { isLoading, error }] = useRegisterMutation()
  const navigate = useNavigate()

  // vrai si les deux mots de passe sont remplis et ne correspondent pas
  const passwordMismatch = confirmedPassword.length > 0 && password !== confirmedPassword

  const handleSubmit = async (e) => {
    e.preventDefault()

    // vérifie que les deux mots de passe sont identiques, sinon on s'arrête
    if (password !== confirmedPassword) return

    try {
      // on envoie les données au backend
      await register({ pseudo, email, password }).unwrap()

      // inscription réussie : on redirige vers /login pour que l'utilisateur se connecte
      navigate("/login")
    } catch {
      // l'inscription a échoué (email déjà utilisé, serveur down...)
      // "error" dans le state est automatiquement mis à jour par RTK Query
    }
  }

  return (
    // page centrée verticalement et horizontalement sur fond base-200
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      {/* carte blanche centrée, max-w-sm pour rester compact sur mobile */}
      <div className="card bg-base-100 shadow-md w-full max-w-sm">
        <div className="card-body">
          <h1 className="text-2xl font-semibold text-center mb-2">Inscription</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* chaque champ est un bloc flex column : label au-dessus, input en-dessous */}
            <div className="flex flex-col gap-1">
              <label htmlFor="pseudo" className="text-sm font-medium">
                Nom d'utilisateur
              </label>
              <input
                type="text"
                id="pseudo"
                name="pseudo"
                className="input w-full"
                placeholder="Votre pseudo"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
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
              <label htmlFor="password" className="text-sm font-medium">
                Mot de passe
              </label>
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

            <div className="flex flex-col gap-1">
              <label htmlFor="confirmed_password" className="text-sm font-medium">
                Confirmer le mot de passe
              </label>
              {/* input-error affiche un bord rouge si les mots de passe ne correspondent pas */}
              <input
                type="password"
                id="confirmed_password"
                name="confirmed_password"
                className={`input w-full${passwordMismatch ? " input-error" : ""}`}
                placeholder="••••••••"
                value={confirmedPassword}
                onChange={(e) => setConfirmedPassword(e.target.value)}
              />
              {/* message affiché en temps réel si les mots de passe divergent */}
              {passwordMismatch && (
                <p className="text-error text-xs">Les mots de passe ne correspondent pas</p>
              )}
            </div>

            {/* message d'erreur affiché uniquement si RTK Query remonte une erreur */}
            {error && (
              <p className="text-error text-sm">
                {error.status === 429
                  ? `Trop de tentatives d'inscription, réessayez plus tard`
                  : "L'inscription a échoué, cet email est peut-être déjà utilisé"}
              </p>
            )}

            {/* bouton désactivé si les mots de passe divergent ou pendant le chargement */}
            <button
              type="submit"
              disabled={isLoading || !!passwordMismatch}
              className="btn btn-primary w-full"
            >
              {isLoading ? "Inscription..." : "S'inscrire"}
            </button>
          </form>

          {/* lien vers la connexion pour les utilisateurs déjà inscrits */}
          <p className="text-center text-sm mt-2">
            Déjà un compte ?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
