import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import { useGetMeQuery, useLogoutMutation } from "../../../store/apiSlices/authApiSlice"
import { ThemeSwitcher } from "../ThemeSwitcher"

// applique un underline sur le lien actif
const navLinkClass = ({ isActive }) => isActive ? "underline" : undefined

export const Navbar = () => {

    const { isSuccess } = useGetMeQuery()
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const [logout] = useLogoutMutation()

    const handleLogout = async () => {
        await logout()
        navigate('/')
    }

    return (
        <nav className="navbar bg-base-300 px-6 border-b border-base-content/10 shadow-sm" aria-label="Navigation principale">

            {/* logo / nom du site */}
            <div className="navbar-start">
                {/* logo : renvoie vers le dashboard si connecté, sinon vers la home publique */}
                <Link to={isSuccess ? '/dashboard' : '/'} className="text-xl font-bold">
                    Verdio
                </Link>
            </div>

            {/* liens de navigation — cachés sur mobile, visibles à partir de md */}
            <div className="navbar-center hidden md:flex">
                <ul className="menu menu-horizontal gap-1" role="list">
                    {isSuccess && (
                        <>
                            <li>
                                <NavLink to="/dashboard" className={navLinkClass}>Accueil</NavLink>
                            </li>
                            <li>
                                <NavLink to="/challenges" className={navLinkClass}>Challenges</NavLink>
                            </li>
                            <li>
                                <NavLink to="/profil" className={navLinkClass}>Profil</NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>

            <div className="navbar-end gap-2">

                {/* boutons connexion/inscription — desktop uniquement */}
                {!isSuccess && (
                    <div className="hidden md:flex gap-2">
                        <Link to="/login" className="btn btn-ghost btn-sm">
                            Se connecter
                        </Link>
                        <Link to="/register" className="btn btn-primary btn-sm">
                            S'inscrire
                        </Link>
                    </div>
                )}

                {/* bouton déconnexion — desktop uniquement, visible si connecté */}
                {isSuccess && (
                    <button onClick={handleLogout} className="btn btn-ghost btn-sm hidden md:flex">
                        Se déconnecter
                    </button>
                )}

                <ThemeSwitcher />

                {/* burger menu — mobile uniquement, dropdown DaisyUI natif via <details> */}
                <div className="md:hidden">
                    <details className="dropdown dropdown-end">
                        <summary className="btn btn-ghost btn-sm" aria-label="Ouvrir le menu">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </summary>

                        {/* contenu du dropdown : tous les liens + CTAs si non connecté */}
                        <ul className="dropdown-content menu bg-base-200 rounded-box shadow-md w-52 p-2 mt-2 z-50" role="list">
                            {isSuccess && (
                                <>
                                    {/* lien Accueil vers le dashboard — masqué si déjà sur le dashboard */}
                                    {pathname !== '/dashboard' && (
                                        <li>
                                            <NavLink to="/dashboard" className={navLinkClass}>Accueil</NavLink>
                                        </li>
                                    )}
                                    <li>
                                        <NavLink to="/challenges" className={navLinkClass}>Challenges</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/profil" className={navLinkClass}>Profil</NavLink>
                                    </li>
                                    {/* bouton déconnexion dans le menu mobile */}
                                    <li>
                                        <button onClick={handleLogout}>Se déconnecter</button>
                                    </li>
                                </>
                            )}
                            {!isSuccess && (
                                <>
                                    <li>
                                        <Link to="/login">Se connecter</Link>
                                    </li>
                                    <li>
                                        <Link to="/register">S'inscrire</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </details>
                </div>

            </div>

        </nav>
    )
}