import { useGetMeQuery } from "../../store/apiSlices/authApiSlice"
import { useGetChallengesQuery, useGetFeedQuery, useGetHistoryQuery } from "../../store/apiSlices/challengeApiSlice"
import { ChallengeCard } from "../../components/challenges/ChallengeCard"
import { ProfileCard } from "../../components/profile/ProfileCard"
import { FeedCard } from "../../components/feed/FeedCard"

export const HomeDashBoard = () => {
  // on récupère les données de l'utilisateur connecté pour le message de bienvenue
  const { data } = useGetMeQuery()
  const pseudo = data?.user?.pseudo

  // on récupère les challenges depuis l'API
  const { data: challenges = [] } = useGetChallengesQuery()

  // on récupère le feed des dernières complétions de la communauté
  const { data: feed = [] } = useGetFeedQuery()

  // on récupère l'historique pour savoir quels challenges sont déjà complétés
  const { data: history = [] } = useGetHistoryQuery()
  const completedIds = new Set(history.map((c) => c.id))

  return (
    <div className="p-6 max-w-6xl mx-auto flex flex-col gap-8">
      {/* message de bienvenue */}
      <header>
        <h1 className="text-3xl font-bold">Bonjour {pseudo} 👋</h1>
        <p className="text-base-content/60 mt-1">Voici vos challenges en cours.</p>
      </header>

      {/* layout 50/50 : profil à gauche, challenges à droite — empilés en mobile */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* profil */}
        <div className="w-full lg:w-1/2 flex">
          <ProfileCard
            pseudo={pseudo}
            bio="Passionné d'écologie et de nature. J'essaie chaque jour d'avoir un impact positif sur l'environnement ! 🌍"
            trophies={["🏆", "🥇", "🌟", "⭐", "🎖️"]}
          />
        </div>

        {/* 2 premiers challenges empilés */}
        <ul className="w-full lg:w-1/2 flex flex-col gap-6" role="list">
          {challenges.slice(0, 2).map((challenge) => (
            <li key={challenge.id}>
              <ChallengeCard {...challenge} isCompleted={completedIds.has(challenge.id)} />
            </li>
          ))}
        </ul>
      </div>

      {/* mur social : actions récentes de la communauté */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Activité récente</h2>
        <ul className="flex flex-col gap-3" role="list">
          {feed.map((item, index) => (
            <li key={index}>
              <FeedCard {...item} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
