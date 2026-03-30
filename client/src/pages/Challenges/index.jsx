import { useGetChallengesQuery, useGetHistoryQuery } from "../../store/apiSlices/challengeApiSlice"
import { ChallengeCard } from "../../components/challenges/ChallengeCard"
import { ChallengeCardSkeleton } from "../../components/challenges/ChallengeCardSkeleton"

export const Challenges = () => {
  // on récupère les challenges depuis l'API
  const { data: challenges = [], isLoading, isError } = useGetChallengesQuery()

  // on récupère l'historique pour savoir quels challenges sont déjà complétés
  const { data: history = [] } = useGetHistoryQuery()
  // Set des IDs complétés pour une vérification en O(1)
  const completedIds = new Set(history.map((c) => c.id))

  return (
    <div className="p-6 max-w-5xl mx-auto flex flex-col gap-8">
      {/* en-tête de la page */}
      <header>
        <h1 className="text-3xl font-bold">Challenges</h1>
        <p className="text-base-content/60 mt-1">
          Relevez des défis pour la planète et gagnez des points.
        </p>
      </header>

      {/* grille de challenges — 1 colonne mobile, 2 à sm, 3 à lg */}
      {isError ? (
        /* état erreur : l'API n'a pas répondu */
        <p className="text-error text-sm">
          Impossible de charger les challenges, réessayez plus tard.
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <li key={i}>
                <ChallengeCardSkeleton />
              </li>
            ))
          ) : challenges.length === 0 ? (
            /* état vide : aucun challenge en base */
            <li className="col-span-full text-base-content/60 text-sm">
              Aucun challenge disponible pour le moment.
            </li>
          ) : (
            challenges.map((challenge) => (
              <li key={challenge.id}>
                <ChallengeCard {...challenge} isCompleted={completedIds.has(challenge.id)} />
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}
