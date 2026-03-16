import { useGetMeQuery } from "../../store/apiSlices/authApiSlice"
import { Avatar } from "../../components/globals/Avatar"
import { ChallengeCard } from "../../components/challenges/ChallengeCard"

// données temporaires en attendant les APIs
const trophies = ['🏆', '🥇', '🌟', '⭐', '🎖️']

const stats = [
    { label: 'Points',     value: 225 },
    { label: 'Complétés',  value: 8   },
    { label: 'Niveau',     value: 3   },
]

const history = [
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

export const Profile = () => {

    // on récupère les données de l'utilisateur connecté
    const { data } = useGetMeQuery()
    const pseudo = data?.user?.pseudo ?? ''

    // on génère les initiales pour l'avatar (ex: "Jean Dupont" → "JD")
    const initials = pseudo
        ? pseudo.split(' ').map((w) => w[0].toUpperCase()).join('').slice(0, 2)
        : ''

    return (
        <div className="p-6 max-w-4xl mx-auto flex flex-col gap-8">

            {/* en-tête : avatar grand format + pseudo + bio */}
            <div className="card bg-base-100 shadow-md">
                <div className="card-body flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <Avatar initials={initials} size="lg" />
                    <div className="flex flex-col gap-2 text-center sm:text-left">
                        <h1 className="text-3xl font-bold">{pseudo}</h1>
                        <p className="text-base-content/50 text-sm">@{pseudo.toLowerCase().replace(' ', '')}</p>
                        <p className="text-base-content/70 text-sm mt-1">
                            Passionné d'écologie et de nature. J'essaie chaque jour d'avoir un impact positif sur l'environnement ! 🌍
                        </p>
                    </div>
                </div>
            </div>

            {/* stats : points, challenges complétés, niveau */}
            <div className="grid grid-cols-3 gap-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="card bg-base-100 shadow-md">
                        <div className="card-body items-center text-center p-4">
                            <span className="text-3xl font-bold text-primary">{stat.value}</span>
                            <span className="text-base-content/60 text-sm">{stat.label}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* trophées */}
            <div className="card bg-base-100 shadow-md">
                <div className="card-body gap-4">
                    <h2 className="card-title">Mes trophées</h2>
                    <div className="flex gap-3 flex-wrap">
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
            </div>

            {/* historique des challenges */}
            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold">Challenges complétés</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {history.map((challenge) => (
                        <ChallengeCard key={challenge.id} {...challenge} />
                    ))}
                </div>
            </div>

        </div>
    )

}
