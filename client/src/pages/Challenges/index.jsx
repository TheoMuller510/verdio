import { useGetChallengesQuery } from "../../store/apiSlices/challengeApiSlice"
import { ChallengeCard } from "../../components/challenges/ChallengeCard"

export const Challenges = () => {

    // on récupère les challenges depuis l'API
    const { data: challenges = [], isLoading } = useGetChallengesQuery()

    return (
        <div className="p-6 max-w-5xl mx-auto flex flex-col gap-8">

            {/* en-tête de la page */}
            <div>
                <h1 className="text-3xl font-bold">Challenges</h1>
                <p className="text-base-content/60 mt-1">Relevez des défis pour la planète et gagnez des points.</p>
            </div>

            {/* grille de challenges — 1 colonne mobile, 2 à sm, 3 à lg */}
            {isLoading ? (
                <p className="text-base-content/60">Chargement des challenges...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {challenges.map((challenge) => (
                        <ChallengeCard key={challenge.id} {...challenge} />
                    ))}
                </div>
            )}

        </div>
    )

}
