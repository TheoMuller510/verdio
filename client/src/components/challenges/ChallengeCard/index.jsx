import { useCompleteChallengeMutation } from "../../../store/apiSlices/challengeApiSlice"
import { Badge } from "../../globals/Badge"

// mapping DB (easy/medium/hard) → variante Badge + label affiché
const difficultyMap = {
  easy: { variant: "facile", label: "Facile" },
  medium: { variant: "moyen", label: "Moyen" },
  hard: { variant: "difficile", label: "Difficile" },
}

export const ChallengeCard = ({ id, category_icon, title, description, difficulty, points, isCompleted = false }) => {
  const [completeChallenge, { isLoading }] = useCompleteChallengeMutation()

  return (
    <article className="card bg-base-100 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="card-body">
        {/* en-tête : icône + titre */}
        <div className="flex items-center gap-3 mb-1">
          <span className="text-4xl" role="img" aria-hidden="true">
            {category_icon}
          </span>
          <h3 className="card-title text-primary">{title}</h3>
        </div>

        {/* description du challenge */}
        <p className="text-base-content/60 text-sm">{description}</p>

        {/* badges : difficulté + points */}
        <div className="flex gap-2 flex-wrap mt-3">
          <Badge variant={difficultyMap[difficulty]?.variant}>
            {difficultyMap[difficulty]?.label}
          </Badge>
          <Badge variant="valide">+{points} pts</Badge>
        </div>

        {/* bouton de complétion */}
        <button
          onClick={() => completeChallenge(id)}
          disabled={isCompleted || isLoading}
          className={`btn btn-sm mt-4 w-full ${isCompleted ? "btn-success" : "btn-primary"}`}
        >
          {isCompleted ? "Déjà complété ✓" : "Relever le défi"}
        </button>
      </div>
    </article>
  )
}
