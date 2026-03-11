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
    {
        id: 4,
        icon: '🚿',
        title: 'Douche courte',
        description: 'Limiter vos douches à 5 minutes pendant une semaine.',
        difficulty: 'facile',
        points: 40,
    },
    {
        id: 5,
        icon: '🛒',
        title: 'Courses locales',
        description: "N'acheter que des produits locaux et de saison pendant une semaine.",
        difficulty: 'moyen',
        points: 60,
    },
    {
        id: 6,
        icon: '☀️',
        title: 'Énergie solaire',
        description: "Installer un panneau solaire ou rejoindre une coopérative d'énergie renouvelable.",
        difficulty: 'difficile',
        points: 150,
    },
]

export const Challenges = () => {

    return (
        <div className="p-6 max-w-5xl mx-auto flex flex-col gap-8">

            {/* en-tête de la page */}
            <div>
                <h1 className="text-3xl font-bold">Challenges</h1>
                <p className="text-base-content/60 mt-1">Relevez des défis pour la planète et gagnez des points.</p>
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
