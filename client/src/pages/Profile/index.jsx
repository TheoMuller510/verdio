import { useGetMeQuery } from "../../store/apiSlices/authApiSlice"
import { useGetHistoryQuery, useGetStatsQuery } from "../../store/apiSlices/challengeApiSlice"
import { Avatar } from "../../components/globals/Avatar"
import { ChallengeCard } from "../../components/challenges/ChallengeCard"

export const Profile = () => {
  // on récupère les données de l'utilisateur connecté
  const { data } = useGetMeQuery()
  const pseudo = data?.user?.pseudo ?? ""

  // on récupère les stats et l'historique depuis les APIs
  const { data: stats, isLoading: statsLoading } = useGetStatsQuery()
  const { data: history = [], isLoading: historyLoading } = useGetHistoryQuery()

  // on génère les initiales pour l'avatar (ex: "Jean Dupont" → "JD")
  const initials = pseudo
    ? pseudo
        .split(" ")
        .map((w) => w[0].toUpperCase())
        .join("")
        .slice(0, 2)
    : ""

  // libellés des stats dans l'ordre d'affichage
  const statItems = [
    { label: "Points", value: stats?.points ?? "—" },
    { label: "Complétés", value: stats?.completed ?? "—" },
    { label: "Niveau", value: stats?.level ?? "—" },
  ]

  return (
    <div className="p-6 max-w-4xl mx-auto flex flex-col gap-8">
      {/* en-tête : avatar grand format + pseudo + bio */}
      <header className="card bg-base-100 shadow-md">
        <div className="card-body flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <Avatar initials={initials} size="lg" />
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <h1 className="text-3xl font-bold">{pseudo}</h1>
            <p className="text-base-content/50 text-sm">
              @{pseudo.toLowerCase().replace(" ", "")}
            </p>
          </div>
        </div>
      </header>

      {/* stats : points, challenges complétés, niveau */}
      <ul className="grid grid-cols-3 gap-4" role="list">
        {statItems.map((stat) => (
          <li key={stat.label} className="card bg-base-100 shadow-md">
            <div className="card-body items-center text-center p-4">
              {statsLoading ? (
                <div className="skeleton h-8 w-12 mb-1"></div>
              ) : (
                <span className="text-3xl font-bold text-primary">{stat.value}</span>
              )}
              <span className="text-base-content/60 text-sm">{stat.label}</span>
            </div>
          </li>
        ))}
      </ul>

      {/* historique des challenges complétés */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Challenges complétés</h2>
        {historyLoading ? (
          <p className="text-base-content/60 text-sm">Chargement...</p>
        ) : history.length === 0 ? (
          <p className="text-base-content/60 text-sm">Aucun challenge complété pour le moment.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
            {history.map((challenge) => (
              <li key={challenge.id}>
                <ChallengeCard {...challenge} isCompleted />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
