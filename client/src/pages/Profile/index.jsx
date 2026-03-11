import { useGetMeQuery } from "../../store/apiSlices/authApiSlice"
import { ProfileCard } from "../../components/profile/ProfileCard"

export const Profile = () => {

    // on récupère les données de l'utilisateur connecté
    const { data } = useGetMeQuery()
    const userName = data?.user?.userName ?? ''

    return (
        <div className="p-6 max-w-5xl mx-auto flex flex-col gap-8">

            {/* en-tête de la page */}
            <h1 className="text-3xl font-bold">Mon profil</h1>

            {/* carte profil avec données réelles + trophées temporaires */}
            <ProfileCard
                userName={userName}
                bio="Passionné d'écologie et de nature. J'essaie chaque jour d'avoir un impact positif sur l'environnement ! 🌍"
                trophies={['🏆', '🥇', '🌟', '⭐', '🎖️']}
            />

        </div>
    )

}
