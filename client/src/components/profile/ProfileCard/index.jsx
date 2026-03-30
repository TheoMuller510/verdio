import { Link } from "react-router-dom"
import { Avatar } from "../../globals/Avatar"

export const ProfileCard = ({ pseudo, bio, trophies = [] }) => {
  // on attend que le pseudo soit disponible avant de rendre la carte
  if (!pseudo) return null

  // on génère les initiales à partir du nom d'utilisateur (ex: "Jean Dupont" → "JD")
  const initials = pseudo
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .join("")
    .slice(0, 2)

  return (
    <article className="card bg-base-100 shadow-md w-full h-full">
      <div className="card-body">
        {/* en-tête : avatar + nom + pseudo */}
        <div className="flex items-center gap-5 mb-4">
          <Avatar initials={initials} size="lg" />
          <div>
            <Link
              to="/profil"
              className="text-xl font-semibold hover:text-primary transition-colors"
            >
              {pseudo}
            </Link>
            <p className="text-base-content/50 text-sm">@{pseudo.toLowerCase().replace(" ", "")}</p>
          </div>
        </div>

        {/* bio optionnelle */}
        {bio && <p className="text-base-content/70 text-sm mb-4">{bio}</p>}

        {/* trophées optionnels */}
        {trophies.length > 0 && (
          <div>
            <h4 className="font-semibold text-primary mb-3">Mes trophées</h4>
            <ul className="flex gap-3 flex-wrap" role="list">
              {/* chaque trophée est un carré doré avec une icône */}
              {trophies.map((trophy, index) => (
                <li
                  key={index}
                  className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center text-2xl hover:scale-110 hover:rotate-3 transition-transform duration-200"
                >
                  {trophy}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  )
}
