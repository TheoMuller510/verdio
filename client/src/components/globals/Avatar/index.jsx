// tailles disponibles pour l'avatar
const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-16 h-16 text-xl',
    lg: 'w-20 h-20 text-3xl',
}

export const Avatar = ({ initials, size = 'md' }) => {
    return (
        // cercle avec dégradé vert, affiche les initiales de l'utilisateur
        <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-content font-semibold shrink-0`}>
            {initials}
        </div>
    )
}
