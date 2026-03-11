import { useGetMeQuery } from "../../store/apiSlices/authApiSlice"
import { ChallengeCard } from "../../components/challenges/ChallengeCard"

// données temporaires en attendant l'API challenges
const challenges = [
    {
        id: 1,
        icon: '🚲',
        title: 'Semaine vélo',
        description: 'Utiliser le vélo pour tous vos déplacements pendant une semaine complète.',
        difficulty: 'facile',
        points: 50,
    },
    {
        id: 2,
        icon: '♻️',
        title: 'Zéro déchet',
        description: 'Passer une journée sans produire aucun déchet non recyclable.',
        difficulty: 'moyen',
        points: 75,
    },
    {
        id: 3,
        icon: '🌱',
        title: 'Plantation',
        description: "Planter un arbre ou créer un petit jardin urbain chez vous.",
        difficulty: 'difficile',
        points: 100,
    },
]

export const HomeDashBoard = () => {

    // on récupère les données de l'utilisateur connecté pour le message de bienvenue
    const { data } = useGetMeQuery()
    const userName = data?.user?.userName

    return (
        <div className="p-6 max-w-5xl mx-auto flex flex-col gap-8">

            {/* message de bienvenue */}
            <div>
                <h1 className="text-3xl font-bold">
                    Bonjour {userName} 👋
                </h1>
                <p className="text-base-content/60 mt-1">Voici vos challenges en cours.</p>
            </div>

            {/* grille de challenges — 1 colonne mobile, 2 à sm, 3 à lg */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {challenges.map((challenge) => (
                    <ChallengeCard key={challenge.id} {...challenge} />
                ))}
            </div>

        </div>
    )

}
