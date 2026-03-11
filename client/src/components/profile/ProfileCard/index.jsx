import { Avatar } from "../../globals/Avatar"

export const ProfileCard = ({ userName, bio, trophies = [] }) => {
    // on génère les initiales à partir du nom d'utilisateur (ex: "Jean Dupont" → "JD")
    const initials = userName
        .split(' ')
        .map((word) => word[0].toUpperCase())
        .join('')
        .slice(0, 2)

    return (
        <div className="card bg-base-100 shadow-md w-full max-w-sm">
            <div className="card-body">

                {/* en-tête : avatar + nom + pseudo */}
                <div className="flex items-center gap-5 mb-4">
                    <Avatar initials={initials} size="lg" />
                    <div>
                        <h3 className="text-xl font-semibold">{userName}</h3>
                        <p className="text-base-content/50 text-sm">@{userName.toLowerCase().replace(' ', '')}</p>
                    </div>
                </div>

                {/* bio optionnelle */}
                {bio && (
                    <p className="text-base-content/70 text-sm mb-4">{bio}</p>
                )}

                {/* trophées optionnels */}
                {trophies.length > 0 && (
                    <div>
                        <h4 className="font-semibold text-primary mb-3">Mes trophées</h4>
                        <div className="flex gap-3 flex-wrap">
                            {/* chaque trophée est un carré doré avec une icône */}
                            {trophies.map((trophy, index) => (
                                <div
                                    key={index}
                                    className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center text-2xl hover:scale-110 hover:rotate-3 transition-transform duration-200"
                                >
                                    {trophy}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}
