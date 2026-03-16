import { Badge } from "../../globals/Badge"

// label affiché pour chaque niveau de difficulté
const difficultyLabel = {
    facile:    'Facile',
    moyen:     'Moyen',
    difficile: 'Difficile',
}

export const ChallengeCard = ({ icon, title, description, difficulty, points }) => {
    return (
        <div className="card bg-base-100 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="card-body">

                {/* en-tête : icône + titre */}
                <div className="flex items-center gap-3 mb-1">
                    <span className="text-4xl" role="img" aria-hidden="true">{icon}</span>
                    <h3 className="card-title text-primary">{title}</h3>
                </div>

                {/* description du challenge */}
                <p className="text-base-content/60 text-sm">{description}</p>

                {/* badges : difficulté + points */}
                <div className="flex gap-2 flex-wrap mt-3">
                    <Badge variant={difficulty}>{difficultyLabel[difficulty]}</Badge>
                    <Badge variant="valide">+{points} pts</Badge>
                </div>

            </div>
        </div>
    )
}
