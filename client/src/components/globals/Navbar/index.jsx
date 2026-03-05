import { Link, NavLink } from "react-router-dom"
import { useGetMeQuery } from "../../../store/apiSlices/authApiSlice"
import { ThemeSwitcher } from "../ThemeSwitcher"

export const Navbar = () => {

    const { isSuccess } = useGetMeQuery()

    return (
        <nav className="navbar bg-base-300 px-6 border-b border-base-content/10 shadow-sm" aria-label="Navigation principale">

            <div className="navbar-start">
                <Link to="/" className="text-xl font-bold">
                    Verdio
                </Link>
            </div>

            <div className="navbar-center">
                <ul className="menu menu-horizontal gap-1" role="list">
                    <li>
                        <NavLink to="/">Accueil</NavLink>
                    </li>
                    {isSuccess && (
                        <>
                            <li>
                                <NavLink to="/challenges">Challenges</NavLink>
                            </li>
                            <li>
                                <NavLink to="/profil">Profil</NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>

            <div className="navbar-end gap-2">
                {!isSuccess && (
                    <>
                        <Link to="/login" className="btn btn-ghost btn-sm">
                            Se connecter
                        </Link>
                        <Link to="/register" className="btn btn-primary btn-sm">
                            S'inscrire
                        </Link>
                    </>
                )}
                <ThemeSwitcher />
            </div>

        </nav>
    )
}
