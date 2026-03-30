import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import { List } from "@phosphor-icons/react"
import { useGetMeQuery, useLogoutMutation } from "../../../store/apiSlices/authApiSlice"
import { ThemeSwitcher } from "../ThemeSwitcher"

// applique un underline sur le lien actif
const navLinkClass = ({ isActive }) => (isActive ? "underline" : undefined)

export const Navbar = () => {
  const { isSuccess } = useGetMeQuery()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [logout] = useLogoutMutation()

  const handleLogout = async () => {
    await logout()
    navigate("/")
  }

  return (
    <nav
      className="navbar bg-base-300 px-6 border-b border-base-content/10 shadow-sm"
      aria-label="Navigation principale"
    >
      {/* logo / nom du site */}
      <div className="navbar-start">
        <Link to={isSuccess ? "/dashboard" : "/"} className="text-xl font-bold">
          Verdio
        </Link>
      </div>

      {/* liens de navigation — cachés sur mobile, visibles à partir de md */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal gap-1" role="list">
          {isSuccess && (
            <>
              <li>
                <NavLink to="/dashboard" className={navLinkClass}>
                  Accueil
                </NavLink>
              </li>
              <li>
                <NavLink to="/challenges" className={navLinkClass}>
                  Challenges
                </NavLink>
              </li>
              <li>
                <NavLink to="/profil" className={navLinkClass}>
                  Profil
                </NavLink>
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

        {/* burger menu — mobile uniquement, fermeture via perte de focus (DaisyUI) */}
        <div className="md:hidden">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-sm" aria-label="Ouvrir le menu">
              <List className="h-5 w-5" weight="bold" />
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-200 rounded-box shadow-md w-52 p-2 mt-2 z-50"
              role="list"
            >
              {isSuccess && (
                <>
                  {pathname !== "/dashboard" && (
                    <li>
                      <NavLink to="/dashboard" className={navLinkClass}>
                        Accueil
                      </NavLink>
                    </li>
                  )}
                  <li>
                    <NavLink to="/challenges" className={navLinkClass}>
                      Challenges
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/profil" className={navLinkClass}>
                      Profil
                    </NavLink>
                  </li>
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
          </div>
        </div>
      </div>
    </nav>
  )
}
