import { Link } from "react-router-dom"

export const HomePublic = () => {

    return (
        // page centrée verticalement et horizontalement sur fond base-200
        <div className="min-h-screen flex items-center justify-center bg-base-200 p-6">

            {/* conteneur principal centré, limité en largeur pour rester lisible */}
            <div className="max-w-xl text-center flex flex-col gap-6">

                {/* bloc titre + accroche */}
                <div className="flex flex-col gap-3">
                    <h1 className="text-4xl font-bold leading-tight">
                        Relevez des défis<br />pour la planète 🌱
                    </h1>
                    <p className="text-base-content/70 text-lg">
                        Rejoignez Verdio et adoptez de petits gestes qui font une grande différence.
                    </p>
                </div>

                {/* CTAs : colonne sur mobile, ligne sur sm+ */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link to="/register" className="btn btn-primary btn-lg">
                        Commencer gratuitement
                    </Link>
                    <Link to="/login" className="btn btn-ghost btn-lg">
                        Se connecter
                    </Link>
                </div>

            </div>
        </div>
    )

}
