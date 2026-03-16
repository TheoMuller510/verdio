import { useGetMeQuery } from "../../store/apiSlices/authApiSlice"
import { useGetChallengesQuery } from "../../store/apiSlices/challengeApiSlice"
import { ChallengeCard } from "../../components/challenges/ChallengeCard"
import { ProfileCard } from "../../components/profile/ProfileCard"
import { FeedCard } from "../../components/feed/FeedCard"

// données temporaires en attendant l'API feed
const feed = [
    { id: 1, userId: 2, pseudo: 'Alice',   challengeIcon: '🚲', challengeTitle: 'Semaine vélo',  likes: 4 },
    { id: 2, userId: 3, pseudo: 'Bob',     challengeIcon: '🌱', challengeTitle: 'Plantation',    likes: 7 },
    { id: 3, userId: 4, pseudo: 'Camille', challengeIcon: '♻️', challengeTitle: 'Zéro déchet',  likes: 2 },
    { id: 4, userId: 5, pseudo: 'Dylan',   challengeIcon: '🚲', challengeTitle: 'Semaine vélo',  likes: 5 },
]

export const HomeDashBoard = () => {

    // on récupère les données de l'utilisateur connecté pour le message de bienvenue
    const { data } = useGetMeQuery()
    const pseudo = data?.user?.pseudo

    // on récupère les challenges depuis l'API
    const { data: challenges = [] } = useGetChallengesQuery()

    return (
        <div className="p-6 max-w-6xl mx-auto flex flex-col gap-8">

            {/* message de bienvenue */}
            <div>
                <h1 className="text-3xl font-bold">
                    Bonjour {pseudo} 👋
                </h1>
                <p className="text-base-content/60 mt-1">Voici vos challenges en cours.</p>
            </div>

            {/* layout 50/50 : profil à gauche, challenges à droite — empilés en mobile */}
            <div className="flex flex-col lg:flex-row gap-8">

                {/* profil */}
                <div className="w-full lg:w-1/2 flex">
                    <ProfileCard
                        pseudo={pseudo}
                        bio="Passionné d'écologie et de nature. J'essaie chaque jour d'avoir un impact positif sur l'environnement ! 🌍"
                        trophies={['🏆', '🥇', '🌟', '⭐', '🎖️']}
                    />
                </div>

                {/* 2 premiers challenges empilés */}
                <div className="w-full lg:w-1/2 flex flex-col gap-6">
                    {challenges.slice(0, 2).map((challenge) => (
                        <ChallengeCard key={challenge.id} {...challenge} />
                    ))}
                </div>

            </div>

            {/* mur social : actions récentes de la communauté */}
            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold">Activité récente</h2>
                <div className="flex flex-col gap-3">
                    {feed.map((item) => (
                        <FeedCard key={item.id} {...item} />
                    ))}
                </div>
            </div>

        </div>
    )

}
